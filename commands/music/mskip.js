const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { useMainPlayer } = require("discord-player")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder().setName("msaltar").setDescription(esLang.mskipDescription),

  async execute(interaction) {
    try {
      // Obtener el reproductor y la cola
      const player = useMainPlayer()

      // Verificar si el reproductor está disponible
      if (!player) {
        return interaction.reply({ content: esLang.noPlayerError, ephemeral: true })
      }

      const queue = player.nodes.get(interaction.guildId)

      // Verificar si hay música reproduciéndose
      if (!queue || !queue.isPlaying()) {
        return interaction.reply({ content: esLang.noMusicPlayingError, ephemeral: true })
      }

      // Guardar la canción actual antes de saltarla
      const currentTrack = queue.currentTrack

      // Verificar si hay más canciones en la cola
      if (queue.tracks.size === 0) {
        await queue.delete()

        const embed = new EmbedBuilder()
          .setTitle(esLang.noSongsTitle)
          .setDescription(esLang.noMoreTracksText)
          .setColor("#FF0000")
          .setFooter({ text: esLang.footerText })

        return interaction.reply({ embeds: [embed] })
      }

      // Saltar la canción
      await queue.node.skip()

      // Crear el embed
      const embed = new EmbedBuilder()
        .setTitle(esLang.songSkippedTitle)
        .setDescription(`**${currentTrack.title}** ha sido saltada.\n\n${esLang.playingNextSongText}`)
        .setThumbnail(currentTrack.thumbnail)
        .setColor("#3498db")
        .setFooter({ text: esLang.footerText })

      await interaction.reply({ embeds: [embed] })
    } catch (error) {
      console.error("Error en el comando mskip:", error)
      await interaction.reply({ content: "Ocurrió un error al saltar la canción.", ephemeral: true })
    }
  },
}

