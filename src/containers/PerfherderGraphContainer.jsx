/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LinkIcon } from '../utils/icons';
import ChartJsWrapper from '../vendor/components/chartJs/ChartJsWrapper';
import { Data } from '../vendor/datas';
import { withErrorBoundary } from '../vendor/errors';
import { exists, missing, sleep } from '../vendor/utils';
import { URL } from '../vendor/requests';
import { Date } from '../vendor/dates';
import { getData, TREEHERDER } from '../vendor/perfherder';
import { ArrayWrapper, selectFrom } from '../vendor/vectors';
import { Log } from '../vendor/logs';
import { round } from '../vendor/math';

// treeherder can only accept particular time ranges
const ALLOWED_TREEHERDER_TIMERANGES = [1, 2, 7, 14, 30, 60, 90].map(
  x => x * 24 * 60 * 60
);
const tipStyles = {
  tooltipKey: {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    marginRight: '10px',
  },
  lockMessage: {
    color: '#ccc',
  },
};
const tip = withStyles(tipStyles)(
  ({ record, index, data, series, classes, isLocked }) => {
    const higherOrLower = series.meta.lowerIsBetter
      ? 'lower is better'
      : 'higher is better';
    const hgURL = URL({
      path: 'https://hg.mozilla.org/mozilla-central/pushloghtml',
      query: { changeset: record.revision },
    });
    const jobURL = URL({
      path: 'https://treeherder.mozilla.org/#/jobs',
      query: {
        repo: 'mozilla-central',
        revision: record.revision,
        selectedJob: record.job_id,
        group_state: 'expanded',
      },
    });

    return (
      <div>
        <div className={classes.test}>{record.x}</div>
        <div>
          <span
            style={{ backgroundColor: series.style.color }}
            className={classes.tooltipKey}
          />
          {series.label}: {round(record.value, { places: 3 })}
        </div>
        <div>
          {record.y} ({higherOrLower})
        </div>
        {(() => {
          if (index === 0) return null;
          const prev = data[index - 1];
          const delta = record.value - prev.value;
          const deltaPercentage = (delta / prev.value) * 100;

          return (
            <div>
              Δ {delta.toFixed(2)} ({deltaPercentage.toFixed(1)} %)
            </div>
          );
        })()}
        <div>
          <a href={hgURL} target="_blank" rel="noopener noreferrer">
            {record.revision.slice(0, 12)}
          </a>
          {` `}(
          <a href={jobURL} target="_blank" rel="noopener noreferrer">
            job
          </a>
          )
        </div>
        <div className={classes.lockMessage}>
          {isLocked ? 'Click to unlock' : 'Click to lock'}
        </div>
      </div>
    );
  }
);
const generateStandardOptions = (series, timeDomain) => {
  const { lowerIsBetter, unit } = series[0].meta;
  const data = selectFrom(series)
    .enumerate()
    .map((s, si) =>
      selectFrom(s.data)
        .sort('push_timestamp')
        .enumerate()
        .map((d, di) => {
          // eslint-disable-next-line no-param-reassign
          d[s.label] = d.value; // IMPORTANT: WE DO NOT CREATE NEW DATA
          // eslint-disable-next-line no-param-reassign
          d.seriesIndex = si;
          // eslint-disable-next-line no-param-reassign
          d.dataIndex = di;

          return d;
        })
        .toArray()
    )
    .flatten()
    .sort('push_timestamp')
    .toArray();
  // MAP FROM cjs DATASET INDEXES TO data INDEX
  const cjsLookup = series.map(s => s.data.map(() => 0));

  data.forEach((d, i) => {
    cjsLookup[d.seriesIndex][d.dataIndex] = i;
  });

  const cjsData = {
    datasets: series.map(({ data, ...row }) => ({
      ...row,
      /* eslint-disable-next-line camelcase */
      data: data.map(({ push_timestamp, value }) => ({
        /* eslint-disable-next-line camelcase */
        x: new Date(push_timestamp * 1000),
        y: value,
      })),
    })),
  };

  return {
    tip,
    series: selectFrom(series)
      .map(s => ({
        ...s,
        select: [
          { value: s.label, axis: 'y' },
          { value: 'push_timestamp', axis: 'x' },
        ],
      }))
      .toArray(),
    data,
    'axis.y.label': unit,
    'axis.y.reverse': !lowerIsBetter,
    'axis.x.min': timeDomain.min,
    'axis.x.max': timeDomain.max,
    cjsData,
    cjsLookup,
  };
};

