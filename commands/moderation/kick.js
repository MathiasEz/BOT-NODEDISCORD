const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("expulsar")
    .setDescription(esLang.kickCommandDescription)
    .addUserOption((option) =>
      option.setName("objetivo").setDescription(esLang.kickTargetDescription).setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    // Verificar si el mensaje es un comando de prefijo
    if (!interaction.isChatInputCommand()) {
      return interaction.reply({
        embeds: [
          {
            title: esLang.kickAlert,
            description: esLang.kickOnlySlashCommand,
            color: 0xff0000,
          },
        ],
        ephemeral: true,
      })
    }

    // Verificar permisos
    if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
      return interaction.reply({
        content: esLang.kickNoPermission,
        ephemeral: true,
      })
    }

    const target = interaction.options.getUser("objetivo")

    // Verificar si el bot puede expulsar al miembro
    try {
      const member = await interaction.guild.members.fetch(target.id)

      if (!member.kickable) {
        return interaction.reply({
          content: esLang.kickCannotKick.replace("${target.tag}", target.tag),
          ephemeral: true,
        })
      }

      // Expulsar al miembro
      await member.kick()
      await interaction.reply({
        content: esLang.kickSuccess.replace("${target.tag}", target.tag),
      })
    } catch (error) {
      console.error("Error al expulsar:", error)
      await interaction.reply({
        content: `Ocurrió un error al intentar expulsar al miembro: ${error.message}`,
        ephemeral: true,
      })
    }
  },
}

