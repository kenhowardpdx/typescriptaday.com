import { Store } from 'confidence';
import { config } from './config';

const criteria = {
    env: process.env.NODE_ENV || 'development'
};

let store: Store,
    manifest: any;

manifest = {
    $meta: 'server setup',
    connections: [config.get('/server')],
    registrations: [
        {
            plugin: 'inert'
        },
        {
            plugin: 'vision'
        },
        {
            plugin: {
                register: 'visionary',
                options: config.get('/visionary')
            }
        },
        {
            plugin: {
                register: './plugins/good'
            }
        },
        {
            plugin: {
                register: './plugins/auth'
            }
        },
        {
            plugin: {
                register: './plugins/routes',
                options: config.get('/routes')
            }
        }
    ]
};

store = new Store(manifest);

export const get = (key) => {
    return store.get(key, criteria);
};

export const meta = (key) => {
    return store.meta(key, criteria);
};