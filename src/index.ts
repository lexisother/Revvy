import { Client } from 'revolt.js';
import { config } from 'dotenv';
import path from 'path';
import { launch } from 'turnip-beams';

const client = new Client();
config();

client.on('ready', () => {
  console.info(`Logged in as ${client.user!.username}`);
});

client.loginBot(process.env.TOKEN!);

const __dirname = path.resolve();
launch(client, path.join(__dirname, 'dist', 'commands'), {
  getPrefix: () => '.',
});
