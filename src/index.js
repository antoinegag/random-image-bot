require("dotenv").config();
const COMMAND = process.env.COMMAND;
const IMAGES_NAME = process.env.IMAGES_NAME || images;

const Discord = require('discord.js');
const client = new Discord.Client();
const imgur = require("./imgur");

function getRandomImage(images) {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

let imageCache = [];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

async function showRandomImage(msg) {
  if(imageCache.length === 0) {
    imageCache = await imgur.fetchAlbumImages(process.env.IMGUR_ALBUM_HASH);
  }

  const image = getRandomImage(imageCache);
  if(!image) {
    msg.reply("Failed to fetch an image");
    return;
  }

  const embed = new Discord.RichEmbed()
    .setTitle(image.description)
    .setColor("#ffffff")
    .setImage(image.link);

  return msg.channel.send(embed);
}

async function refreshCache(msg) {
  imageCache = await imgur.fetchAlbumImages(process.env.IMGUR_ALBUM_HASH);
  if(imageCache.length !== 0) {
    msg.reply(`Succesfully refreshed images image cache.\nCurrent image count: ${imageCache.length}`);
  } else {
    msg.reply("Failed to refresh images cache");
  }
}

function count(msg) {
  msg.reply(`There are currently ${imageCache.length} ${IMAGES_NAME}!`);
}

const COMMAND_REGEX = new RegExp(`^${COMMAND} ?(.*)`);
client.on('message', async msg => {
  if (msg.content.startsWith(COMMAND)) {
    const content = msg.content;
    const command = content.match(COMMAND_REGEX);
    if(command) {
      const param = command[1];
      if(param === "") {
        return showRandomImage(msg);
      } else {
        switch (param) {
          case "refresh":
            return refreshCache(msg);
          case "count":
            return count(msg);
          default:
            break;
        }
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);