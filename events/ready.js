const { ActivityType } = require("discord.js")

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`¡Listo! Conectado como ${client.user.tag}`)

    // Establecer estado personalizado en español
    client.user.setPresence({
      activities: [{ name: "¡Comandos en español!", type: ActivityType.Playing }],
      status: "online",
    })

    console.log("Estado actualizado a español")
  },
}

