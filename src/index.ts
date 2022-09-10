import './modules/globals';
import { Client } from 'revolt.js';
import { dirname, join } from 'path';
import { launch } from 'turnip-beams';

import setup from './modules/setup';
import Storage from './modules/storage';

let config: any;

const client = new Client();
setup.init().then(() => {
  config = Storage.read('config');
  client.loginBot(config.token).catch(setup.again);
});

const __dirname = dirname(new URL(import.meta.url).pathname);
launch(client, join(__dirname, 'commands'), {
  getPrefix: () => config.prefix,
})
  .then(() => console.log("Started TurnipBeams"))
  .catch(console.error)

client.on('ready', () => {
  console.info(`Logged in as ${client.user!.username}`);
});
