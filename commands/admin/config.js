// commands/admin/config.js

const { SlashCommandBuilder } = require("discord.js")
const { setConfig, getConfig } = require("../../helpers/dbHelper")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Configure the bot settings.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("set")
        .setDescription("Set a configuration value.")
        .addStringOption((option) =>
          option.setName("key").setDescription("The configuration key to set.").setRequired(true),
        )
        .addStringOption((option) =>
          option.setName("value").setDescription("The value to set for the key.").setRequired(true),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("get")
        .setDescription("Get a configuration value.")
        .addStringOption((option) =>
          option.setName("key").setDescription("The configuration key to retrieve.").setRequired(true),
        ),
    )
    .addSubcommand((subcommand) => subcommand.setName("list").setDescription("List all configuration values.")),
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand()

    if (subcommand === "set") {
      const key = interaction.options.getString("key")
      const value = interaction.options.getString("value")

      await setConfig(interaction.guildId, key, value)
      await interaction.reply(`Set config key "${key}" to value "${value}".`)
    } else if (subcommand === "get") {
      const key = interaction.options.getString("key")
      const value = await getConfig(interaction.guildId, key)

      if (value) {
        await interaction.reply(`Config key "${key}" has value "${value}".`)
      } else {
        await interaction.reply(`Config key "${key}" not found.`)
      }
    } else if (subcommand === "list") {
      const config = await getConfig(interaction.guildId)

      if (config && typeof config === "object") {
        const configList = Object.entries(config)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n")

        if (configList) {
          await interaction.reply(`Current config:\n${configList}`)
        } else {
          await interaction.reply("No config values set.")
        }
      } else {
        await interaction.reply("No config values set.")
      }
    } else {
      await interaction.reply("Invalid subcommand.")
    }
  },
}

