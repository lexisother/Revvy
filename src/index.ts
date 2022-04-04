import { Client } from 'revolt.js';
import { config } from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { launch } from './lib/interface';

const client = new Client();
config();

client.on('ready', () => {
  console.info(`Logged in as ${client.user!.username}`);
});

client.loginBot(process.env.TOKEN!);

const __filename = fileURLToPath(import.meta.url);
launch(client, path.join(dirname(__filename), 'commands'), {
  getPrefix: () => '.',
});
