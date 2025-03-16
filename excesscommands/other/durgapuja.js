const { EmbedBuilder } = require("discord.js")
const lang = require("../../events/loadLanguage")

module.exports = {
  name: "durgapuja",
  description: lang.durgaPoojaDescription,
  execute(message) {
    const today = new Date()
    const durgaPoojaStart = new Date(today.getFullYear(), 8, 28) // Sept 28
    const durgaPoojaEnd = new Date(today.getFullYear(), 9, 2) // Oct 2

    // If today is after Oct 2, set the countdown for next year's Durga Puja
    if (today > durgaPoojaEnd) {
      durgaPoojaStart.setFullYear(durgaPoojaStart.getFullYear() + 1)
      durgaPoojaEnd.setFullYear(durgaPoojaEnd.getFullYear() + 1)
    }

    const one_day = 1000 * 60 * 60 * 24
    const daysLeft = Math.ceil((durgaPoojaStart.getTime() - today.getTime()) / one_day)

    let statusMessage
    if (today >= durgaPoojaStart && today <= durgaPoojaEnd) {
      statusMessage = `🎉 **Durga Puja is happening now!** It will end on **October 2, ${durgaPoojaEnd.getFullYear()}**.`
    } else {
      statusMessage = `🛕 **Durga Puja starts in ${daysLeft} days!**\n📅 It begins on **September 28, ${durgaPoojaStart.getFullYear()}** and ends on **October 2, ${durgaPoojaEnd.getFullYear()}**.`
    }

    const embed = new EmbedBuilder()
      .setTitle("🛕 Durga Puja Countdown")
      .setDescription(statusMessage)
      .setColor("#ff4500") // Orange-red color for festive vibes
      .setTimestamp()

    message.reply({ embeds: [embed] })
  },
}

