// commands/economy/balance.js

const { SlashCommandBuilder } = require("discord.js")
const { getBalance } = require("../../database/economy")

module.exports = {
  data: new SlashCommandBuilder().setName("balance").setDescription("Check your current balance."),
  async execute(interaction) {
    const userId = interaction.user.id
    const balance = await getBalance(userId)

    await interaction.reply(`Your current balance is: ${balance} coins.`)
  },
}

