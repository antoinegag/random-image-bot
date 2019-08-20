const fetch = require("node-fetch");

/**
 * Fetch album data from the Imgur API
 * @param {string} hash the album hash at the end of the URL
 *
 * @returns {Promise<JSON>} album data
 */
function fetchAlbum(hash) {
  return fetch(`https://api.imgur.com/3/album/${hash}`, {
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
    }
  })
    .then(result => result.json())
    .catch(err => console.err(err));
}
exports.fetchAlbum = fetchAlbum;

const HASH_REGEX = /imgur.com\/(.*)/;

/**
 * Get the direct URL to the image from an Imgur post
 * @param {string} url
 *
 * @returns {Promise<string>} url
 */
async function getImageUrl(url) {
  if (url.includes("i.imgur")) return url;
  if (!url.includes("imgur")) throw new Error("Non imgur link");

  const hashMatch = url.match(HASH_REGEX);
  if (!hashMatch && hashMatch.length !== 2)
    throw new Error("No hash provided for image link");

  return fetch(`https://api.imgur.com/3/image/${hashMatch[1]}`, {
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
    }
  })
    .then(result => result.json())
    .then(json => json.data.link)
    .catch(err => console.log(err));
}
exports.getImageUrl = getImageUrl;

/**
 * Fetch all the images in an album
 * @param {string} hash
 *
 * @returns {Promise<Array>} images
 */
async function fetchAlbumImages(hash) {
  const album = await fetchAlbum(hash);
  return album.data.images;
}
exports.fetchAlbumImages = fetchAlbumImages;
