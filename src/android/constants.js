const klarTargets = {
  abcnews: 7.036363636,
  wikiaFandom: 4.461818182,
  buzzfeed: 6.087272727,
  yelp: 5.836363636,
  eurosport: 8.236363636,
  ranker: 3.610909091,
  healthyway: 4.92,
  fashionbeans: 4.2,
  lifehacker: 12.36,
  spiegel: 11.52,
  nytimes: 16.08,
  reddit: 13.68,
  wired: 18.36,
  guardian: 10.08,
  medium: 3.72,
  washingtonpost: 9.84,
  cnbc: 12.72,
  gizmodo: 14.0,
  facebook: 4.0,
  flipkart: 5.0,
  twitter: 3.8,
  googlemaps: 2.5,
  urbandictionary: 4.0,
  glassdoor: 8.0,
  wikipedia: 2.5,
  imgur: 3.5,
  amazon: 4.0,
  yelpdotcom: 6.0,
  zalando: 8.0,
  ebaydotDE: 4.0,
  expedia: 9.5,
  booking: 3.5,
  tripadvisor: 7.5,
  rumble: 2.5,
  google: 2.5,
};

const graphDefaults = {
  api: 'android/klar',
  legend: ['focus (WV)', 'klar (GV)'],
  target: 'GV within 20% of WV',
  width: 600,
  height: 300,
  keys: ['focus', 'klar'],
  checkStatus: true,
  targetLine: 'klar',
};

