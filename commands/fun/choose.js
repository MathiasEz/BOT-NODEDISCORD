const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("elegir")
    .setDescription(esLang.chooseDescription)
    .addStringOption((option) =>
      option.setName("opciones").setDescription(esLang.chooseOptionsDescription).setRequired(true),
    ),

  async execute(interaction) {
    const optionsString = interaction.options.getString("opciones")
    const options = optionsString
      .split(",")
      .map((option) => option.trim())
      .filter((option) => option !== "")

    if (options.length < 2) {
      return interaction.reply({
        content: "Por favor proporciona al menos dos opciones separadas por comas.",
        ephemeral: true,
      })
    }

    const randomIndex = Math.floor(Math.random() * options.length)
    const chosenOption = options[randomIndex]

    const embed = new EmbedBuilder()
      .setTitle(esLang.chooseTitle)
      .setColor("#3498db")
      .addFields(
        { name: esLang.chooseOptionsText, value: options.join("\n") },
        { name: esLang.chooseChosenText, value: chosenOption },
      )
      .setTimestamp()

    await interaction.reply({ embeds: [embed] })
  },
}

