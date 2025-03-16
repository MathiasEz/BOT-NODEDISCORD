const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Muestra información detallada sobre el servidor"),

  async execute(interaction, client) {
    const lang = client.lang

    try {
      const guild = interaction.guild

      // Obtener información del servidor
      const owner = await guild.fetchOwner()
      const memberCount = guild.memberCount
      const botCount = guild.members.cache.filter((member) => member.user.bot).size
      const nonBotCount = memberCount - botCount
      const boostCount = guild.premiumSubscriptionCount

      const categories = guild.channels.cache.filter((channel) => channel.type === 4).size
      const textChannels = guild.channels.cache.filter((channel) => channel.type === 0).size
      const voiceChannels = guild.channels.cache.filter((channel) => channel.type === 2).size
      const stageChannels = guild.channels.cache.filter((channel) => channel.type === 13).size
      const totalChannels = guild.channels.cache.size

      const normalEmojis = guild.emojis.cache.filter((emoji) => !emoji.animated).size
      const animatedEmojis = guild.emojis.cache.filter((emoji) => emoji.animated).size
      const totalEmojis = guild.emojis.cache.size

      const stickers = guild.stickers ? guild.stickers.cache.size : 0
      const roles = guild.roles.cache.size

      // Crear un embed con la información del servidor
      const embed = new EmbedBuilder()
        .setTitle(lang.serverInfoTitle)
        .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
        .addFields(
          { name: lang.serverInfoFields.serverName, value: guild.name, inline: true },
          { name: lang.serverInfoFields.serverOwner, value: `${owner.user.tag}`, inline: true },
          { name: lang.serverInfoFields.serverId, value: guild.id, inline: true },
          { name: lang.serverInfoFields.members, value: `${memberCount}`, inline: true },
          { name: lang.serverInfoFields.membersNonBots, value: `${nonBotCount}`, inline: true },
          { name: lang.serverInfoFields.bots, value: `${botCount}`, inline: true },
          { name: lang.serverInfoFields.serverBoosts, value: `${boostCount}`, inline: true },
          { name: lang.serverInfoFields.categories, value: `${categories}`, inline: true },
          { name: lang.serverInfoFields.totalChannels, value: `${totalChannels}`, inline: true },
          { name: lang.serverInfoFields.textChannels, value: `${textChannels}`, inline: true },
          { name: lang.serverInfoFields.voiceChannels, value: `${voiceChannels}`, inline: true },
          { name: lang.serverInfoFields.stageChannels, value: `${stageChannels}`, inline: true },
          { name: lang.serverInfoFields.emojis, value: `${totalEmojis}`, inline: true },
          { name: lang.serverInfoFields.normalEmojis, value: `${normalEmojis}`, inline: true },
          { name: lang.serverInfoFields.animatedEmojis, value: `${animatedEmojis}`, inline: true },
          { name: lang.serverInfoFields.stickers, value: `${stickers}`, inline: true },
          { name: lang.serverInfoFields.roles, value: `${roles}`, inline: true },
          {
            name: lang.serverInfoFields.serverCreatedOn,
            value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`,
            inline: false,
          },
        )
        .setColor("#3498db")
        .setFooter({ text: guild.name, iconURL: guild.iconURL({ dynamic: true }) })
        .setTimestamp()

      await interaction.reply({ embeds: [embed] })
    } catch (error) {
      console.error("Error en el comando serverinfo:", error)
      await interaction.reply({
        content: lang.serverInfoError,
        ephemeral: true,
      })
    }
  },
}

