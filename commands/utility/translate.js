const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const fetch = require("node-fetch")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("traducir")
    .setDescription(esLang.translateDescription)
    .addStringOption((option) => option.setName("texto").setDescription("El texto a traducir").setRequired(true))
    .addStringOption((option) =>
      option
        .setName("idioma")
        .setDescription("El idioma al que traducir")
        .setRequired(true)
        .addChoices(
          { name: "Inglés", value: "en" },
          { name: "Español", value: "es" },
          { name: "Francés", value: "fr" },
          { name: "Alemán", value: "de" },
          { name: "Italiano", value: "it" },
          { name: "Portugués", value: "pt" },
          { name: "Ruso", value: "ru" },
          { name: "Japonés", value: "ja" },
          { name: "Chino", value: "zh" },
          { name: "Árabe", value: "ar" },
        ),
    ),

  async execute(interaction) {
    await interaction.deferReply()

    const text = interaction.options.getString("texto")
    const targetLang = interaction.options.getString("idioma")

    try {
      // Usar la API de traducción (ejemplo con LibreTranslate)
      const response = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        body: JSON.stringify({
          q: text,
          source: "auto",
          target: targetLang,
        }),
        headers: { "Content-Type": "application/json" },
      })

      const data = await response.json()

      if (data.translatedText) {
        const languageNames = {
          en: "Inglés",
          es: "Español",
          fr: "Francés",
          de: "Alemán",
          it: "Italiano",
          pt: "Portugués",
          ru: "Ruso",
          ja: "Japonés",
          zh: "Chino",
          ar: "Árabe",
        }

        const embed = new EmbedBuilder()
          .setTitle("🌐 Traducción")
          .setColor("#3498db")
          .addFields(
            { name: esLang.originalTextLabel, value: text },
            {
              name: esLang.translatedTextLabel.replace("{language}", languageNames[targetLang]),
              value: data.translatedText,
            },
          )
          .setTimestamp()

        await interaction.editReply({ embeds: [embed] })
      } else {
        throw new Error("No se pudo traducir el texto")
      }
    } catch (error) {
      console.error("Error en el comando translate:", error)
      await interaction.editReply({ content: esLang.translationError })
    }
  },
}

