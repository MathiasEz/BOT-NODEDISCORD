const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder().setName("pause").setDescription("Pausa la canción actual"),

  async execute(interaction, client) {
    const lang = client.lang

    // Verificar si el usuario está en un canal de voz
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: lang.pauseNoVoiceChannel,
        ephemeral: true,
      })
    }

    // Verificar permisos
    const permissions = interaction.member.voice.channel.permissionsFor(interaction.client.user)
    if (!permissions.has("Connect") || !permissions.has("Speak")) {
      return interaction.reply({
        content: lang.pauseNoPermissions,
        ephemeral: true,
      })
    }

    // Verificar si hay una cola de reproducción
    const queue = client.distube.getQueue(interaction.guildId)
    if (!queue) {
      const embed = new EmbedBuilder()
        .setTitle(lang.pauseNoQueueTitle)
        .setDescription(lang.pauseNoQueue)
        .setColor("Red")

      return interaction.reply({ embeds: [embed], ephemeral: true })
    }

    try {
      // Verificar si la canción ya está pausada
      if (queue.paused) {
        const embed = new EmbedBuilder()
          .setTitle(lang.pauseAlreadyPausedTitle)
          .setDescription(lang.pauseAlreadyPaused)
          .setColor("Red")

        return interaction.reply({ embeds: [embed], ephemeral: true })
      }

      // Informar al usuario que estamos pausando la canción
      await interaction.reply({
        content: lang.pauseInProgress,
      })

      // Pausar la canción
      queue.pause()

      // Crear un embed con la confirmación
      const embed = new EmbedBuilder()
        .setTitle(lang.pauseTitle)
        .setDescription(lang.pauseSuccess)
        .setColor("#3498db")
        .setFooter({ text: lang.pauseFooterText })

      await interaction.editReply({ content: "", embeds: [embed] })
    } catch (error) {
      console.error("Error en el comando pause:", error)

      const embed = new EmbedBuilder().setTitle(lang.pauseErrorTitle).setDescription(lang.pauseError).setColor("Red")

      await interaction.followUp({ embeds: [embed], ephemeral: true })
    }
  },
}

