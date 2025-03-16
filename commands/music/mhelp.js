const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const fs = require("fs")
const path = require("path")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder().setName("mayuda").setDescription(esLang.mhelpDescription),

  async execute(interaction) {
    try {
      // Obtener todos los comandos de música
      const musicCommandsPath = path.join(__dirname)
      const musicCommandFiles = fs
        .readdirSync(musicCommandsPath)
        .filter((file) => file.endsWith(".js") && file !== "mhelp.js")

      if (musicCommandFiles.length === 0) {
        return interaction.reply({ content: esLang.noCommandsFound, ephemeral: true })
      }

      // Crear una lista de comandos con sus descripciones
      let commandsList = ""

      for (const file of musicCommandFiles) {
        const command = require(path.join(musicCommandsPath, file))
        if (command.data && command.data.name && command.data.description) {
          commandsList += `**/${command.data.name}** - ${command.data.description}\n`
        }
      }

      // Crear el embed
      const embed = new EmbedBuilder()
        .setTitle("🎵 Comandos de Música")
        .setDescription(commandsList)
        .setColor("#3498db")
        .setFooter({ text: esLang.lavalinkPlayerFooter })

      await interaction.reply({ embeds: [embed] })
    } catch (error) {
      console.error("Error en el comando mhelp:", error)
      await interaction.reply({ content: "Ocurrió un error al mostrar los comandos de música.", ephemeral: true })
    }
  },
}

