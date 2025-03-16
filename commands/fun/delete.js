const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const Canvas = require("canvas")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("eliminar")
    .setDescription(esLang.deleteDescription)
    .addUserOption((option) =>
      option.setName("usuario").setDescription(esLang.deleteUserDescription).setRequired(false),
    ),

  async execute(interaction) {
    try {
      const user = interaction.options.getUser("usuario") || interaction.user

      // Cargar la imagen del template
      const canvas = Canvas.createCanvas(400, 400)
      const ctx = canvas.getContext("2d")
      const background = await Canvas.loadImage("https://i.imgur.com/ooOWjhg.png")
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

      // Cargar el avatar del usuario
      const avatar = await Canvas.loadImage(user.displayAvatarURL({ extension: "png", size: 256 }))

      // Dibujar el avatar en el centro
      ctx.drawImage(avatar, 120, 135, 160, 160)

      // Dibujar el icono de papelera encima
      const trashIcon = await Canvas.loadImage("https://i.imgur.com/OCkj9tL.png")
      ctx.drawImage(trashIcon, 160, 75, 80, 80)

      // Crear un embed con la imagen
      const attachment = canvas.toBuffer()

      const embed = new EmbedBuilder()
        .setTitle(esLang.deleteTitle)
        .setDescription(`¡${user.username} ha sido eliminado!`)
        .setImage("attachment://delete.png")
        .setColor("#FF0000")

      await interaction.reply({
        content: `${esLang.deleteResponseText} ${user.username} después de ser eliminado!`,
        embeds: [embed],
        files: [{ attachment, name: "delete.png" }],
      })
    } catch (error) {
      console.error("Error en el comando delete:", error)
      await interaction.reply({ content: esLang.deleteError, ephemeral: true })
    }
  },
}

