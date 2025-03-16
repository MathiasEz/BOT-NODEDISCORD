const { EmbedBuilder } = require("discord.js")

module.exports = {
  name: "newyear",
  description: "🎆 Countdown to the New Year!",
  execute(message) {
    const today = new Date()
    const newYear = new Date(today.getFullYear() + 1, 0, 1) // Jan 1

    const daysLeft = Math.ceil((newYear - today) / (1000 * 60 * 60 * 24))

    const embed = new EmbedBuilder()
      .setTitle("🎆 New Year Countdown 🎉")
      .setDescription(`🎇 **${daysLeft} days left until New Year!**`)
      .setColor("#ffcc00")
      .setTimestamp()

    message.reply({ embeds: [embed] })
  },
}

