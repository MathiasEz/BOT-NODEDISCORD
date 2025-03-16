const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { useMainPlayer } = require("discord-player")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder().setName("mreanudar").setDescription(esLang.mresumeDescription),

  async execute(interaction) {
    try {
      // Obtener el reproductor y la cola
      const player = useMainPlayer()
      if (!player) {
        return interaction.reply({ content: "No se pudo inicializar el reproductor de música.", ephemeral: true })
      }
      const queue = player.nodes.get(interaction.guildId)

      // Verificar si hay música reproduciéndose
      if (!queue || !queue.node.isPlaying()) {
        return interaction.reply({ content: esLang.noMusicPlayingError, ephemeral: true })
      }

      // Verificar si la música está pausada
      if (!queue.node.isPaused()) {
        return interaction.reply({ content: "La música ya está reproduciéndose.", ephemeral: true })
      }

      // Reanudar la canción
      queue.node.resume()

      // Crear el embed
      const embed = new EmbedBuilder()
        .setTitle(esLang.songResumedTitle)
        .setDescription(esLang.songResumedText)
        .setColor("#3498db")
        .setFooter({ text: esLang.footerText })

      await interaction.reply({ embeds: [embed] })
    } catch (error) {
      console.error("Error en el comando mresume:", error)
      await interaction.reply({ content: "Ocurrió un error al reanudar la canción.", ephemeral: true })
    }
  },
}

