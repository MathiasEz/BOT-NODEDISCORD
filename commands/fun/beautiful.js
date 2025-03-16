const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const Canvas = require("canvas")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beautiful")
    .setDescription(esLang.beautifulDescription)
    .addUserOption((option) =>
      option.setName("usuario").setDescription(esLang.beautifulUserDescription).setRequired(false),
    ),

  async execute(interaction) {
    try {
      const user = interaction.options.getUser("usuario") || interaction.user

      // Cargar la imagen del template
      const canvas = Canvas.createCanvas(500, 781)
      const ctx = canvas.getContext("2d")
      const background = await Canvas.loadImage("https://i.imgur.com/ooOWjhg.png")
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

      // Cargar el avatar del usuario
      const avatar = await Canvas.loadImage(user.displayAvatarURL({ extension: "png", size: 256 }))

      // Dibujar el avatar en ambos marcos
      ctx.drawImage(avatar, 180, 90, 150, 150)
      ctx.drawImage(avatar, 180, 440, 150, 150)

      // Crear un embed con la imagen
      const attachment = canvas.toBuffer()

      const embed = new EmbedBuilder()
        .setTitle(esLang.beautifulTitle)
        .setDescription(esLang.beautifulDescriptionText.replace("{user}", user.username))
        .setImage("attachment://beautiful.png")
        .setColor("#FFD700")
        .setFooter({ text: esLang.beautifulFooter })

      await interaction.reply({
        content: esLang.beautifulReplyText.replace("{user}", user.username),
        embeds: [embed],
        files: [{ attachment, name: "beautiful.png" }],
      })
    } catch (error) {
      console.error("Error en el comando beautiful:", error)
      await interaction.reply({ content: esLang.beautifulError, ephemeral: true })
    }
  },
}

