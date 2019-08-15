const COMMAND = process.env.COMMAND;
const IMAGES_NAME = process.env.IMAGES_NAME || images;

const Discord = require('discord.js');
const client = new Discord.Client();
const imgur = require("../images/imgur");
const images = require("../images/images");

function getRandom(max) {
  return Math.floor(Math.random() * max) + 1;
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

async function showImage(msg, params) {
  const count = await images.count();
  const random = isNaN(parseInt(params[0]));
  const index = random ? getRandom(count) : parseInt(params[0]);
  const image = await images.get(index);

  if(!image) {
    msg.reply("Failed to fetch image");
    return;
  }

  const embed = new Discord.RichEmbed()
    .setTitle(image.caption)
    .setColor("#ffffff")
    .setImage(image.url)
    .setFooter(`#${image.id}`);

  return msg.channel.send(embed);
}

async function count(msg) {
  const count = await images.count();
  msg.reply(`There are currently ${count} ${IMAGES_NAME}!`);
}

const ALBUM_REGEX = /https:\/\/imgur.com\/a\/(.*)/
async function importAlbum(msg, params) {
  if(params.length < 2) {
    msg.reply("Missing imgur album url");
    return;
  }

  const match = params[1].match(ALBUM_REGEX);
  if(match && match.length === 2) {
    const newImages = await imgur.fetchAlbumImages(match[1]);
    images.addMultiple(newImages);
    msg.reply("Done!")
    return;
  }
  msg.reply("Not a valid imgur album url")
}

async function addImage(msg, params) {
  if(params.length < 3) {
    msg.reply(`Missing URL and caption. Format: ${COMMAND} <url> <caption>`);
    return;
  }
  
  images.add(params[1], params.splice(2).join(" "));
  msg.reply("Done!");
}

async function listImages(msg, params) {
  const imageList = await images.list();
  msg.reply(`Here is a list of all the images\n${imageList.map(image => `#${image.id}: ${image.caption} (<${image.url}>)`).join("\n")}`);
}

const COMMAND_REGEX = new RegExp(`^${COMMAND} ?(.*)`);
client.on('message', async msg => {
  if (msg.content.startsWith(COMMAND)) {
    const content = msg.content;
    const command = content.match(COMMAND_REGEX);
    if(content.match(COMMAND)) {
      const params = command[1].split(" ");
      switch (params[0]) {
        case "count":
          return count(msg);
        case "import":
          return importAlbum(msg, params);
        case "add":
          return addImage(msg, params);
        case "list":
          return listImages(msg, params);
        default:
          return showImage(msg, params);
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);