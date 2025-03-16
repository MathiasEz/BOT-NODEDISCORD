const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const Canvas = require("canvas")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("oscuridad")
    .setDescription(esLang.darknessDescription)
    .addUserOption((option) =>
      option.setName("usuario").setDescription(esLang.darknessUserDescription).setRequired(false),
    ),

  async execute(interaction) {
    try {
      const user = interaction.options.getUser("usuario") || interaction.user

      // Crear canvas y cargar avatar
      const canvas = Canvas.createCanvas(256, 256)
      const ctx = canvas.getContext("2d")

      // Cargar el avatar del usuario
      const avatar = await Canvas.loadImage(user.displayAvatarURL({ extension: "png", size: 256 }))

      // Dibujar el avatar
      ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height)

      // Aplicar efecto de oscuridad
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Crear un embed con la imagen
      const attachment = canvas.toBuffer()

      const embed = new EmbedBuilder()
        .setTitle(esLang.darknessTitle)
        .setDescription(`${esLang.darknessDescriptionText} ${user.username}`)
        .setImage("attachment://darkness.png")
        .setColor("#000000")
        .setFooter({ text: esLang.darknessFooter })

      await interaction.reply({
        content: `${esLang.darknessResponseText} ${user.username} con un toque de oscuridad!`,
        embeds: [embed],
        files: [{ attachment, name: "darkness.png" }],
      })
    } catch (error) {
      console.error("Error en el comando darkness:", error)
      await interaction.reply({ content: esLang.darknessError, ephemeral: true })
    }
  },
}

