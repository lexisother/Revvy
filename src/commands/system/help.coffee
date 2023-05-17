import { NamedCommand, getCommandList } from 'turnip-beams'

EMBED_COLOR = '#158a28'
LEGEND =
  'Legend: `<type>`, `[list/of/stuff]`, `(optional)`, `(<optional type>)`, `([optional/list/...])`\n'

export default new NamedCommand {
  description: 'Lists all commands. If a command is specified, their arguments are listed as well.'
  usage: '([command, [subcommand/type], ...])'
  aliases: ['h']
  run: ({ send }) ->
    commands = await getCommandList()
    helpMenuPages = []
    embeds = []
    msg = "### Revvy Help\n#{LEGEND}"

    commandKeys = Object.fromEntries commands.entries()
    for category of commandKeys
      commandList = commands.get(category)
      output = ''

      for k,command of commandList
        field = "❯ `#{command.name}\`: #{command.description}\n"
        newOutput = output + field

        if newOutput.length > 2048
          helpMenuPages.push [category, output]
          output = field
        else
          output = newOutput

      helpMenuPages.push [category, output]

    for [category, output] from helpMenuPages
      embeds.push(
        title: category
        description: output
        colour: EMBED_COLOR,
      )

    console.log embeds

    send(
      content: "#{msg}"
      embeds: embeds,
    )

    # for _,category of commands.keys()
    #   console.log category
    #   commandList = commands.get category
    #   output = ''

    #   for _,command of commandList
    #     field = "\n❯ `#{command.name}\`: #{command.description}"
    #     console.log field
}
