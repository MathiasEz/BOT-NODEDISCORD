const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  PermissionsBitField,
} = require("discord.js")
const Level = require("../../Schemas/Level")
const calculateLevelXp = require("../../utils/calculateLevelXp")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Shows the leaderboard of the server.")
    .setDMPermission(false),
  async execute(interaction, client) {
    const { guild, commandName } = interaction

    const leaderboardEmbed = new EmbedBuilder().setColor("Blue").setTitle(`${guild.name}'s Leaderboard`).setTimestamp()

    const rawLeaderboard = await Level.find({ guildId: guild.id })
      .cache()
      .sort({
        level: -1,
        xp: -1,
      })
      .limit(10)

    if (rawLeaderboard.length < 1)
      return interaction.reply({ content: "Nobody is on the leaderboard yet.", ephemeral: true })

    const leaderboard = await Promise.all(
      rawLeaderboard.map(async (key) => {
        try {
          const member = await guild.members.fetch(key.userId)
          return `\`${rawLeaderboard.indexOf(key) + 1}\` ${member.user.tag} - Level: ${key.level} - XP: ${key.xp}`
        } catch (error) {
          return `\`${rawLeaderboard.indexOf(key) + 1}\` User Left - Level: ${key.level} - XP: ${key.xp}`
        }
      }),
    )

    leaderboardEmbed.setDescription(`${leaderboard.join("\n")}`)
    interaction.reply({ embeds: [leaderboardEmbed] })
  },
}

