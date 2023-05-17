# // https://github.com/keanuplayz/TravBot-v3/blob/master/src/modules/setup.ts
# import { existsSync as exists } from 'fs';
# import inquirer from 'inquirer';
# import Storage from './storage';

import { existsSync as exists } from 'fs'
import inquirer from 'inquirer'
import Storage from './storage.js'

prompts = [
    type: 'password'
    name: 'token'
    message: "What's your bot's token?"
    mask: true
  ,

    type: 'input'
    name: 'prefix'
    message: "What do you want your bot's prefix to be?"
    default: '$'
]

export default {
  init: ->
    while not exists 'data/config.json'
      answers = await inquirer.prompt prompts
      Storage.open 'data'
      Storage.write 'config', { token: answers.token, prefix: answers.prefix }, false
  ,

  again: ->
    console.error 'It seems that the token you provided is invalid.'
    answers = await inquirer.prompt (prompts.slice 0, 1)
    Storage.write 'config', { token: answers.token }, false
    process.exit()
}

# const prompts = [
#   {
#     type: 'password',
#     name: 'token',
#     message: "What's your bot's token?",
#     mask: true,
#   },
#   {
#     type: 'input',
#     name: 'prefix',
#     message: "What do you want your bot's prefix to be?",
#     default: '$',
#   },
# ];

# export default {
#   async init() {
#     while (!exists('data/config.json')) {
#       const answers = await inquirer.prompt(prompts);
#       Storage.open('data');
#       Storage.write(
#         'config',
#         {
#           token: answers.token,
#           prefix: answers.prefix,
#         },
#         false,
#       );
#     }
#   },
#   async again() {
#     console.error('It seems that the token you provided is invalid.');
#     const answers = await inquirer.prompt(prompts.slice(0, 1));
#     Storage.write(
#       'config',
#       {
#         token: answers.token,
#       },
#       false,
#     );
#     process.exit();
#   },
# };
