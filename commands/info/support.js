const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder().setName("support").setDescription("Servidor de soporte de este Bot"),

  async execute(interaction, client) {
    const lang = client.lang

    // Crear un embed con la información de soporte
    const embed = new EmbedBuilder()
      .setTitle(lang.supportTitle)
      .setDescription(lang.supportDescriptionTitle)
      .setColor("#3498db")
      .setThumbnail(lang.supportIconURL)
      .setImage(lang.supportImageURL)
      .addFields(
        { name: `${lang.followUsOn}:`, value: "\u200B", inline: false },
        { name: lang.discord, value: `[${lang.discord}](${lang.supportServerLink})`, inline: true },
        { name: lang.github, value: `[${lang.github}](${lang.githubLink})`, inline: true },
        { name: lang.replit, value: `[${lang.replit}](${lang.replitLink})`, inline: true },
        { name: lang.youtube, value: `[${lang.youtube}](${lang.youtubeLink})`, inline: true },
      )

    // Crear botones para los enlaces
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel(lang.discord)
        .setURL(lang.supportServerLink)
        .setStyle(ButtonStyle.Link)
        .setEmoji("🔗"),
      new ButtonBuilder().setLabel(lang.github).setURL(lang.githubLink).setStyle(ButtonStyle.Link).setEmoji("🔗"),
      new ButtonBuilder().setLabel(lang.replit).setURL(lang.replitLink).setStyle(ButtonStyle.Link).setEmoji("🔗"),
      new ButtonBuilder().setLabel(lang.youtube).setURL(lang.youtubeLink).setStyle(ButtonStyle.Link).setEmoji("🔗"),
    )

    await interaction.reply({ embeds: [embed], components: [row] })
  },
}

