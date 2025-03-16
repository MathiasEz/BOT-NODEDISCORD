const { EmbedBuilder } = require("discord.js")

module.exports = {
  name: "halloween",
  description: "🎃 Countdown to Halloween!",
  execute(message) {
    const today = new Date()
    const halloween = new Date(today.getFullYear(), 9, 31)

    if (today > halloween) {
      halloween.setFullYear(halloween.getFullYear() + 1)
    }

    const daysLeft = Math.ceil((halloween - today) / (1000 * 60 * 60 * 24))

    const embed = new EmbedBuilder()
      .setTitle("🎃 Halloween Countdown 👻")
      .setDescription(`🕸️ **${daysLeft} days left until Halloween!**`)
      .setColor("#ff6600")
      .setTimestamp()

    message.reply({ embeds: [embed] })
  },
}

