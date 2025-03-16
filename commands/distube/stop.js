const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder().setName("stop").setDescription("Detiene la cola actual y abandona el canal de voz"),

  async execute(interaction, client) {
    const lang = client.lang

    // Verificar si el usuario está en un canal de voz
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: lang.stopNoVoiceChannel,
        ephemeral: true,
      })
    }

    // Verificar permisos
    const permissions = interaction.member.voice.channel.permissionsFor(interaction.client.user)
    if (!permissions.has("Connect") || !permissions.has("Speak")) {
      return interaction.reply({
        content: lang.stopNoPermissions,
        ephemeral: true,
      })
    }

    // Verificar si hay una cola de reproducción
    const queue = client.distube.getQueue(interaction.guildId)
    if (!queue) {
      const embed = new EmbedBuilder()
        .setTitle(lang.stopNoQueueTitle)
        .setDescription(lang.stopNoQueueMessage)
        .setColor("Red")

      return interaction.reply({ embeds: [embed], ephemeral: true })
    }

    try {
      // Informar al usuario que estamos deteniendo la cola
      await interaction.reply({
        content: lang.stopInProgress,
      })

      // Detener la cola y abandonar el canal de voz
      queue.stop()

      // Crear un embed con la confirmación
      const embed = new EmbedBuilder()
        .setTitle(lang.stopSuccessTitle)
        .setDescription(lang.stopSuccessMessage)
        .setColor("#3498db")

      await interaction.editReply({ content: "", embeds: [embed] })
    } catch (error) {
      console.error("Error en el comando stop:", error)
      await interaction.followUp({
        content: lang.stopErrorMessage,
        ephemeral: true,
      })
    }
  },
}