/* This function combines Perfherder series and transforms it
into ChartJS formatting */
const perfherderFormatter = (series, timeDomain) => {
  const firstTime = timeDomain.min.unix();
  const timeRange = Date.today().unix() - firstTime;
  const bestRange = ALLOWED_TREEHERDER_TIMERANGES.find(t => t >= timeRange);
  const jointParam = {
    timerange: bestRange,
    series: selectFrom(series)
      .select('sources')
      // each series has multiple sources, merge them
      .flatten()
      .select('meta')
      .map(({ repo, id, framework }) => [repo, id, 1, framework])
      .toArray(),
  };
  const combinedSeries = selectFrom(series)
    .enumerate()
    .map(({ sources, ...row }) => ({
      ...row,
      // choose meta from the source with most recent data
      meta: selectFrom(sources)
        .sort(s =>
          selectFrom(s.data)
            .select('push_timestamp')
            .max()
        )
        .last({}).meta,
      // multiple sources make up a single series, merge them here
      data: selectFrom(sources)
        .select('data')
        .flatten()
        .sort('push_timestamp')
        .toArray(),
    }))
    .toArray();

  return {
    standardOptions: generateStandardOptions(combinedSeries, timeDomain),
    jointUrl: URL({
      path: [TREEHERDER, 'perf.html#/graphs'],
      query: jointParam,
    }),
  };
};

const getPerfherderData = async (series, timeDomain) => {
  const newData = await Promise.all(
    series.map(async row => {
      const sources = await getData(row.filter);

      // filter out old data
      return {
        ...row,
        sources: sources.map(({ data, ...row }) => ({
          ...row,
          data: data.filter(
            /* eslint-disable-next-line camelcase */
            ({ push_timestamp }) => timeDomain.includes(push_timestamp)
          ),
        })),
      };
    })
  );

  if (missing(selectFrom(newData).exists('sources'))) {
    Log.error('can not get data for {{query|json}}', {
      query: series[0].filter,
    });
  }

  return perfherderFormatter(newData, timeDomain);
};

const styles = () => ({
  title: {
    color: '#56565a',
    fontSize: '1rem',
    backgroundColor: '#d1d2d3',
    padding: '.2rem .3rem .3rem .3rem',
    margin: '0 1rem 0 0',
  },
});

class PerfherderGraphContainer extends React.Component {
  constructor(props) {
    super(props);
    const { timeDomain } = this.props;

    if (missing(timeDomain)) {
      Log.error('expecting a time range');
    }

    this.state = {
      standardOptions: null,
      jointUrl: null,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { series, style, reference, timeDomain } = this.props;

    this.setState({ isLoading: true });
    await sleep(0); // ALLOW UI TO UPDATE

    try {
      const config = await getPerfherderData(series, timeDomain);
      const { standardOptions } = config;

      Data.setDefault(standardOptions, style);

      if (exists(reference) && exists(reference.value)) {
        const { label, value } = reference;

        standardOptions.series.push({
          label,
          type: 'line',
          select: { value, axis: 'y' },
          style: { color: 'gray' },
        });
        const x = selectFrom(standardOptions.data).select('push_timestamp');

        standardOptions.cjsData.datasets.push({
          label,
          data: [{ x: x.min(), y: value }, { x: x.max(), y: value }],
          style: {
            type: 'line',
            backgroundColor: 'gray',
            borderColor: 'gray',
            fill: false,
            pointRadius: '0',
            pointHoverRadius: '0',
            pointHoverBackgroundColor: 'gray',
            lineTension: 0,
          },
        });
      }

      this.setState(config);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { title } = this.props;
    const { jointUrl, standardOptions, isLoading } = this.state;

    return (
      <div key={title} style={{ position: 'relative' }}>
        <ChartJsWrapper
          title={
            <div>
              {title}
              {jointUrl && (
                <a
                  href={jointUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="show Perfherder">
                  <LinkIcon />
                </a>
              )}
            </div>
          }
          {...{
            style: { type: 'scatter' },
            isLoading,
            standardOptions,
          }}
        />
      </div>
    );
  }
}

PerfherderGraphContainer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  series: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        filter: PropTypes.shape({}).isRequired,
        standardOptions: PropTypes.shape({}),
      })
    ),
    PropTypes.instanceOf(ArrayWrapper),
  ]).isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  timeDomain: PropTypes.shape({
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
  }),
};

export default withStyles(styles)(withErrorBoundary(PerfherderGraphContainer));
