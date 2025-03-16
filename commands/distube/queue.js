const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder().setName("queue").setDescription("Muestra la cola de música actual"),

  async execute(interaction, client) {
    const lang = client.lang

    // Verificar si el usuario está en un canal de voz
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: lang.queueNoVoiceChannel,
        ephemeral: true,
      })
    }

    // Obtener la cola
    const queue = client.distube.getQueue(interaction.guildId)

    // Verificar si hay canciones en la cola
    if (!queue || !queue.songs || queue.songs.length === 0) {
      const embed = new EmbedBuilder()
        .setTitle(lang.queueNoSongsTitle)
        .setDescription(lang.queueNoSongsMessage)
        .setColor("Red")

      return interaction.reply({ embeds: [embed], ephemeral: true })
    }

    // Crear el embed con la información de la cola
    const songs = queue.songs
      .map((song, index) => {
        return `${index === 0 ? "🎵 **Actual:**" : `**${index}.**`} ${song.name} - \`${song.formattedDuration}\``
      })
      .slice(0, 10)
      .join("\n")

    const totalDuration = queue.songs.reduce((acc, song) => acc + song.duration, 0)
    const hours = Math.floor(totalDuration / 3600)
    const minutes = Math.floor((totalDuration % 3600) / 60)
    const seconds = totalDuration % 60

    const formattedDuration = `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`

    const embed = new EmbedBuilder()
      .setTitle(lang.queueTitle)
      .setDescription(songs)
      .addFields(
        { name: lang.queueSongs, value: `${queue.songs.length}`, inline: true },
        { name: lang.queueDuration, value: formattedDuration, inline: true },
      )
      .setColor("#3498db")

    await interaction.reply({ embeds: [embed] })
  },
}

