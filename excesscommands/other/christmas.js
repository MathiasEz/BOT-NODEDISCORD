const { EmbedBuilder } = require("discord.js")

module.exports = {
  name: "christmas",
  description: "🎄 Countdown to Christmas!",
  execute(message) {
    const today = new Date()
    const christmas = new Date(today.getFullYear(), 11, 25) // Dec 25

    if (today > christmas) {
      christmas.setFullYear(christmas.getFullYear() + 1)
    }

    const daysLeft = Math.ceil((christmas - today) / (1000 * 60 * 60 * 24))

    const embed = new EmbedBuilder()
      .setTitle("🎄 Christmas Countdown 🎅")
      .setDescription(`🎁 **${daysLeft} days left until Christmas!**`)
      .setColor("#ff0000")
      .setTimestamp()

    message.reply({ embeds: [embed] })
  },
}

