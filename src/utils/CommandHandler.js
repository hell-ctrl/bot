const fs = require("fs");
const path = require("path");
const clc = require("cli-color");

class CommandHandler {
  constructor(options) {
    this.options = options;
    this.commands = new Map();
    this.loadCommands();
  }

  loadCommands() {
    const commandFiles = fs
      .readdirSync(path.join(__dirname, "../commands"))
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      this.commands.set(command.name, command);
    }
  }

  execute(commandName) {
    const command = this.commands.get(commandName);

    if (!command) {
      const { sock, messageFrom, quoted } = this.options;
      
      return sock.sendMessage(messageFrom, { 
        text: "Comando não encontrado!" 
      }, { quoted });
    }

    try {
      return command.run({ ...this.options });
    } catch (error) {
      console.error(`❌ Erro ao executar o comando ${clc.bold(commandName)}:`, error.message);
      console.error("🔍 Local:", error.stack.split("\n")[1].trim());
    }
  }
}

module.exports = CommandHandler;
