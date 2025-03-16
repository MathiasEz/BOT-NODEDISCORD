const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { useMainPlayer } = require("discord-player")
const esLang = require("../../languages/es")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mvolumen")
    .setDescription(esLang.mvolumeDescription)
    .addIntegerOption((option) =>
      option.setName("nivel").setDescription("Nivel de volumen (1-100)").setRequired(false),
    ),

  async execute(interaction) {
    try {
      // Obtener el reproductor y la cola
      const player = useMainPlayer()

      // Verificar si el reproductor está disponible
      if (!player) {
        return interaction.reply({ content: "No se pudo inicializar el reproductor de música.", ephemeral: true })
      }

      const queue = player.nodes.get(interaction.guildId)

      // Verificar si hay música reproduciéndose
      if (!queue || !queue.isPlaying()) {
        return interaction.reply({ content: esLang.noMusicPlayingError, ephemeral: true })
      }

      // Si no se proporciona un nivel, mostrar el volumen actual
      const volumeLevel = interaction.options.getInteger("nivel")

      if (!volumeLevel) {
        const embed = new EmbedBuilder()
          .setTitle(esLang.volumeControlTitle)
          .setDescription(`${esLang.currentVolumeText} **${queue.node.volume}%**`)
          .setColor("#3498db")
          .setFooter({ text: esLang.footerText })

        return interaction.reply({ embeds: [embed] })
      }

      // Verificar si el nivel de volumen es válido
      if (isNaN(volumeLevel) || volumeLevel < 0 || volumeLevel > 100) {
        return interaction.reply({ content: esLang.invalidNumberError, ephemeral: true })
      }

      // Establecer el volumen
      queue.node.setVolume(volumeLevel)

      // Crear el embed
      const embed = new EmbedBuilder()
        .setTitle(esLang.volumeControlTitle)
        .setDescription(`${esLang.volumeSetText} **${volumeLevel}%**`)
        .setColor("#3498db")
        .setFooter({ text: esLang.footerText })

      await interaction.reply({ embeds: [embed] })
    } catch (error) {
      console.error("Error en el comando mvolume:", error)
      await interaction.reply({ content: "Ocurrió un error al ajustar el volumen.", ephemeral: true })
    }
  },
}

