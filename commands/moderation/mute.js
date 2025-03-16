const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("silenciar")
    .setDescription(esLang.muteCommandDescription)
    .addUserOption((option) =>
      option.setName("objetivo").setDescription(esLang.muteTargetDescription).setRequired(true),
    )
    .addIntegerOption((option) =>
      option.setName("duración").setDescription(esLang.muteDurationDescription).setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    // Verificar si el mensaje es un comando de prefijo
    if (!interaction.isChatInputCommand()) {
      return interaction.reply({
        embeds: [
          {
            title: esLang.muteAlert,
            description: esLang.muteOnlySlashCommand,
            color: 0xff0000,
          },
        ],
        ephemeral: true,
      })
    }

    // Verificar permisos
    if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      return interaction.reply({
        content: esLang.muteNoPermission,
        ephemeral: true,
      })
    }

    const target = interaction.options.getUser("objetivo")
    const duration = interaction.options.getInteger("duración")

    // Verificar si el bot puede silenciar al miembro
    try {
      const member = await interaction.guild.members.fetch(target.id)

      if (!member.moderatable) {
        return interaction.reply({
          content: esLang.muteCannotMute.replace("${target.tag}", target.tag),
          ephemeral: true,
        })
      }

      // Calcular la fecha de finalización del silencio
      const muteEndDate = new Date()
      muteEndDate.setMinutes(muteEndDate.getMinutes() + duration)

      // Silenciar al miembro
      await member.timeout(duration * 60 * 1000, "Silenciado por comando")
      await interaction.reply({
        content: esLang.muteSuccess.replace("${target.tag}", target.tag).replace("${duration}", duration),
      })
    } catch (error) {
      console.error("Error al silenciar:", error)
      await interaction.reply({
        content: `Ocurrió un error al intentar silenciar al miembro: ${error.message}`,
        ephemeral: true,
      })
    }
  },
}

