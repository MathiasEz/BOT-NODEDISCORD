const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Reproduce una canción o lista de reproducción en tu canal de voz")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("El enlace o nombre de la canción o lista de reproducción")
        .setRequired(true),
    ),

  async execute(interaction, client) {
    const lang = client.lang

    // Obtener el input del usuario
    const input = interaction.options.getString("input")

    // Verificar si el usuario proporcionó un input
    if (!input) {
      return interaction.reply({
        content: lang.playNoInput,
        ephemeral: true,
      })
    }

    // Verificar si el usuario está en un canal de voz
    const voiceChannel = interaction.member.voice.channel
    if (!voiceChannel) {
      return interaction.reply({
        content: lang.playNoVoiceChannel,
        ephemeral: true,
      })
    }

    // Verificar permisos
    const permissions = voiceChannel.permissionsFor(interaction.client.user)
    if (!permissions.has("Connect") || !permissions.has("Speak")) {
      return interaction.reply({
        content: lang.playNoPermissions,
        ephemeral: true,
      })
    }

    // Informar al usuario que estamos procesando su solicitud
    await interaction.reply({
      content: `${lang.playInProgress} **${input}**`,
    })

    try {
      // Reproducir la canción
      await client.distube.play(voiceChannel, input, {
        member: interaction.member,
        textChannel: interaction.channel,
      })
    } catch (error) {
      console.error("Error en el comando play:", error)
      await interaction.followUp({
        content: `${lang.playError} ${error.message}`,
        ephemeral: true,
      })
    }
  },
}

