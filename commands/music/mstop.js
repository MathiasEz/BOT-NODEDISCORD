const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { useMainPlayer } = require("discord-player")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder().setName("mdetener").setDescription(esLang.mstopDescription),

  async execute(interaction) {
    try {
      // Obtener el reproductor
      const player = useMainPlayer()

      // Obtener la cola
      const queue = player.nodes.get(interaction.guildId)

      // Verificar si hay música reproduciéndose
      if (!queue || !queue.isPlaying()) {
        return interaction.reply({ content: esLang.noMusicPlayingError, ephemeral: true })
      }

      // Detener la cola
      queue.delete()

      // Crear el embed
      const embed = new EmbedBuilder()
        .setTitle(esLang.stoppedTitle)
        .setDescription(esLang.queueStoppedText)
        .setColor("#FF0000")
        .setFooter({ text: esLang.footerText })

      await interaction.reply({ embeds: [embed] })
    } catch (error) {
      console.error("Error en el comando mstop:", error)
      await interaction.reply({ content: "Ocurrió un error al detener la música.", ephemeral: true })
    }
  },
}

