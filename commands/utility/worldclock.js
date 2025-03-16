const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder().setName("relojmundial").setDescription(esLang.worldClockDescription),

  async execute(interaction) {
    try {
      // Obtener la hora actual en diferentes zonas horarias
      const now = new Date()

      // Formatear la hora para diferentes zonas horarias
      const formatTimeForTimezone = (timezone) => {
        return new Intl.DateTimeFormat("es-ES", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(now)
      }

      // Crear el embed
      const embed = new EmbedBuilder()
        .setTitle(esLang.worldClockTitle)
        .setColor("#3498db")
        .addFields(
          { name: esLang.istFieldName, value: formatTimeForTimezone("Asia/Kolkata"), inline: false },
          { name: esLang.gmtFieldName, value: formatTimeForTimezone("Europe/London"), inline: false },
          { name: esLang.estFieldName, value: formatTimeForTimezone("America/New_York"), inline: false },
          { name: esLang.pstFieldName, value: formatTimeForTimezone("America/Los_Angeles"), inline: false },
          { name: esLang.cstFieldName, value: formatTimeForTimezone("America/Mexico_City"), inline: false },
          { name: esLang.aestFieldName, value: formatTimeForTimezone("Australia/Sydney"), inline: false },
          { name: esLang.kstFieldName, value: formatTimeForTimezone("Asia/Seoul"), inline: false },
        )
        .setTimestamp()

      await interaction.reply({ embeds: [embed] })
    } catch (error) {
      console.error("Error en el comando worldclock:", error)
      await interaction.reply({ content: esLang.worldClockErrorMessage, ephemeral: true })
    }
  },
}

