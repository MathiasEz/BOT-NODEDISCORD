const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const Canvas = require("canvas")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("amistad")
    .setDescription(esLang.friendshipDescription)
    .addUserOption((option) =>
      option.setName("usuario").setDescription(esLang.friendshipUserDescription).setRequired(true),
    ),

  async execute(interaction) {
    try {
      const user1 = interaction.user
      const user2 = interaction.options.getUser("usuario")

      if (!user2) {
        return interaction.reply({ content: esLang.friendshipMentionError, ephemeral: true })
      }

      // Generar una calificación aleatoria
      const rating = Math.floor(Math.random() * 101)

      // Crear un canvas para la imagen
      const canvas = Canvas.createCanvas(700, 250)
      const ctx = canvas.getContext("2d")

      // Fondo
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Cargar avatares
      const avatar1 = await Canvas.loadImage(user1.displayAvatarURL({ extension: "png", size: 128 }))
      const avatar2 = await Canvas.loadImage(user2.displayAvatarURL({ extension: "png", size: 128 }))

      // Dibujar avatares
      ctx.drawImage(avatar1, 50, 25, 200, 200)
      ctx.drawImage(avatar2, 450, 25, 200, 200)

      // Dibujar corazón en el medio
      ctx.fillStyle = "#FF0000"
      ctx.font = "120px Arial"
      ctx.textAlign = "center"
      ctx.fillText("❤️", canvas.width / 2, 150)

      // Dibujar calificación
      ctx.fillStyle = "#000000"
      ctx.font = "30px Arial"
      ctx.textAlign = "center"
      ctx.fillText(`${rating}%`, canvas.width / 2, 200)

      // Crear un embed con la imagen
      const attachment = canvas.toBuffer()

      const embed = new EmbedBuilder()
        .setTitle(esLang.friendshipTitle)
        .setDescription(
          `La ${esLang.friendshipWith} ${user1.username} ${esLang.friendshipWith} ${user2.username} ${esLang.friendshipRating} **${rating}%**!`,
        )
        .setImage("attachment://friendship.png")
        .setColor("#FF69B4")
        .setFooter({ text: esLang.friendshipFooter })

      await interaction.reply({
        embeds: [embed],
        files: [{ attachment, name: "friendship.png" }],
      })
    } catch (error) {
      console.error("Error en el comando friendship:", error)
      await interaction.reply({ content: esLang.friendshipMentionError, ephemeral: true })
    }
  },
}

