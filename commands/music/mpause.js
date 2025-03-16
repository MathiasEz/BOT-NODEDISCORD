const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { useMainPlayer } = require("discord-player")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder().setName("mpausar").setDescription(esLang.mpauseDescription),

  async execute(interaction) {
    try {
      // Obtener el reproductor
      const player = useMainPlayer()

      // Obtener la cola
      const queue = player.nodes.get(interaction.guildId)

      // Verificar si hay música reproduciéndose
      if (!queue || !queue.isPlaying()) {
        return interaction.reply({ content: esLang.noMusicPlaying, ephemeral: true })
      }

      // Pausar la canción
      queue.node.pause()

      // Crear el embed
      const embed = new EmbedBuilder()
        .setTitle(esLang.songPausedTitle)
        .setDescription(esLang.songPausedDescription)
        .setColor("#3498db")
        .setFooter({ text: esLang.footerText })

      await interaction.reply({ embeds: [embed] })
    } catch (error) {
      console.error("Error en el comando mpause:", error)
      await interaction.reply({ content: "Ocurrió un error al pausar la canción.", ephemeral: true })
    }
  },
}

