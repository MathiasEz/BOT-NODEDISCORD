const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { useMainPlayer } = require("discord-player")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mreproduciendo")
    .setDescription("Muestra información sobre la canción actual"),

  async execute(interaction) {
    try {
      // Obtener el reproductor y la cola
      const player = useMainPlayer()

      // Verificar si el reproductor está disponible
      if (!player) {
        return interaction.reply({ content: "No se pudo inicializar el reproductor de música.", ephemeral: true })
      }

      const queue = player.nodes.get(interaction.guildId)

      // Verificar si hay música reproduciéndose
      if (!queue || !queue.isPlaying()) {
        return interaction.reply({ content: esLang.noMusicPlaying, ephemeral: true })
      }

      // Obtener la canción actual
      const currentTrack = queue.currentTrack

      // Crear el embed
      const embed = new EmbedBuilder()
        .setTitle(esLang.nowPlayingTitle)
        .setDescription(esLang.nowPlayingDescription.replace("{trackTitle}", currentTrack.title))
        .setThumbnail(currentTrack.thumbnail)
        .setColor("#3498db")
        .addFields(
          { name: esLang.durationLabel, value: currentTrack.duration, inline: true },
          { name: esLang.authorLabel, value: currentTrack.author, inline: true },
        )
        .setFooter({ text: esLang.footerText })

      await interaction.reply({ embeds: [embed] })
    } catch (error) {
      console.error("Error en el comando mnp:", error)
      await interaction.reply({
        content: "Ocurrió un error al mostrar la información de la canción actual.",
        ephemeral: true,
      })
    }
  },
}

