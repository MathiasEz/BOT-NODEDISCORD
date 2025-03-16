const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Establece el volumen del reproductor de música")
    .addIntegerOption((option) =>
      option
        .setName("level")
        .setDescription("Nivel de volumen entre 1 y 100")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100),
    ),

  async execute(interaction, client) {
    const lang = client.lang

    // Verificar si el usuario está en un canal de voz
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: lang.volumeNoVoiceChannel,
        ephemeral: true,
      })
    }

    // Verificar permisos
    const permissions = interaction.member.voice.channel.permissionsFor(interaction.client.user)
    if (!permissions.has("Connect") || !permissions.has("Speak")) {
      return interaction.reply({
        content: lang.volumeNoPermissions,
        ephemeral: true,
      })
    }

    // Verificar si hay una canción reproduciéndose
    const queue = client.distube.getQueue(interaction.guildId)
    if (!queue) {
      const embed = new EmbedBuilder()
        .setTitle(lang.volumeNoSongTitle)
        .setDescription(lang.volumeNoSongMessage)
        .setColor("Red")

      return interaction.reply({ embeds: [embed], ephemeral: true })
    }

    // Obtener el nivel de volumen
    const volumeLevel = interaction.options.getInteger("level")

    try {
      // Establecer el volumen
      queue.setVolume(volumeLevel)

      // Crear un embed con la confirmación
      const embed = new EmbedBuilder()
        .setTitle(lang.volumeSuccessTitle)
        .setDescription(lang.volumeSuccessMessage.replace("{volumeLevel}", volumeLevel))
        .setColor("#3498db")

      await interaction.reply({ embeds: [embed] })
    } catch (error) {
      console.error("Error en el comando volume:", error)
      await interaction.reply({
        content: lang.volumeErrorMessage,
        ephemeral: true,
      })
    }
  },
}

