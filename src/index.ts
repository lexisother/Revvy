import './modules/globals';
import { Client } from 'revolt.js';
import path from 'path';
import { launch } from 'turnip-beams';

import setup from './modules/setup';
import Storage from './modules/storage';

let config: any;

const client = new Client();
setup.init().then(() => {
  config = Storage.read('config');
  client.loginBot(config.token).catch(setup.again);
});

const __dirname = path.resolve();
launch(client, path.join(__dirname, 'dist', 'commands'), {
  getPrefix: () => config.prefix,
});

client.on('ready', () => {
  console.info(`Logged in as ${client.user!.username}`);
});
