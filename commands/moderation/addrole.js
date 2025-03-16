const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("añadirrol")
    .setDescription(esLang.addRoleCommandDescription)
    .addUserOption((option) =>
      option.setName("objetivo").setDescription(esLang.addRoleTargetDescription).setRequired(true),
    )
    .addRoleOption((option) => option.setName("rol").setDescription(esLang.addRoleRoleDescription).setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    // Verificar si el mensaje es un comando de prefijo
    if (!interaction.isChatInputCommand()) {
      return interaction.reply({
        embeds: [
          {
            title: esLang.addRoleAlert,
            description: esLang.addRoleOnlySlashCommand,
            color: 0xff0000,
          },
        ],
        ephemeral: true,
      })
    }

    // Verificar permisos
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return interaction.reply({
        content: esLang.addRoleNoPermission,
        ephemeral: true,
      })
    }

    const target = interaction.options.getUser("objetivo")
    const role = interaction.options.getRole("rol")

    // Verificar si el bot puede gestionar el rol
    if (role.position >= interaction.guild.members.me.roles.highest.position) {
      return interaction.reply({
        content: `No puedo añadir el rol ${role.name} porque está por encima de mi rol más alto.`,
        ephemeral: true,
      })
    }

    const member = await interaction.guild.members.fetch(target.id)

    // Verificar si el miembro ya tiene el rol
    if (member.roles.cache.has(role.id)) {
      return interaction.reply({
        content: esLang.addRoleAlreadyHasRole.replace("${target.tag}", target.tag).replace("${role.name}", role.name),
        ephemeral: true,
      })
    }

    // Añadir el rol
    try {
      await member.roles.add(role)
      await interaction.reply({
        content: esLang.addRoleSuccess.replace("${role.name}", role.name).replace("${target.tag}", target.tag),
      })
    } catch (error) {
      console.error("Error al añadir rol:", error)
      await interaction.reply({
        content: `Ocurrió un error al intentar añadir el rol: ${error.message}`,
        ephemeral: true,
      })
    }
  },
}

