import { Client } from 'revolt.js';
import fetch from 'node-fetch';
import { config } from 'dotenv';

import { EmoteRegistryDump } from './structures';

const client = new Client();
config();

client.on('ready', () => {
  console.info(`Logged in as ${client.user!.username}`);
});

const prefix = '!!';
let data: EmoteRegistryDump;
let registry;
fetch('https://nova-vps.ml/~keanu/travbot/emote-registry.json').then((res) => {
  res.json().then((data2) => {
    data = data2 as EmoteRegistryDump;
  });
});

// Alright, let me make something clear: No, no, no, this won't be the way
// we're doing things.
// I will take inspiration from the lovely OnionLasers and base a command
// framework off of it, keeping the same type of syntax, but for Revolt.
client.on('message', (msg) => {
  // Do some preliminary checks
  if (msg.author!.username === client.user!.username) return;
  if (!msg.channel) return;

  let input = msg.content.toString();
  if (input.startsWith(prefix)) {
    input = input.substring(prefix.length, input.length);

    if (input.startsWith('emote')) {
      input = input.substring(5, input.length).trim();
      registry = data.list;
      const emote = registry.find((e) => e.name === input);
      if (emote) {
        msg.channel.sendMessage(emote.url);
      } else {
        msg.reply("I can't find that emote!");
      }
    }
  }
});

client.loginBot(process.env.TOKEN!);
