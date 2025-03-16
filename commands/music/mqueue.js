const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { useMainPlayer } = require("discord-player")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder().setName("mcola").setDescription(esLang.mqueueDescription),

  async execute(interaction) {
    try {
      // Obtener el reproductor y la cola
      const player = useMainPlayer()

      // Verificar si el reproductor está disponible
      if (!player) {
        return interaction.reply({ content: esLang.playerNotFoundError, ephemeral: true })
      }

      const queue = player.nodes.get(interaction.guildId)

      // Verificar si hay música reproduciéndose
      if (!queue || !queue.isPlaying()) {
        return interaction.reply({ content: esLang.noMusicPlayingError, ephemeral: true })
      }

      // Verificar si la cola está vacía
      if (!queue.tracks.size) {
        return interaction.reply({ content: esLang.queueEmptyError, ephemeral: true })
      }

      // Crear una lista de canciones en la cola
      const tracks = queue.tracks.map((track, index) => {
        return `${index + 1}. **${track.title}** - ${track.duration}`
      })

      // Dividir la lista en páginas si es muy larga
      const tracksPerPage = 10
      const pages = Math.ceil(tracks.length / tracksPerPage)
      let tracksString = ""

      if (tracks.length <= tracksPerPage) {
        tracksString = tracks.join("\n")
      } else {
        // Solo mostrar la primera página
        tracksString = tracks.slice(0, tracksPerPage).join("\n")
        tracksString += `\n\n*Y ${tracks.length - tracksPerPage} más...*`
      }

      // Calcular la duración total
      const totalDuration = queue.tracks.reduce((acc, track) => {
        const [minutes, seconds] = track.duration.split(":").map(Number)
        return acc + (minutes * 60 + seconds)
      }, 0)

      const hours = Math.floor(totalDuration / 3600)
      const minutes = Math.floor((totalDuration % 3600) / 60)
      const seconds = totalDuration % 60

      const formattedDuration = `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`

      // Crear el embed
      const embed = new EmbedBuilder()
        .setTitle(esLang.queueTitle)
        .setDescription(`**Canción actual:** ${queue.currentTrack.title}\n\n**Próximas canciones:**\n${tracksString}`)
        .setColor("#3498db")
        .addFields(
          { name: "Total de canciones", value: `${queue.tracks.size + 1}`, inline: true },
          { name: "Duración total", value: formattedDuration, inline: true },
        )
        .setFooter({ text: esLang.footerText })

      await interaction.reply({ embeds: [embed] })
    } catch (error) {
      console.error("Error en el comando mqueue:", error)
      await interaction.reply({ content: esLang.queueError, ephemeral: true })
    }
  },
}

