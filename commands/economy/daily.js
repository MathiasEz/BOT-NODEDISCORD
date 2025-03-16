const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { Users } = require("../../dbObjects")

module.exports = {
  data: new SlashCommandBuilder().setName("daily").setDescription("Claim your daily reward!"),
  async execute(interaction) {
    const user = await Users.findOne({ where: { user_id: interaction.user.id } })

    if (!user) {
      return interaction.reply("You don't have an account yet! Use /start to create one.")
    }

    const now = new Date()
    const lastDaily = user.last_daily

    if (lastDaily) {
      const diff = now.getTime() - lastDaily.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))

      if (hours < 24) {
        const timeLeft = 24 - hours
        return interaction.reply(`You can claim your daily reward again in ${timeLeft} hours.`)
      }
    }

    const dailyReward = 500
    user.balance += dailyReward
    user.last_daily = now
    await user.save()

    const embed = new EmbedBuilder()
      .setColor("#00FF00")
      .setTitle("Daily Reward")
      .setDescription(`You claimed your daily reward of ${dailyReward} coins!`)
      .addFields({ name: "Balance", value: `${user.balance} coins` })
      .setTimestamp()

    await interaction.reply({ embeds: [embed] })
  },
}

