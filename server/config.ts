import { Store } from 'confidence';
import * as path from 'path';

const criteria = {
  server_group: process.env.SERVER_GROUP || 'development',
  log_level: process.env.LOG_LEVEL || 'verbose'
};

const options = {
  $meta: 'server config',
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5000,
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'public')
      },
      cors: {
        origin: [process.env.CORS_ORIGIN || 'http://localhost:5000']
      }
    },
    router: {
      isCaseSensitive: true,
      stripTrailingSlash: true
    },
    labels: ['web']
  },
  visionary: {
    engines: { html: 'handlebars' },
    relativeTo: __dirname,
    path: 'views',
    layout: 'default',
    layoutPath: path.join('views', 'layouts'),
    helpersPath: path.join('views', 'helpers'),
    partialsPath: path.join('views', 'partials')
  },
  routes: {
    feed: {
      feedPingInterval: (process.env.FEED_PING_INTERVAL || 30) * 1000
    }
  }
};

const store = new Store(options);

export const config = {
  get: key => store.get(key, criteria),
  meta: key => store.meta(key, criteria)
}
