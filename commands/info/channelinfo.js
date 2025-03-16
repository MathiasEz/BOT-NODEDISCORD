const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("channelinfo")
    .setDescription("Muestra información detallada sobre un canal")
    .addChannelOption((option) =>
      option.setName("channel").setDescription("El canal sobre el que obtener información").setRequired(false),
    ),

  async execute(interaction, client) {
    const lang = client.lang

    // Obtener el canal objetivo o usar el canal actual
    const channel = interaction.options.getChannel("channel") || interaction.channel

    // Verificar si el canal es válido
    if (!channel) {
      return interaction.reply({
        content: lang.channelMentionValid,
        ephemeral: true,
      })
    }

    // Mapear los tipos de canal a nombres legibles
    const channelTypes = {
      [ChannelType.GuildText]: "Texto",
      [ChannelType.GuildVoice]: "Voz",
      [ChannelType.GuildCategory]: "Categoría",
      [ChannelType.GuildNews]: "Anuncios",
      [ChannelType.GuildNewsThread]: "Hilo de Anuncios",
      [ChannelType.GuildPublicThread]: "Hilo Público",
      [ChannelType.GuildPrivateThread]: "Hilo Privado",
      [ChannelType.GuildStageVoice]: "Escenario",
      [ChannelType.GuildForum]: "Foro",
    }

    // Crear un embed con la información del canal
    const embed = new EmbedBuilder()
      .setTitle(lang.channelInfo)
      .addFields(
        { name: lang.channelName, value: channel.name, inline: true },
        { name: lang.channelID, value: channel.id, inline: true },
        { name: lang.channelType, value: channelTypes[channel.type] || "Desconocido", inline: true },
        { name: lang.channelCreatedAt, value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:F>`, inline: false },
      )
      .setColor("#3498db")

    // Añadir información específica según el tipo de canal
    if (channel.type === ChannelType.GuildText || channel.type === ChannelType.GuildNews) {
      embed.addFields(
        { name: lang.channelTopic, value: channel.topic || lang.channelNone, inline: false },
        { name: lang.channelNSFW, value: channel.nsfw ? lang.channelYes : lang.channelNo, inline: true },
        { name: lang.channelPosition, value: `${channel.position}`, inline: true },
      )

      if (channel.parent) {
        embed.addFields({ name: lang.channelCategory, value: channel.parent.name, inline: true })
      }
    }

    await interaction.reply({ embeds: [embed] })
  },
}

