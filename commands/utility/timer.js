const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("temporizador")
    .setDescription(esLang.timerDescription)
    .addIntegerOption((option) =>
      option.setName("minutos").setDescription("Número de minutos para el temporizador").setRequired(true),
    ),

  async execute(interaction) {
    const minutes = interaction.options.getInteger("minutos")

    if (minutes <= 0 || minutes > 1440) {
      // Máximo 24 horas (1440 minutos)
      return interaction.reply({ content: esLang.invalidMinutes, ephemeral: true })
    }

    const embed = new EmbedBuilder()
      .setTitle("⏱️ Temporizador")
      .setDescription(esLang.timerSetMessage.replace("{minutes}", minutes))
      .setColor("#3498db")
      .setTimestamp()

    await interaction.reply({ embeds: [embed] })

    // Establecer el temporizador
    setTimeout(
      async () => {
        try {
          const timerEndEmbed = new EmbedBuilder()
            .setTitle("⏱️ ¡Temporizador Finalizado!")
            .setDescription(esLang.timerUpMessage.replace("{user}", interaction.user).replace("{minutes}", minutes))
            .setColor("#FF0000")
            .setTimestamp()

          await interaction.followUp({
            content: `${interaction.user}`,
            embeds: [timerEndEmbed],
          })
        } catch (error) {
          console.error("Error al enviar notificación de temporizador:", error)
        }
      },
      minutes * 60 * 1000,
    )
  },
}

