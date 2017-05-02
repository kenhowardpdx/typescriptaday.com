import { compose } from 'glue';
import { Server } from 'hapi';
import * as Env from 'dotenv';
import logger from './services/logger';

// Load environment variables into process.env
// This needs to happen before importing the
// manifest file below.
Env.config();

// app
import { get } from './manifest';
import { migrate } from './database/migrate';

migrate()
  .then(() => {
    compose(get('/'), { relativeTo: __dirname }, (err, server) => {
      const web = <Server>server.select('web');
      server.start(() =>
        logger.info('Server running at: ' + web.info.uri)
      );
    });
  })
  .catch(error => {
    logger.error('Unable to apply migrations', error);
  });