const configuration = {
  abcnews: {
    ...graphDefaults,
    query: { site: 'abcnews.go.com' },
    title: 'abcnews.go.com',
    baselines: [{ value: klarTargets.abcnews, label: '+20%' }],
    targetValue: klarTargets.abcnews,
  },
  wikiaFandom: {
    ...graphDefaults,
    query: { site: 'wikia-fandom' },
    title: 'wikia/fandom',
    baselines: [{ value: klarTargets.wikiaFandom, label: '+20%' }],
    targetValue: klarTargets.wikiaFandom,
  },
  buzzfeed: {
    ...graphDefaults,
    query: { site: 'buzzfeed' },
    title: 'buzzfeed',
    baselines: [{ value: klarTargets.buzzfeed, label: '+20%' }],
    targetValue: klarTargets.buzzfeed,
  },
  yelp: {
    ...graphDefaults,
    query: { site: 'yelp.de' },
    title: 'yelp.de',
    baselines: [{ value: klarTargets.yelp, label: '+20%' }],
    targetValue: klarTargets.yelp,
  },
  eurosport: {
    ...graphDefaults,
    query: { site: 'eurosport.de' },
    title: 'eurosport.de',
    baselines: [{ value: klarTargets.eurosport, label: '+20%' }],
    targetValue: klarTargets.eurosport,
  },
  ranker: {
    ...graphDefaults,
    query: { site: 'm.ranker.com' },
    title: 'm.ranker.com',
    baselines: [{ value: klarTargets.ranker, label: '+20%' }],
    targetValue: klarTargets.ranker,
  },
  healthyway: {
    ...graphDefaults,
    query: { site: 'healthyway.com' },
    title: 'healthyway.com',
    baselines: [{ value: klarTargets.healthyway, label: '+20%' }],
    targetValue: klarTargets.healthyway,
  },
  fashionbeans: {
    ...graphDefaults,
    query: { site: 'fashionbeans.com' },
    title: 'fashionbeans.com',
    baselines: [{ value: klarTargets.fashionbeans, label: '+20%' }],
    targetValue: klarTargets.fashionbeans,
  },
  lifehacker: {
    ...graphDefaults,
    query: { site: 'lifehacker.com' },
    title: 'lifehacker.com',
    baselines: [{ value: klarTargets.lifehacker, label: '+20%' }],
    targetValue: klarTargets.lifehacker,
  },
  spiegel: {
    ...graphDefaults,
    query: { site: 'm.spiegel.de' },
    title: 'm.spiegel.de',
    baselines: [{ value: klarTargets.spiegel, label: '+20%' }],
    targetValue: klarTargets.spiegel,
  },
  nytimes: {
    ...graphDefaults,
    query: { site: 'nytimes.com' },
    title: 'nytimes.com',
    baselines: [{ value: klarTargets.nytimes, label: '+20%' }],
    targetValue: klarTargets.nytimes,
  },
  reddit: {
    ...graphDefaults,
    query: { site: 'reddit.com' },
    title: 'reddit.com',
    baselines: [{ value: klarTargets.reddit, label: '+20%' }],
    targetValue: klarTargets.reddit,
  },
  wired: {
    ...graphDefaults,
    query: { site: 'wired.com' },
    title: 'wired.com',
    baselines: [{ value: klarTargets.wired, label: '+20%' }],
    targetValue: klarTargets.wired,
  },
  guardian: {
    ...graphDefaults,
    query: { site: 'guardian.co.uk' },
    title: 'guardian.co.uk',
    baselines: [{ value: klarTargets.guardian, label: '+20%' }],
    targetValue: klarTargets.guardian,
  },
  medium: {
    ...graphDefaults,
    query: { site: 'medium.com' },
    title: 'medium.com',
    baselines: [{ value: klarTargets.medium, label: '+20%' }],
    targetValue: klarTargets.medium,
  },
  washingtonpost: {
    ...graphDefaults,
    query: { site: 'washingtonpost.com' },
    title: 'washingtonpost.com',
    baselines: [{ value: klarTargets.washingtonpost, label: '+20%' }],
    targetValue: klarTargets.washingtonpost,
  },
  cnbc: {
    ...graphDefaults,
    query: { site: 'cnbc.com' },
    title: 'cnbc.com',
    baselines: [{ value: klarTargets.cnbc, label: '+20%' }],
    targetValue: klarTargets.cnbc,
  },
  gizmodo: {
    ...graphDefaults,
    query: { site: 'gizmodo.com' },
    title: 'gizmodo.com',
    baselines: [{ value: klarTargets.gizmodo, label: '+20%' }],
    targetValue: klarTargets.gizmodo,
  },
  facebook: {
    ...graphDefaults,
    query: { site: 'm.facebook.com' },
    title: 'm.facebook.com',
    baselines: [{ value: klarTargets.facebook, label: '+20%' }],
    targetValue: klarTargets.facebook,
  },
  flipkart: {
    ...graphDefaults,
    query: { site: 'flipkart.com' },
    title: 'flipkart.com',
    baselines: [{ value: klarTargets.flipkart, label: '+20%' }],
    targetValue: klarTargets.flipkart,
  },
  twitter: {
    ...graphDefaults,
    query: { site: 'mobile.twitter.com' },
    title: 'mobile.twitter.com',
    baselines: [{ value: klarTargets.twitter, label: '+20%' }],
    targetValue: klarTargets.twitter,
  },
  googlemaps: {
    ...graphDefaults,
    query: { site: 'google.com/maps' },
    title: 'google.com/maps',
    baselines: [{ value: klarTargets.googlemaps, label: '+20%' }],
    targetValue: klarTargets.googlemaps,
  },
  urbandictionary: {
    ...graphDefaults,
    query: { site: 'urbandictionary.com' },
    title: 'urbandictionary.com',
    baselines: [{ value: klarTargets.urbandictionary, label: '+20%' }],
    targetValue: klarTargets.urbandictionary,
  },
  glassdoor: {
    ...graphDefaults,
    query: { site: 'glassdoor.com' },
    title: 'glassdoor.com',
    baselines: [{ value: klarTargets.glassdoor, label: '+20%' }],
    targetValue: klarTargets.glassdoor,
  },
  wikipedia: {
      ...graphDefaults,
      query: { site: 'en.m.wikipedia.org' },
      title: 'en.m.wikipedia.org',
      baselines: [{ value: klarTargets.wikipedia, label: '+20%' }],
      targetValue: klarTargets.wikipedia,
  },
  imgur: {
    ...graphDefaults,
    query: { site: 'm.imgur.com' },
    title: 'm.imgur.com',
    baselines: [{ value: klarTargets.imgur, label: '+20%' }],
    targetValue: klarTargets.imgur,
  },
  amazon: {
    ...graphDefaults,
    query: { site: 'www.amazon.com' },
    title: 'www.amazon.com',
    baselines: [{ value: klarTargets.amazon, label: '+20%' }],
    targetValue: klarTargets.amazon,
  },
  yelpdotcom: {
    ...graphDefaults,
    query: { site: 'm.yelp.com' },
    title: 'm.yelp.com',
    baselines: [{ value: klarTargets.yelpdotcom, label: '+20%' }],
    targetValue: klarTargets.yelpdotcom,
  },
  zalando: {
    ...graphDefaults,
    query: { site: 'www.zalando.de' },
    title: 'www.zalando.de',
    baselines: [{ value: klarTargets.zalando, label: '+20%' }],
    targetValue: klarTargets.zalando,
  },
  ebaydotDE: {
    ...graphDefaults,
    query: { site: 'm.ebay-kleinanzeigen.de' },
    title: 'm.ebay-kleinanzeigen.de',
    baselines: [{ value: klarTargets.ebaydotDE, label: '+20%' }],
    targetValue: klarTargets.ebaydotDE,
  },
  expedia: {
    ...graphDefaults,
    query: { site: 'www.expedia.com' },
    title: 'www.expedia.com',
    baselines: [{ value: klarTargets.expedia, label: '+20%' }],
    targetValue: klarTargets.expedia,
  },
  booking: {
    ...graphDefaults,
    query: { site: 'booking.com' },
    title: 'booking.com',
    baselines: [{ value: klarTargets.booking, label: '+20%' }],
    targetValue: klarTargets.booking,
  },
  tripadvisor: {
    ...graphDefaults,
    query: { site: 'tripadvisor.com' },
    title: 'tripadvisor.com',
    baselines: [{ value: klarTargets.tripadvisor, label: '+20%' }],
    targetValue: klarTargets.tripadvisor,
  },
  rumble: {
    ...graphDefaults,
    query: { site: 'rumble.com' },
    title: 'rumble.com',
    baselines: [{ value: klarTargets.rumble, label: '+20%' }],
    targetValue: klarTargets.rumble,
  },
  google: {
    ...graphDefaults,
    query: { site: 'google.com' },
    title: 'google.com',
    baselines: [{ value: klarTargets.google, label: '+20%' }],
    targetValue: klarTargets.google,
  },
};

export default configuration;