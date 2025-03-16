const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder().setName("invite").setDescription("Obtén un enlace para invitar al bot a tu servidor"),

  async execute(interaction, client) {
    const lang = client.lang

    // Crear el enlace de invitación
    const inviteURL = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`

    // Crear un embed con el enlace de invitación
    const embed = new EmbedBuilder()
      .setTitle(lang.inviteTitle)
      .setDescription(lang.inviteDescription.replace("{inviteURL}", inviteURL))
      .setColor("#3498db")
      .setImage(lang.inviteImageURL)

    // Crear un botón para el enlace de invitación
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setLabel("Invitar").setURL(inviteURL).setStyle(ButtonStyle.Link),
    )

    await interaction.reply({ embeds: [embed], components: [row] })
  },
}

