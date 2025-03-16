const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder().setName("skip").setDescription("Salta la canción actual en la cola"),

  async execute(interaction, client) {
    const lang = client.lang

    // Verificar si el usuario está en un canal de voz
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: lang.skipNoVoiceChannel,
        ephemeral: true,
      })
    }

    // Verificar permisos
    const permissions = interaction.member.voice.channel.permissionsFor(interaction.client.user)
    if (!permissions.has("Connect") || !permissions.has("Speak")) {
      return interaction.reply({
        content: lang.skipNoPermissions,
        ephemeral: true,
      })
    }

    // Verificar si hay una cola de reproducción
    const queue = client.distube.getQueue(interaction.guildId)
    if (!queue) {
      const embed = new EmbedBuilder()
        .setTitle(lang.skipNoQueueTitle)
        .setDescription(lang.skipNoQueueMessage)
        .setColor("Red")

      return interaction.reply({ embeds: [embed], ephemeral: true })
    }

    // Verificar si hay más canciones en la cola
    if (queue.songs.length <= 1) {
      const embed = new EmbedBuilder()
        .setTitle(lang.skipNoUpNextTitle)
        .setDescription(lang.skipNoUpNextMessage)
        .setColor("Red")

      return interaction.reply({ embeds: [embed], ephemeral: true })
    }

    try {
      // Informar al usuario que estamos saltando la canción
      await interaction.reply({
        content: lang.skipInProgress,
      })

      // Obtener la información de la canción actual antes de saltarla
      const currentSong = queue.songs[0]

      // Saltar la canción
      await queue.skip()

      // Crear un embed con la información de la canción saltada
      const embed = new EmbedBuilder()
        .setTitle(lang.skipSuccessTitle)
        .addFields(
          { name: lang.skipTitleField, value: currentSong.name, inline: false },
          { name: lang.skipDurationField, value: currentSong.formattedDuration, inline: true },
        )
        .setThumbnail(currentSong.thumbnail)
        .setColor("#3498db")

      await interaction.editReply({ content: "", embeds: [embed] })
    } catch (error) {
      console.error("Error en el comando skip:", error)
      await interaction.followUp({
        content: lang.skipErrorMessage,
        ephemeral: true,
      })
    }
  },
}

