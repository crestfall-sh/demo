// @ts-check

import fs from 'fs';
import url from 'url';
import path from 'path';
import lenv from 'modules/lenv.mjs';
import * as web from 'modules/web.mjs';
// import * as web from '../../modules/web.mjs';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const NODE_ENV = process.env['NODE_ENV'] || 'development';
if (NODE_ENV === 'development') {
  /**
   * Load .env into process.env. For development purposes only.
   */
  const env_path = path.join(__dirname, '.env');
  if (fs.existsSync(env_path) === true) {
    lenv(path.join(__dirname, '.env'));
  }
}

const app = web.uws.App({});

web.serve({
  app,
  include: [
    {
      url: '/',
      directory: path.join(__dirname, '../client/dist/'),
      use_cache: NODE_ENV === 'production',
    },
  ],
  exclude: ['/api/'],
  debug: true,
});

export const app_token = await web.http(app, web.port_access_types.EXCLUSIVE, 9090);
console.log('Listening at port 9090.');
