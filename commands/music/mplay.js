const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { useMainPlayer, QueryType } = require("discord-player")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mreproducir")
    .setDescription(esLang.mplayDescription)
    .addStringOption((option) =>
      option.setName("consulta").setDescription("Nombre o URL de la canción/lista de reproducción").setRequired(true),
    ),

  async execute(interaction) {
    try {
      await interaction.deferReply()

      // Verificar si el usuario está en un canal de voz
      const voiceChannel = interaction.member.voice.channel
      if (!voiceChannel) {
        return interaction.editReply({ content: esLang.joinVoiceChannelError, ephemeral: true })
      }

      // Verificar permisos
      const permissions = voiceChannel.permissionsFor(interaction.client.user)
      if (!permissions.has("Connect")) {
        return interaction.editReply({ content: esLang.connectPermissionError, ephemeral: true })
      }
      if (!permissions.has("Speak")) {
        return interaction.editReply({ content: esLang.speakPermissionError, ephemeral: true })
      }

      // Obtener la consulta
      const query = interaction.options.getString("consulta")

      // Obtener el reproductor
      const player = useMainPlayer()

      try {
        // Buscar la canción
        const searchResult = await player.search(query, {
          requestedBy: interaction.user,
          searchEngine: QueryType.AUTO,
        })

        // Verificar si se encontraron resultados
        if (!searchResult || searchResult.tracks.length === 0) {
          const embed = new EmbedBuilder()
            .setTitle(esLang.noResultsTitle)
            .setDescription(`No se encontraron resultados para: ${query}`)
            .setColor("#FF0000")

          return interaction.editReply({ embeds: [embed] })
        }

        // Crear o obtener la cola
        const queue = player.nodes.create(interaction.guildId, {
          metadata: {
            channel: interaction.channel,
            client: interaction.client,
          },
          selfDeaf: true,
          volume: 80,
          leaveOnEmpty: true,
          leaveOnEnd: true,
        })

        // Conectar al canal de voz si no está conectado
        if (!queue.connection) {
          await queue.connect(voiceChannel)
        }

        // Crear el embed de respuesta
        let embed

        // Añadir la canción o lista de reproducción a la cola
        if (searchResult.playlist) {
          // Es una lista de reproducción
          queue.addTrack(searchResult.tracks)

          embed = new EmbedBuilder()
            .setTitle(esLang.playlistEnqueuedTitle)
            .setDescription(
              `${esLang.addingPlaylist}: **${searchResult.playlist.title}** ${esLang.withTracks} **${searchResult.tracks.length}** ${esLang.tracks}`,
            )
            .setThumbnail(searchResult.playlist.thumbnail)
            .setColor("#3498db")
            .setFooter({ text: esLang.footerText })
        } else {
          // Es una sola canción
          queue.addTrack(searchResult.tracks[0])

          embed = new EmbedBuilder()
            .setTitle(esLang.trackEnqueuedTitle)
            .setDescription(`${esLang.addingTrack}: **${searchResult.tracks[0].title}**`)
            .setThumbnail(searchResult.tracks[0].thumbnail)
            .setColor("#3498db")
            .setFooter({ text: esLang.footerText })
        }

        // Iniciar la reproducción si no está reproduciendo
        if (!queue.isPlaying()) {
          await queue.node.play()
        }

        await interaction.editReply({ embeds: [embed] })
      } catch (error) {
        console.error("Error en la búsqueda:", error)
        return interaction.editReply({ content: `${esLang.searchError} ${error.message}` })
      }
    } catch (error) {
      console.error("Error en el comando mplay:", error)
      return interaction.editReply({ content: esLang.unexpectedError })
    }
  },
}

