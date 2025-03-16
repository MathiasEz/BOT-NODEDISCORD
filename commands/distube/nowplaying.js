const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Muestra información sobre la canción actual")
    .setNameLocalizations({
      "es-ES": "reproduciendo",
    })
    .setDescriptionLocalizations({
      "es-ES": "Muestra información sobre la canción actual",
    }),
  category: "distube",
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction)
    if (!queue) return interaction.reply({ content: "¡No hay nada reproduciéndose ahora mismo!", ephemeral: true })

    const song = queue.songs[0]
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("🎵 Reproduciendo ahora")
      .setDescription(`[${song.name}](${song.url})`)
      .setThumbnail(song.thumbnail)
      .addFields(
        { name: "Duración", value: `\`${song.formattedDuration}\``, inline: true },
        { name: "Solicitada por", value: `${song.user}`, inline: true },
        { name: "Canal", value: `[${song.uploader.name}](${song.uploader.url})`, inline: true },
      )
      .setFooter({ text: `Vistas: ${song.views} | Likes: ${song.likes}` })
      .setTimestamp()

    await interaction.reply({ embeds: [embed] })
  },
}

