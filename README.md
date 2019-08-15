# random-image-bot
Send random images to Discord

# Installation
## Clone the project
`git clone <url> && cd random-image-bot`

## Install packages
Install the packages with your prefered package manager
`yarn` or `npm i`

## Create a .env file
Create a `.env` file at the root of the project and fill in the values
```dotenv
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