const { EmbedBuilder } = require("discord.js")

module.exports = {
  name: "dussehra",
  description: "🏹 Countdown to Dussehra!",
  execute(message) {
    const today = new Date()
    const dussehra = new Date(today.getFullYear(), 9, 2) // **Dussehra 2025: October 2**

    if (today > dussehra) {
      dussehra.setFullYear(dussehra.getFullYear() + 1)
    }

    const daysLeft = Math.ceil((dussehra - today) / (1000 * 60 * 60 * 24))

    const embed = new EmbedBuilder()
      .setTitle("🏹 Dussehra Countdown 🔥")
      .setDescription(
        `🎆 **${daysLeft} days left until Dussehra!**\n📅 **Next Dussehra:** October 2, ${dussehra.getFullYear()}`,
      )
      .setColor("#ff4500")
      .setTimestamp()

    message.reply({ embeds: [embed] })
  },
}

