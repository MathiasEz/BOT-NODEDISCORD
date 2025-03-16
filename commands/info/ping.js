const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("¡Ping!"),

  async execute(interaction, client) {
    const lang = client.lang

    // Calcular la latencia del bot
    const sent = await interaction.reply({ content: "¡Pinging...", fetchReply: true })
    const botLatency = sent.createdTimestamp - interaction.createdTimestamp

    // Crear un embed con la información de latencia
    const embed = new EmbedBuilder()
      .setTitle(lang.pingTitle)
      .addFields(
        { name: lang.botLatency, value: `${botLatency}ms`, inline: true },
        { name: lang.apiLatency, value: `${Math.round(client.ws.ping)}ms`, inline: true },
      )
      .setColor("#3498db")

    await interaction.editReply({ content: "", embeds: [embed] })
  },
}

