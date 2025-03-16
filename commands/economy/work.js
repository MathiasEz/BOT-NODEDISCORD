const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { Users } = require("../../dbObjects")
const { CurrencyShop } = require("../../dbObjects")
const { Op } = require("sequelize")

module.exports = {
  data: new SlashCommandBuilder().setName("work").setDescription("Work to earn some money!"),
  async execute(interaction) {
    const user = await Users.findOne({ where: { user_id: interaction.user.id } })

    if (!user) {
      return interaction.reply("You need to create an account first! Use /start")
    }

    const balance = user.balance

    const responses = [
      "You worked as a programmer and earned",
      "You worked as a designer and earned",
      "You worked as a writer and earned",
      "You worked as a streamer and earned",
      "You worked as a youtuber and earned",
      "You worked as a teacher and earned",
      "You worked as a doctor and earned",
      "You worked as a lawyer and earned",
      "You worked as a chef and earned",
      "You worked as a gamer and earned",
      "You worked as a singer and earned",
      "You worked as a dancer and earned",
      "You worked as a pilot and earned",
      "You worked as a police officer and earned",
      "You worked as a firefighter and earned",
      "You worked as a soldier and earned",
      "You worked as a spy and earned",
      "You worked as a detective and earned",
      "You worked as a farmer and earned",
      "You worked as a miner and earned",
      "You worked as a lumberjack and earned",
      "You worked as a fisherman and earned",
      "You worked as a hunter and earned",
      "You worked as a blacksmith and earned",
      "You worked as a carpenter and earned",
      "You worked as a tailor and earned",
      "You worked as a barber and earned",
      "You worked as a waiter and earned",
      "You worked as a bartender and earned",
      "You worked as a cashier and earned",
      "You worked as a janitor and earned",
      "You worked as a security guard and earned",
      "You worked as a construction worker and earned",
      "You worked as a mechanic and earned",
      "You worked as an electrician and earned",
      "You worked as a plumber and earned",
      "You worked as a painter and earned",
      "You worked as a gardener and earned",
      "You worked as a driver and earned",
      "You worked as a delivery person and earned",
      "You worked as a cleaner and earned",
      "You worked as a cook and earned",
      "You worked as a baker and earned",
      "You worked as a butcher and earned",
      "You worked as a brewer and earned",
      "You worked as a winemaker and earned",
      "You worked as a distiller and earned",
      "You worked as a smoker and earned",
      "You worked as a roaster and earned",
      "You worked as a grinder and earned",
      "You worked as a packer and earned",
      "You worked as a shipper and earned",
      "You worked as a receiver and earned",
      "You worked as a stocker and earned",
      "You worked as a seller and earned",
      "You worked as a buyer and earned",
      "You worked as a manager and earned",
      "You worked as an executive and earned",
      "You worked as a consultant and earned",
      "You worked as an advisor and earned",
      "You worked as a trainer and earned",
      "You worked as a coach and earned",
      "You worked as a mentor and earned",
      "You worked as a leader and earned",
      "You worked as a follower and earned",
      "You worked as a friend and earned",
      "You worked as a lover and earned",
      "You worked as a family member and earned",
      "You worked as a stranger and earned",
      "You worked as a nobody and earned",
      "You worked as a somebody and earned",
      "You worked as an everybody and earned",
      "You worked as a celebrity and earned",
      "You worked as a politician and earned",
      "You worked as a president and earned",
      "You worked as a king and earned",
      "You worked as a queen and earned",
      "You worked as a god and earned",
      "You worked as a devil and earned",
      "You worked as an angel and earned",
      "You worked as a demon and earned",
      "You worked as a ghost and earned",
      "You worked as a zombie and earned",
      "You worked as a vampire and earned",
      "You worked as a werewolf and earned",
      "You worked as a witch and earned",
      "You worked as a wizard and earned",
      "You worked as a fairy and earned",
      "You worked as a dragon and earned",
      "You worked as a unicorn and earned",
      "You worked as a phoenix and earned",
      "You worked as a griffin and earned",
      "You worked as a sphinx and earned",
      "You worked as a centaur and earned",
      "You worked as a minotaur and earned",
      "You worked as a cyclops and earned",
      "You worked as a titan and earned",
      "You worked as an ogre and earned",
      "You worked as a goblin and earned",
      "You worked as a gnome and earned",
      "You worked as a troll and earned",
      "You worked as an elf and earned",
      "You worked as a dwarf and earned",
      "You worked as a hobbit and earned",
      "You worked as a human and earned",
      "You worked as an alien and earned",
      "You worked as a robot and earned",
      "You worked as a cyborg and earned",
      "You worked as an AI and earned",
      "You worked as a program and earned",
      "You worked as a file and earned",
      "You worked as a folder and earned",
      "You worked as a computer and earned",
      "You worked as a server and earned",
      "You worked as a network and earned",
      "You worked as an internet and earned",
      "You worked as a website and earned",
      "You worked as a database and earned",
      "You worked as a code and earned",
      "You worked as a bug and earned",
      "You worked as a feature and earned",
      "You worked as a project and earned",
      "You worked as a company and earned",
      "You worked as an organization and earned",
      "You worked as a community and earned",
      "You worked as a world and earned",
      "You worked as a universe and earned",
      "You worked as a multiverse and earned",
      "You worked as an omniverse and earned",
      "You worked as a reality and earned",
      "You worked as a dream and earned",
      "You worked as a nightmare and earned",
      "You worked as a fantasy and earned",
      "You worked as a fiction and earned",
      "You worked as a story and earned",
      "You worked as a legend and earned",
      "You worked as a myth and earned",
      "You worked as a religion and earned",
      "You worked as a philosophy and earned",
      "You worked as a science and earned",
      "You worked as an art and earned",
      "You worked as a music and earned",
      "You worked as a dance and earned",
      "You worked as a theater and earned",
      "You worked as a film and earned",
      "You worked as a game and earned",
      "You worked as a sport and earned",
      "You worked as a hobby and earned",
      "You worked as a passion and earned",
      "You worked as a life and earned",
      "You worked as a death and earned",
      "You worked as a beginning and earned",
      "You worked as an end and earned",
      "You worked as a past and earned",
      "You worked as a present and earned",
      "You worked as a future and earned",
      "You worked as a time and earned",
      "You worked as a space and earned",
      "You worked as a matter and earned",
      "You worked as an energy and earned",
      "You worked as an information and earned",
      "You worked as a knowledge and earned",
      "You worked as a wisdom and earned",
      "You worked as a truth and earned",
      "You worked as a lie and earned",
      "You worked as a good and earned",
      "You worked as an evil and earned",
      "You worked as a light and earned",
      "You worked as a darkness and earned",
      "You worked as a fire and earned",
      "You worked as a water and earned",
      "You worked as an earth and earned",
      "You worked as an air and earned",
      "You worked as a heart and earned",
      "You worked as a soul and earned",
      "You worked as a mind and earned",
      "You worked as a body and earned",
      "You worked as a spirit and earned",
      "You worked as a god and earned",
      "You worked as a devil and earned",
      "You worked as an angel and earned",
      "You worked as a demon and earned",
      "You worked as a ghost and earned",
      "You worked as a zombie and earned",
      "You worked as a vampire and earned",
      "You worked as a werewolf and earned",
      "You worked as a witch and earned",
      "You worked as a wizard and earned",
      "You worked as a fairy and earned",
      "You worked as a dragon and earned",
      "You worked as a unicorn and earned",
      "You worked as a phoenix and earned",
      "You worked as a griffin and earned",
      "You worked as a sphinx and earned",
      "You worked as a centaur and earned",
      "You worked as a minotaur and earned",
      "You worked as a cyclops and earned",
      "You worked as a titan and earned",
      "You worked as an ogre and earned",
      "You worked as a goblin and earned",
      "You worked as a gnome and earned",
      "You worked as a troll and earned",
      "You worked as an elf and earned",
      "You worked as a dwarf and earned",
      "You worked as a hobbit and earned",
      "You worked as a human and earned",
      "You worked as an alien and earned",
      "You worked as a robot and earned",
      "You worked as a cyborg and earned",
      "You worked as an AI and earned",
      "You worked as a program and earned",
      "You worked as a file and earned",
      "You worked as a folder and earned",
      "You worked as a computer and earned",
      "You worked as a server and earned",
      "You worked as a network and earned",
      "You worked as an internet and earned",
      "You worked as a website and earned",
      "You worked as a database and earned",
      "You worked as a code and earned",
      "You worked as a bug and earned",
      "You worked as a feature and earned",
      "You worked as a project and earned",
      "You worked as a company and earned",
      "You worked as an organization and earned",
      "You worked as a community and earned",
      "You worked as a world and earned",
      "You worked as a universe and earned",
      "You worked as a multiverse and earned",
      "You worked as an omniverse and earned",
      "You worked as a reality and earned",
      "You worked as a dream and earned",
      "You worked as a nightmare and earned",
      "You worked as a fantasy and earned",
      "You worked as a fiction and earned",
      "You worked as a story and earned",
      "You worked as a legend and earned",
      "You worked as a myth and earned",
      "You worked as a religion and earned",
      "You worked as a philosophy and earned",
      "You worked as a science and earned",
      "You worked as an art and earned",
      "You worked as a music and earned",
      "You worked as a dance and earned",
      "You worked as a theater and earned",
      "You worked as a film and earned",
      "You worked as a game and earned",
      "You worked as a sport and earned",
      "You worked as a hobby and earned",
      "You worked as a passion and earned",
      "You worked as a life and earned",
      "You worked as a death and earned",
      "You worked as a beginning and earned",
      "You worked as an end and earned",
      "You worked as a past and earned",
      "You worked as a present and earned",
      "You worked as a future and earned",
      "You worked as a time and earned",
      "You worked as a space and earned",
      "You worked as a matter and earned",
      "You worked as an energy and earned",
      "You worked as an information and earned",
      "You worked as a knowledge and earned",
      "You worked as a wisdom and earned",
      "You worked as a truth and earned",
      "You worked as a lie and earned",
      "You worked as a good and earned",
      "You worked as an evil and earned",
      "You worked as a light and earned",
      "You worked as a darkness and earned",
      "You worked as a fire and earned",
      "You worked as a water and earned",
      "You worked as an earth and earned",
      "You worked as an air and earned",
      "You worked as a heart and earned",
      "You worked as a soul and earned",
      "You worked as a mind and earned",
      "You worked as a body and earned",
      "You worked as a spirit and earned",
      "You worked as a god and earned",
      "You worked as a devil and earned",
      "You worked as an angel and earned",
      "You worked as a demon and earned",
      "You worked as a ghost and earned",
      "You worked as a zombie and earned",
      "You worked as a vampire and earned",
      "You worked as a werewolf and earned",
      "You worked as a witch and earned",
      "You worked as a wizard and earned",
      "You worked as a fairy and earned",
      "You worked as a dragon and earned",
      "You worked as a unicorn and earned",
      "You worked as a phoenix and earned",
      "You worked as a griffin and earned",
      "You worked as a sphinx and earned",
      "You worked as a centaur and earned",
      "You worked as a minotaur and earned",
      "You worked as a cyclops and earned",
      "You worked as a titan and earned",
      "You worked as an ogre and earned",
      "You worked as a goblin and earned",
      "You worked as a gnome and earned",
      "You worked as a troll and earned",
      "You worked as an elf and earned",
      "You worked as a dwarf and earned",
      "You worked as a hobbit and earned",
      "You worked as a human and earned",
      "You worked as an alien and earned",
      "You worked as a robot and earned",
      "You worked as a cyborg and earned",
      "You worked as an AI and earned",
      "You worked as a program and earned",
      "You worked as a file and earned",
      "You worked as a folder and earned",
      "You worked as a computer and earned",
      "You worked as a server and earned",
      "You worked as a network and earned",
      "You worked as an internet and earned",
      "You worked as a website and earned",
      "You worked as a database and earned",
      "You worked as a code and earned",
      "You worked as a bug and earned",
      "You worked as a feature and earned",
      "You worked as a project and earned",
      "You worked as a company and earned",
      "You worked as an organization and earned",
      "You worked as a community and earned",
      "You worked as a world and earned",
      "You worked as a universe and earned",
      "You worked as a multiverse and earned",
      "You worked as an omniverse and earned",
      "You worked as a reality and earned",
      "You worked as a dream and earned",
      "You worked as a nightmare and earned",
      "You worked as a fantasy and earned",
      "You worked as a fiction and earned",
      "You worked as a story and earned",
      "You worked as a legend and earned",
      "You worked as a myth and earned",
      "You worked as a religion and earned",
      "You worked as a philosophy and earned",
      "You worked as a science and earned",
      "You worked as an art and earned",
      "You worked as a music and earned",
      "You worked as a dance and earned",
      "You worked as a theater and earned",
      "You worked as a film and earned",
      "You worked as a game and earned",
      "You worked as a sport and earned",
      "You worked as a hobby and earned",
      "You worked as a passion and earned",
      "You worked as a life and earned",
      "You worked as a death and earned",
      "You worked as a beginning and earned",
      "You worked as an end and earned",
      "You worked as a past and earned",
      "You worked as a present and earned",
      "You worked as a future and earned",
      "You worked as a time and earned",
      "You worked as a space and earned",
      "You worked as a matter and earned",
      "You worked as an energy and earned",
      "You worked as an information and earned",
      "You worked as a knowledge and earned",
      "You worked as a wisdom and earned",
      "You worked as a truth and earned",
      "You worked as a lie and earned",
      "You worked as a good and earned",
      "You worked as an evil and earned",
      "You worked as a light and earned",
      "You worked as a darkness and earned",
      "You worked as a fire and earned",
      "You worked as a water and earned",
      "You worked as an earth and earned",
      "You worked as an air and earned",
      "You worked as a heart and earned",
      "You worked as a soul and earned",
      "You worked as a mind and earned",
      "You worked as a body and earned",
      "You worked as a spirit and earned",
      "You worked as a god and earned",
      "You worked as a devil and earned",
      "You worked as an angel and earned",
      "You worked as a demon and earned",
      "You worked as a ghost and earned",
      "You worked as a zombie and earned",
      "You worked as a vampire and earned",
      "You worked as a werewolf and earned",
      "You worked as a witch and earned",
      "You worked as a wizard and earned",
      "You worked as a fairy and earned",
      "You worked as a dragon and earned",
      "You worked as a unicorn and earned",
      "You worked as a phoenix and earned",
      "You worked as a griffin and earned",
      "You worked as a sphinx and earned",
      "You worked as a centaur and earned",
      "You worked as a minotaur and earned",
      "You worked as a cyclops and earned",
      "You worked as a titan and earned",
      "You worked as an ogre and earned",
      "You worked as a goblin and earned",
      "You worked as a gnome and earned",
      "You worked as a troll and earned",
      "You worked as an elf and earned",
      "You worked as a dwarf and earned",
      "You worked as a hobbit and earned",
      "You worked as a human and earned",
      "You worked as an alien and earned",
      "You worked as a robot and earned",
      "You worked as a cyborg and earned",
      "You worked as an AI and earned",
      "You worked as a program and earned",
      "You worked as a file and earned",
      "You worked as a folder and earned",
      "You worked as a computer and earned",
      "You worked as a server and earned",
      "You worked as a network and earned",
      "You worked as an internet and earned",
      "You worked as a website and earned",
      "You worked as a database and earned",
      "You worked as a code and earned",
      "You worked as a bug and earned",
      "You worked as a feature and earned",
      "You worked as a project and earned",
      "You worked as a company and earned",
      "You worked as an organization and earned",
      "You worked as a community and earned",
      "You worked as a world and earned",
      "You worked as a universe and earned",
      "You worked as a multiverse and earned",
      "You worked as an omniverse and earned",
      "You worked as a reality and earned",
      "You worked as a dream and earned",
      "You worked as a nightmare and earned",
      "You worked as a fantasy and earned",
      "You worked as a fiction and earned",
      "You worked as a story and earned",
      "You worked as a legend and earned",
      "You worked as a myth and earned",
      "You worked as a religion and earned",
      "You worked as a philosophy and earned",
      "You worked as a science and earned",
      "You worked as an art and earned",
      "You worked as a music and earned",
      "You worked as a dance and earned",
      "You worked as a theater and earned",
      "You worked as a film and earned",
      "You worked as a game and earned",
      "You worked as a sport and earned",
      "You worked as a hobby and earned",
      "You worked as a passion and earned",
      "You worked as a life and earned",
      "You worked as a death and earned",
      "You worked as a beginning and earned",
      "You worked as an end and earned",
      "You worked as a past and earned",
      "You worked as a present and earned",
      "You worked as a future and earned",
      "You worked as a time and earned",
      "You worked as a space and earned",
      "You worked as a matter and earned",
      "You worked as an energy and earned",
      "You worked as an information and earned",
      "You worked as a knowledge and earned",
      "You worked as a wisdom and earned",
      "You worked as a truth and earned",
      "You worked as a lie and earned",
      "You worked as a good and earned",
      "You worked as an evil and earned",
      "You worked as a light and earned",
      "You worked as a darkness and earned",
      "You worked as a fire and earned",
      "You worked as a water and earned",
      "You worked as an earth and earned",
      "You worked as an air and earned",
      "You worked as a heart and earned",
      "You worked as a soul and earned",
      "You worked as a mind and earned",
      "You worked as a body and earned",
      "You worked as a spirit and earned",
      "You worked as a god and earned",
      "You worked as a devil and earned",
      "You worked as an angel and earned",
      "You worked as a demon and earned",
      "You worked as a ghost and earned",
      "You worked as a zombie and earned",
      "You worked as a vampire and earned",
      "You worked as a werewolf and earned",
      "You worked as a witch and earned",
      "You worked as a wizard and earned",
      "You worked as a fairy and earned",
      "You worked as a dragon and earned",
      "You worked as a unicorn and earned",
      "You worked as a phoenix and earned",
      "You worked as a griffin and earned",
      "You worked as a sphinx and earned",
      "You worked as a centaur and earned",
      "You worked as a minotaur and earned",
      "You worked as a cyclops and earned",
      "You worked as a titan and earned",
      "You worked as an ogre and earned",
      "You worked as a goblin and earned",
      "You worked as a gnome and earned",
      "You worked as a troll and earned",
      "You worked as an elf and earned",
      "You worked as a dwarf and earned",
      "You worked as a hobbit and earned",
      "You worked as a human and earned",
      "You worked as an alien and earned",
      "You worked as a robot and earned",
      "You worked as a cyborg and earned",
      "You worked as an AI and earned",
      "You worked as a program and earned",
      "You worked as a file and earned",
      "You worked as a folder and earned",
      "You worked as a computer and earned",
      "You worked as a server and earned",
      "You worked as a network and earned",
      "You worked as an internet and earned",
      "You worked as a website and earned",
      "You worked as a database and earned",
      "You worked as a code and earned",
      "You worked as a bug and earned",
      "You worked as a feature and earned",
      "You worked as a project and earned",
      "You worked as a company and earned",
      "You worked as an organization and earned",
      "You worked as a community and earned",
      "You worked as a world and earned",
      "You worked as a universe and earned",
      "You worked as a multiverse and earned",
      "You worked as an omniverse and earned",
      "You worked as a reality and earned",
      "You worked as a dream and earned",
      "You worked as a nightmare and earned",
      "You worked as a fantasy and earned",
      "You worked as a fiction and earned",
      "You worked as a story and earned",
      "You worked as a legend and earned",
      "You worked as a myth and earned",
      "You worked as a religion and earned",
      "You worked as a philosophy and earned",
      "You worked as a science and earned",
      "You worked as an art and earned",
      "You worked as a music and earned",
      "You worked as a dance and earned",
      "You worked as a theater and earned",
      "You worked as a film and earned",
      "You worked as a game and earned",
      "You worked as a sport and earned",
      "You worked as a hobby and earned",
      "You worked as a passion and earned",
      "You worked as a life and earned",
      "You worked as a death and earned",
      "You worked as a beginning and earned",
      "You worked as an end and earned",
      "You worked as a past and earned",
      "You worked as a present and earned",
      "You worked as a future and earned",
      "You worked as a time and earned",
      "You worked as a space and earned",
      "You worked as a matter and earned",
      "You worked as an energy and earned",
      "You worked as an information and earned",
      "You worked as a knowledge and earned",
      "You worked as a wisdom and earned",
      "You worked as a truth and earned",
      "You worked as a lie and earned",
      "You worked as a good and earned",
      "You worked as an evil and earned",
      "You worked as a light and earned",
      "You worked as a darkness and earned",
      "You worked as a fire and earned",
      "You worked as a water and earned",
      "You worked as an earth and earned",
      "You worked as an air and earned",
      "You worked as a heart and earned",
      "You worked as a soul and earned",
      "You worked as a mind and earned",
      "You worked as a body and earned",
      "You worked as a spirit and earned",
      "You worked as a god and earned",
      "You worked as a devil and earned",
      "You worked as an angel and earned",
      "You worked as a demon and earned",
      "You worked as a ghost and earned",
      "You worked as a zombie and earned",
      "You worked as a vampire and earned",
      "You worked as a werewolf and earned",
      "You worked as a witch and earned",
      "You worked as a wizard and earned",
      "You worked as a fairy and earned",
      "You worked as a dragon and earned",
      "You worked as a unicorn and earned",
      "You worked as a phoenix and earned",
      "You worked as a griffin and earned",
      "You worked as a sphinx and earned",
      "You worked as a centaur and earned",
      "You worked as a minotaur and earned",
      "You worked as a cyclops and earned",
      "You worked as a titan and earned",
      "You worked as an ogre and earned",
      "You worked as a goblin and earned",
      "You worked as a gnome and earned",
      "You worked as a troll and earned",
      "You worked as an elf and earned",
      "You worked as a dwarf and earned",
      "You worked as a hobbit and earned",
      "You worked as a human and earned",
      "You worked as an alien and earned",
      "You worked as a robot and earned",
      "You worked as a cyborg and earned",
      "You worked as an AI and earned",
      "You worked as a program and earned",
      "You worked as a file and earned",
      "You worked as a folder and earned",
      "You worked as a computer and earned",
      "You worked as a server and earned",
      "You worked as a network and earned",
      "You worked as an internet and earned",
      "You worked as a website and earned",
      "You worked as a database and earned",
      "You worked as a code and earned",
      "You worked as a bug and earned",
      "You worked as a feature and earned",
      "You worked as a project and earned",
      "You worked as a company and earned",
      "You worked as an organization and earned",
      "You worked as a community and earned",
      "You worked as a world and earned",
      "You worked as a universe and earned",
      "You worked as a multiverse and earned",
      "You worked as an omniverse and earned",
      "You worked as a reality and earned",
      "You worked as a dream and earned",
      "You worked as a nightmare and earned",
      "You worked as a fantasy and earned",
      "You worked as a fiction and earned",
      "You worked as a story and earned",
      "You worked as a legend and earned",
      "You worked as a myth and earned",
      "You worked as a religion and earned",
      "You worked as a philosophy and earned",
      "You worked as a science and earned",
      "You worked as an art and earned",
      "You worked as a music and earned",
      "You worked as a dance and earned",
      "You worked as a theater and earned",
      "You worked as a film and earned",
      "You worked as a game and earned",
      "You worked as a sport and earned",
      "You worked as a hobby and earned",
      "You worked as a passion and earned",
      "You worked as a life and earned",
      "You worked as a death and earned",
      "You worked as a beginning and earned",
      "You worked as an end and earned",
      "You worked as a past and earned",
      "You worked as a present and earned",
      "You worked as a future and earned",
      "You worked as a time and earned",
      "You worked as a space and earned",
      "You worked as a matter and earned",
      "You worked as an energy and earned",
      "You worked as an information and earned",
      "You worked as a knowledge and earned",
      "You worked as a wisdom and earned",
      "You worked as a truth and earned",
      "You worked as a lie and earned",
      "You worked as a good and earned",
      "You worked as an evil and earned",
      "You worked as a light and earned",
      "You worked as a darkness and earned",
      "You worked as a fire and earned",
      "You worked as a water and earned",
      "You worked as an earth and earned",
      "You worked as an air and earned",
      "You worked as a heart and earned",
      "You worked as a soul and earned",
      "You worked as a mind and earned",
      "You worked as a body and earned",
      "You worked as a spirit and earned",
      "You worked as a god and earned",
      "You worked as a devil and earned",
      "You worked as an angel and earned",
      "You worked as a demon and earned",
      "You worked as a ghost and earned",
      "You worked as a zombie and earned",
      "You worked as a vampire and earned",
      "You worked as a werewolf and earned",
      "You worked as a witch and earned",
      "You worked as a wizard and earned",
      "You worked as a fairy and earned",
      "You worked as a dragon and earned",
      "You worked as a unicorn and earned",
      "You worked as a phoenix and earned",
      "You worked as a griffin and earned",
      "You worked as a sphinx and earned",
      "You worked as a centaur and earned",
      "You worked as a minotaur and earned",
      "You worked as a cyclops and earned",
      "You worked as a titan and earned",
      "You worked as an ogre and earned",
      "You worked as a goblin and earned",
      "You worked as a gnome and earned",
      "You worked as a troll and earned",
      "You worked as an elf and earned",
      "You worked as a dwarf and earned",
      "You worked as a hobbit and earned",
      "You worked as a human and earned",
      "You worked as an alien and earned",
      "You worked as a robot and earned",
      "You worked as a cyborg and earned",
      "You worked as an AI and earned",
      "You worked as a program and earned",
      "You worked as a file and earned",
      "You worked as a folder and earned",
      "You worked as a computer and earned",
      "You worked as a server and earned",
      "You worked as a network and earned",
      "You worked as an internet and earned",
      "You worked as a website and earned",
      "You worked as a database and earned",
      "You worked as a code and earned",
      "You worked as a bug and earned",
      "You worked as a feature and earned",
      "You worked as a project and earned",
      "You worked as a company and earned",
      "You worked as an organization and earned",
      "You worked as a community and earned",
      "You worked as a world and earned",
      "You worked as a universe and earned",
      "You worked as a multiverse and earned",
      "You worked as an omniverse and earned",
      "You worked as a reality and earned",
      "You worked as a dream and earned",
      "You worked as a nightmare and earned",
      "You worked as a fantasy and earned",
      "You worked as a fiction and earned",
      "You worked as a story and earned",
      "You worked as a legend and earned",
      "You worked as a myth and earned",
      "You worked as a religion and earned",
      "You worked as a philosophy and earned",
      "You worked as a science and earned",
      "You worked as an art and earned",
      "You worked as a music and earned",
      "You worked as a dance and earned",
      "You worked as a theater and earned",
      "You worked as a film and earned",
      "You worked as a game and earned",
      "You worked as a sport and earned",
      "You worked as a hobby and earned",
      "You worked as a passion and earned",
      "You worked as a life and earned",
      "You worked as a death and earned",
      "You worked as a beginning and earned",
      "You worked as an end and earned",
      "You worked as a past and earned",
      "You worked as a present and earned",
      "You worked as a future and earned",
      "You worked as a time and earned",
      "You worked as a space and earned",
      "You worked as a matter and earned",
      "You worked as an energy and earned",
      "You worked as an information and earned",
      "You worked as a knowledge and earned",
      "You worked as a wisdom and earned",
      "You worked as a truth and earned",
      "You worked as a lie and earned",
      "You worked as a good and earned",
      "You worked as an evil and earned",
      "You worked as a light and earned",
      "You worked as a darkness and earned",
      "You worked as a fire and earned",
      "You worked as a water and earned",
      "You worked as an earth and earned",
      "You worked as an air and earned",
      "You worked as a heart and earned",
      "You worked as a soul and earned",
      "You worked as a mind and earned",
      "You worked as a body and earned",
      "You worked as a spirit and earned",
    ]

    const amount = Math.floor(Math.random() * 100) + 1
    user.balance += amount
    await user.save()

    const brevity = responses[Math.floor(Math.random() * responses.length)]
    const it = amount === 1 ? "coin" : "coins"
    const is = amount === 1 ? "is" : "are"
    const correct = amount === 1 ? "this" : "these"
    const and = amount === 1 ? "this" : "these"

    const embed = new EmbedBuilder()
      .setColor("#00FF00")
      .setTitle("Work")
      .setDescription(`${brevity} ${amount} ${it}! Your new balance is ${user.balance} coins.`)

    await interaction.reply({ embeds: [embed] })
  },
}

