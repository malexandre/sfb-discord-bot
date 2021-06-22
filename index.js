"use strict";
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var config_json_1 = require("./config.json");
var TOKEN = process.env.TOKEN;
function shuffle(array) {
    var _a;
    var currentIndex = array.length, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [
            array[randomIndex], array[currentIndex]
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
}
function onMessage(msg) {
    if (msg.content === config_json_1["default"].prefix + "sfb") {
        var response = new discord_js_1.MessageEmbed();
        response.setTitle("Tirage de ta partie :");
        response.setDescription(msg.author.tag + " sera le " + (Math.random() < 0.5 ? "premier" : "second") + " joueur.");
        response.addField("Champions disponibles :", shuffle(config_json_1["default"].champions).slice(0, 7).join("\n"));
        msg.channel.send(response);
    }
}
var BOT = new discord_js_1.Client();
BOT.on('ready', function () {
    console.info("Logged in as " + BOT.user.tag + "!");
});
BOT.on('message', onMessage);
BOT.login(TOKEN);
