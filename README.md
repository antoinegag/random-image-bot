# random-image-bot
Send random images from imgur to Discord

# Installation
## Clone the project
`git clone <url> && cd random-image-bot`

## Install packages
Install the packages with your prefered package manager
`yarn` or `npm i`

## Create a .env file
Create a `.env` file at the root of the project and fill in the values
```dotenv
# End of the URL of the album you wish to pull from ex: https://imgur.com/a/38Ksq9G, the hash is 38Ksq9G
IMGUR_ALBUM_HASH=

# Your IMGUR client id, see https://apidocs.imgur.com/?version=latest#authorization-and-oauth
IMGUR_CLIENT_ID=

# The toke of your _bot_
DISCORD_TOKEN=

# The trigger ex: !image
COMMAND=

# Custom name used instead of "images"
IMAGES_NAME=
```

## Start the app
`yarn start` or `npm start`

# Updating images
The bot will cache the images in your album, when adding new images to your album make sure to run `<command> refresh`.