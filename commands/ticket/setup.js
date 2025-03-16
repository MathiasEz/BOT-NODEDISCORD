// commands/ticket/setup.js

const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const ticketSchema = require("../../Schemas.js/ticketSchema")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket-setup")
    .setDescription("Setup your ticketing system!")
    .addChannelOption((option) =>
      option.setName("channel").setDescription("The channel where tickets will be created.").setRequired(true),
    )
    .addChannelOption((option) =>
      option.setName("category").setDescription("The category where tickets will be created.").setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Set the description for the ticket creation message.")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option.setName("button").setDescription("Set the text for the ticket creation button.").setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const { channel, guild, options } = interaction

    const ticketChannel = options.getChannel("channel")
    const ticketCategory = options.getChannel("category")
    const ticketDescription = options.getString("description")
    const ticketButton = options.getString("button")

    if (!ticketChannel || ticketChannel.type !== 0) {
      return interaction.reply({ content: "Please provide a valid text channel!", ephemeral: true })
    }

    if (!ticketCategory || ticketCategory.type !== 4) {
      return interaction.reply({ content: "Please provide a valid category!", ephemeral: true })
    }

    try {
      const data = await ticketSchema.findOne({ GuildID: guild.id })

      if (data) {
        await ticketSchema.findOneAndUpdate(
          { GuildID: guild.id },
          {
            Channel: ticketChannel.id,
            Category: ticketCategory.id,
            Description: ticketDescription,
            Button: ticketButton,
          },
        )
      } else {
        await ticketSchema.create({
          GuildID: guild.id,
          Channel: ticketChannel.id,
          Category: ticketCategory.id,
          Description: ticketDescription,
          Button: ticketButton,
        })
      }

      const button = new ButtonBuilder()
        .setCustomId("createTicket")
        .setLabel(ticketButton)
        .setStyle(ButtonStyle.Primary)

      const row = new ActionRowBuilder().addComponents(button)

      await ticketChannel.send({
        content: ticketDescription,
        components: [row],
      })

      interaction.reply({ content: "Your ticket system has been setup!", ephemeral: true })
    } catch (err) {
      console.log(err)
      return interaction.reply({ content: "An error occurred while setting up the ticket system!", ephemeral: true })
    }
  },
}

