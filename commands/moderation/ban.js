const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("banear")
    .setDescription(esLang.banCommandDescription)
    .addUserOption((option) => option.setName("objetivo").setDescription(esLang.banTargetDescription).setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    // Verificar si el mensaje es un comando de prefijo
    if (!interaction.isChatInputCommand()) {
      return interaction.reply({
        embeds: [
          {
            title: esLang.banAlert,
            description: esLang.banOnlySlashCommand,
            color: 0xff0000,
          },
        ],
        ephemeral: true,
      })
    }

    // Verificar permisos
    if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      return interaction.reply({
        content: esLang.banNoPermission,
        ephemeral: true,
      })
    }

    const target = interaction.options.getUser("objetivo")

    // Verificar si el bot puede banear al miembro
    try {
      const member = await interaction.guild.members.fetch(target.id)

      if (!member.bannable) {
        return interaction.reply({
          content: esLang.banCannotBan.replace("${target.tag}", target.tag),
          ephemeral: true,
        })
      }

      // Banear al miembro
      await interaction.guild.members.ban(target)
      await interaction.reply({
        content: esLang.banSuccess.replace("${target.tag}", target.tag),
      })
    } catch (error) {
      console.error("Error al banear:", error)
      await interaction.reply({
        content: `Ocurrió un error al intentar banear al miembro: ${error.message}`,
        ephemeral: true,
      })
    }
  },
}

