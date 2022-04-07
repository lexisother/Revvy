import {NamedCommand, RestCommand} from 'turnip-beams'

random = (array) ->
  array[Math.floor Math.random() * array.length]

export default new NamedCommand {
  description: 'test'
  any: new RestCommand {
    run: ({send, combined}) ->
      faces = ["owo", "uwu", ">w<", "^w^"]

      owoified = combined
        .replace /[rl]/g, "w"
        .replace /[RL]/g, "W"
        .replace /ove/g, 'uv'
        .replace /n/g, "ny"
        .replace /N/g, 'NY'
        .replace /\!/g, " #{random faces} "

      send owoified
  }
}
