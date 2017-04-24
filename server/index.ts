import { compose } from 'glue';
import { Server } from 'hapi';
import * as Env from 'dotenv';

// Load environment variables into process.env
// This needs to happen before importing the
// manifest file below.
Env.config();

// app
import { get } from './manifest';

compose(get('/'), { relativeTo: __dirname }, (err, server) => {
    const web = <Server>server.select('web');
    server.start(() =>
        server.log('info', 'Server running at: ' + web.info.uri)
    );
});