const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const fetch = require("node-fetch")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder().setName("dato").setDescription(esLang.factDescription),

  async execute(interaction) {
    try {
      // Obtener un dato curioso aleatorio
      const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=es")
      const data = await response.json()

      const embed = new EmbedBuilder()
        .setTitle(esLang.factTitle)
        .setDescription(data.text)
        .setColor("#3498db")
        .setTimestamp()

      await interaction.reply({ embeds: [embed] })
    } catch (error) {
      console.error("Error en el comando fact:", error)
      await interaction.reply({ content: esLang.factError, ephemeral: true })
    }
  },
}

