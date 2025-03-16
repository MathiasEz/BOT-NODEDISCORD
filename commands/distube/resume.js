const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder().setName("resume").setDescription("Reanuda la canción pausada"),

  async execute(interaction, client) {
    const lang = client.lang

    // Verificar si el usuario está en un canal de voz
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: lang.resumeNoVoiceChannel,
        ephemeral: true,
      })
    }

    // Verificar permisos
    const permissions = interaction.member.voice.channel.permissionsFor(interaction.client.user)
    if (!permissions.has("Connect") || !permissions.has("Speak")) {
      return interaction.reply({
        content: lang.resumeNoPermissions,
        ephemeral: true,
      })
    }

    // Verificar si hay una cola de reproducción
    const queue = client.distube.getQueue(interaction.guildId)
    if (!queue) {
      const embed = new EmbedBuilder()
        .setTitle(lang.resumeNoQueueTitle)
        .setDescription(lang.resumeNoQueueMessage)
        .setColor("Red")

      return interaction.reply({ embeds: [embed], ephemeral: true })
    }

    try {
      // Verificar si la canción está pausada
      if (!queue.paused) {
        const embed = new EmbedBuilder()
          .setTitle(lang.resumeNotPausedTitle)
          .setDescription(lang.resumeNotPausedMessage)
          .setColor("Red")

        return interaction.reply({ embeds: [embed], ephemeral: true })
      }

      // Informar al usuario que estamos reanudando la canción
      await interaction.reply({
        content: lang.resumeInProgress,
      })

      // Reanudar la canción
      queue.resume()

      // Crear un embed con la confirmación
      const embed = new EmbedBuilder()
        .setTitle(lang.resumeSuccessTitle)
        .setDescription(lang.resumeSuccessMessage)
        .setColor("#3498db")

      await interaction.editReply({ content: "", embeds: [embed] })
    } catch (error) {
      console.error("Error en el comando resume:", error)
      await interaction.followUp({
        content: lang.resumeErrorMessage,
        ephemeral: true,
      })
    }
  },
}

