const fetch = require("node-fetch");

function fetchAlbum(hash) {
  return fetch(
    `https://api.imgur.com/3/album/${hash}`, { 
    headers: {
      "Authorization": `Client-ID ${process.env.IMGUR_CLIENT_ID}`
    }})
    .then(result => result.json())
    .catch(err => console.log(err));
}
exports.fetchAlbum = fetchAlbum;

async function fetchAlbumImages(hash) {
  const album = await fetchAlbum(hash)
  return album.data.images;
}
exports.fetchAlbumImages = fetchAlbumImages;

