import { Client, MessageEmbed, Message } from "discord.js";
import config from "../config.json";

const TOKEN = process.env.TOKEN;

function shuffle<T>(array: T[]) {
  var currentIndex = array.length, randomIndex: number;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function onMessage(msg: Message) {
  if (msg.content === `${config.prefix}sfb`) {
    const response = new MessageEmbed()
    response.setTitle("Tirage de ta partie :")
    response.setDescription(`${msg.author} sera le ${Math.random() < 0.5 ? "premier" : "second" } joueur.`)
    response.addField("Champions disponibles :", shuffle(config.champions).slice(0, 7).join("\n"))

    msg.channel.send(response)
  }
}

const BOT = new Client();

BOT.on('ready', () => {
  console.info(`Logged in!`);
});
BOT.on('message', onMessage);

BOT.login(TOKEN);
