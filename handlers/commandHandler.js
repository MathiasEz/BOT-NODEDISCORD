const { REST, Routes } = require("discord.js")
const fs = require("fs")
const path = require("path")
const config = require("../config.json")

// Cargar el idioma español
const esLang = require("../languages/es")

const loadCommands = async (client) => {
  const commands = []
  const commandFolders = fs.readdirSync("./commands")

  for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith(".js"))

    for (const file of commandFiles) {
      const command = require(`../commands/${folder}/${file}`)

      // Traducir la descripción del comando si existe
      if (command.data && command.data.description) {
        const commandKey = file.replace(".js", "") + "Description"
        if (esLang[commandKey]) {
          command.data.description = esLang[commandKey]
        }
      }

      // Traducir las opciones del comando si existen
      if (command.data && command.data.options) {
        command.data.options.forEach((option) => {
          const optionKey =
            file.replace(".js", "") + option.name.charAt(0).toUpperCase() + option.name.slice(1) + "Description"
          if (esLang[optionKey]) {
            option.description = esLang[optionKey]
          }
        })
      }

      if (command.data) {
        commands.push(command.data.toJSON())
        client.commands.set(command.data.name, command)
      }
    }
  }

  const rest = new REST({ version: "10" }).setToken(config.token)

  try {
    console.log("Comenzando a actualizar los comandos de aplicación (/)...")

    await rest.put(Routes.applicationCommands(config.clientId), { body: commands })

    console.log("Comandos de aplicación (/) actualizados exitosamente.")
  } catch (error) {
    console.error("Error al actualizar los comandos:", error)
  }
}

module.exports = { loadCommands }

