const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Muestra información detallada sobre un usuario")
    .addUserOption((option) =>
      option.setName("target").setDescription("El usuario sobre el que obtener información").setRequired(false),
    ),

  async execute(interaction, client) {
    const lang = client.lang

    // Obtener el usuario objetivo o usar el autor de la interacción
    const target = interaction.options.getUser("target") || interaction.user
    const member = interaction.guild.members.cache.get(target.id)

    // Crear un embed con la información del usuario
    const embed = new EmbedBuilder()
      .setTitle(lang.userinfoTitle)
      .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 1024 }))
      .addFields(
        { name: lang.userinfoUsername, value: target.tag, inline: true },
        { name: lang.userinfoUserID, value: target.id, inline: true },
        {
          name: lang.userinfoJoinedDiscord,
          value: `<t:${Math.floor(target.createdTimestamp / 1000)}:F>`,
          inline: false,
        },
      )
      .setColor("#3498db")

    // Añadir información del miembro si está disponible
    if (member) {
      const roles =
        member.roles.cache
          .filter((role) => role.id !== interaction.guild.id)
          .sort((a, b) => b.position - a.position)
          .map((role) => role.toString())
          .join(", ") || lang.userinfoNone

      const highestRole =
        member.roles.highest.id === interaction.guild.id ? lang.userinfoNone : member.roles.highest.toString()

      embed.addFields(
        { name: lang.userinfoJoinedServer, value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: false },
        { name: lang.userinfoRoles, value: roles.length > 1024 ? roles.slice(0, 1020) + "..." : roles, inline: false },
        { name: lang.userinfoHighestRole, value: highestRole, inline: true },
        { name: lang.userinfoIsBot, value: target.bot ? lang.userinfoYes : lang.userinfoNo, inline: true },
      )
    }

    await interaction.reply({ embeds: [embed] })
  },
}

