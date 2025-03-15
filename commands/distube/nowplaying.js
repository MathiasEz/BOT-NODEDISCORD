const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Muestra información sobre la canción actual")
    .addStringOption((option) => option.setName("options").setDescription("Opciones adicionales").setRequired(false)),

  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction)

    if (!queue) {
      return interaction.reply({
        content: "⛔ | ¡No hay canciones reproduciéndose actualmente!",
        ephemeral: true,
      })
    }

    const song = queue.songs[0]
    const embed = new EmbedBuilder()
      .setTitle("🎵 Reproduciendo ahora")
      .setDescription(`**${song.name}**`)
      .addFields(
        { name: "Duración", value: `\`${song.formattedDuration}\``, inline: true },
        { name: "Solicitado por", value: `${song.user}`, inline: true },
        { name: "Canal", value: `[${song.uploader.name}](${song.uploader.url})`, inline: true },
      )
      .setThumbnail(song.thumbnail)
      .setColor("#3498db")
      .setFooter({ text: `Volumen: ${queue.volume}% | Filtros: ${queue.filters.names.join(", ") || "Ninguno"}` })

    await interaction.reply({ embeds: [embed] })
  },
}

