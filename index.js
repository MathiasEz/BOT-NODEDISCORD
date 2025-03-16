const { Client, GatewayIntentBits, Collection, Events, ActivityType } = require("discord.js")
const fs = require("fs")
const path = require("path")
const { DisTube } = require("distube")
const { SpotifyPlugin } = require("@distube/spotify")
const { SoundCloudPlugin } = require("@distube/soundcloud")
const { YtDlpPlugin } = require("@distube/yt-dlp")
const config = require("./config.json")
const { loadCommands } = require("./handlers/commandHandler")
const { loadEvents } = require("./handlers/eventHandler")

// Cargar el idioma español
const esLang = require("./languages/es")

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
})

client.commands = new Collection()
client.config = config
client.lang = esLang // Establecer el idioma español como predeterminado

// Configuración de DisTube
client.distube = new DisTube(client, {
  leaveOnStop: false,
  leaveOnFinish: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true,
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin(),
  ],
})

// Cargar comandos y eventos
loadCommands(client)
loadEvents(client)

// Establecer estado del bot en español
client.on("ready", () => {
  console.log(`¡${client.user.tag} está en línea!`)
  client.user.setActivity("música en español", { type: ActivityType.Playing })
})

// Manejar errores de DisTube
client.distube.on("error", (channel, error) => {
  console.error("Error de DisTube:", error)
  if (channel) channel.send(`Ocurrió un error: ${error.message}`)
})

// Iniciar sesión con el token
client.login(config.token)

