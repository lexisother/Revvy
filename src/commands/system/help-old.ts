import { NamedCommand, getCommandList } from 'turnip-beams';

const EMBED_COLOR = '#158a28';
const LEGEND =
  'Legend: `<type>`, `[list/of/stuff]`, `(optional)`, `(<optional type>)`, `([optional/list/...])`\n';

export default new NamedCommand({
  description: 'Lists all commands. If a command is specified, their arguments are listed as well.',
  usage: '([command, [subcommand/type], ...])',
  aliases: ['h-old'],
  async run({ send }) {
    const commands = await getCommandList();
    const helpMenuPages: [string, string][] = [];
    let embeds = [];
    let msg = `### Revvy Help\n${LEGEND}`;

    for (const category of commands.keys()) {
      const commandList = commands.get(category)!;
      let output = '';

      for (const command of commandList) {
        const field = `\n❯ \`${command.name}\`: ${command.description}`;
        const newOutput = output + field;

        if (newOutput.length > 2048) {
          helpMenuPages.push([category, output]);
          output = field;
        } else {
          output = newOutput;
        }
      }

      helpMenuPages.push([category, output]);
      console.log(helpMenuPages);
    }

    for (const [category, output] of helpMenuPages) {
      embeds.push({
        title: category,
        description: output,
        colour: EMBED_COLOR,
      });
    }

    console.log(embeds);

    send({
      content: `${msg}`,
      embeds: embeds,
    });
  },
});
