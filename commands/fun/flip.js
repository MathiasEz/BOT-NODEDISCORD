const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder().setName("moneda").setDescription(esLang.flipDescription),

  async execute(interaction) {
    try {
      const result = Math.random() < 0.5 ? esLang.flipHeads : esLang.flipTails
      const imageUrl =
        result === esLang.flipHeads ? "https://i.imgur.com/HyvBH8G.png" : "https://i.imgur.com/fYpS0kP.png"

      const embed = new EmbedBuilder()
        .setTitle(esLang.flipTitle)
        .setDescription(`${esLang.flipResult} **${result}**!`)
        .setColor("#FFD700")
        .setImage(imageUrl)
        .setTimestamp()

      await interaction.reply({ embeds: [embed] })
    } catch (error) {
      console.error("Error en el comando flip:", error)
      await interaction.reply({ content: esLang.flipError, ephemeral: true })
    }
  },
}

