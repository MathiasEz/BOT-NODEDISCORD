const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Activa el bucle para la canción actual o toda la cola")
    .addStringOption((option) =>
      option
        .setName("mode")
        .setDescription('Modo de bucle: "queue" o "song"')
        .setRequired(true)
        .addChoices(
          { name: "Desactivar", value: "off" },
          { name: "Canción", value: "song" },
          { name: "Cola", value: "queue" },
        ),
    ),

  async execute(interaction, client) {
    const lang = client.lang

    // Verificar si el usuario está en un canal de voz
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: lang.loopNoVoiceChannel,
        ephemeral: true,
      })
    }

    // Verificar permisos
    const permissions = interaction.member.voice.channel.permissionsFor(interaction.client.user)
    if (!permissions.has("Connect") || !permissions.has("Speak")) {
      return interaction.reply({
        content: lang.loopNoPermissions,
        ephemeral: true,
      })
    }

    // Verificar si hay una cola de reproducción
    const queue = client.distube.getQueue(interaction.guildId)
    if (!queue) {
      const embed = new EmbedBuilder().setTitle(lang.loopNoQueueTitle).setDescription(lang.loopNoQueue).setColor("Red")

      return interaction.reply({ embeds: [embed], ephemeral: true })
    }

    try {
      // Obtener el modo de bucle
      const mode = interaction.options.getString("mode")
      let modeValue = 0
      let modeText = ""

      // Establecer el modo de bucle
      if (mode === "off") {
        modeValue = 0
        modeText = lang.loopDisabled
      } else if (mode === "song") {
        modeValue = 1
        modeText = lang.loopSongEnabled
      } else if (mode === "queue") {
        modeValue = 2
        modeText = lang.loopQueueEnabled
      }

      // Aplicar el modo de bucle
      queue.setRepeatMode(modeValue)

      // Crear un embed con la confirmación
      const embed = new EmbedBuilder()
        .setTitle(lang.loopTitle)
        .setDescription(modeText)
        .setColor("#3498db")
        .setFooter({ text: lang.loopFooterText })

      await interaction.reply({ embeds: [embed] })
    } catch (error) {
      console.error("Error en el comando loop:", error)
      await interaction.reply({
        content: lang.loopError,
        ephemeral: true,
      })
    }
  },
}

