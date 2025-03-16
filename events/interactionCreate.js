const { InteractionType } = require("discord.js")
const esLang = require("../languages/es")

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    // Manejar comandos de barra
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName)

      if (!command) {
        console.error(`No se encontró el comando ${interaction.commandName}`)
        return interaction.reply({
          content: `¡Ups! No se encontró el comando ${interaction.commandName}.`,
          ephemeral: true,
        })
      }

      try {
        await command.execute(interaction, client)
      } catch (error) {
        console.error(`Error al ejecutar el comando ${interaction.commandName}:`, error)

        // Responder con mensaje de error en español
        const errorMessage = esLang.error || "Ocurrió un error al ejecutar este comando."

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: errorMessage, ephemeral: true })
        } else {
          await interaction.reply({ content: errorMessage, ephemeral: true })
        }
      }
    }

    // Manejar botones
    if (interaction.isButton()) {
      // Código para manejar interacciones de botones
    }

    // Manejar menús de selección
    if (interaction.isSelectMenu()) {
      // Código para manejar interacciones de menús de selección
    }

    // Manejar modales
    if (interaction.type === InteractionType.ModalSubmit) {
      // Código para manejar envíos de modales
    }
  },
}

