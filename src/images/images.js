const db = require("../db/sqlite");
const imgur = require("./imgur");

/**
 * @typedef Image
 * @property {number} id
 * @property {string} url
 * @property {string} caption
 */

/**
 * Get an image by its index
 * @param {number} id
 *
 * @returns {Promise<Image>} image
 */
async function get(id) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("SELECT * FROM images WHERE id = ?");
    stmt.get(id, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
    stmt.finalize();
  });
}
exports.get = get;

/**
 * Remove an image by its ID
 * @param {number} id
 *
 * @returns {Promise}
 */
async function remove(id) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("DELETE FROM images WHERE id = ?");
    stmt.get(id, (err, result) => {
      if (err) reject(err);
      else resolve();
    });
    stmt.finalize();
  });
}
exports.remove = remove;

/**
 * List all images
 *
 * @returns {Promise<Image[]>} images
 */
async function list() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM images", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}
exports.list = list;

/**
 * Add multiple images
 */
async function addMultiple(images) {
  var stmt = db.prepare("INSERT INTO images (url, caption) VALUES (?, ?)");
  images.forEach(image => {
    stmt.run(image.url, image.caption);
  });
  stmt.finalize();
}
exports.addMultiple = addMultiple;

/**
 * Add an image
 *
 * @param {string} imageUrl
 * @param {string} caption
 */
async function add(imageUrl, caption) {
  const url = imageUrl.includes("imgur")
    ? await imgur.getImageUrl(imageUrl)
    : imageUrl;
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("INSERT INTO images (url, caption) VALUES (?, ?)");
    stmt.get(url, caption, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
    stmt.finalize();
  });
}
exports.add = add;

/**
 * Count images
 *
 * @returns {Promise<number>} count
 */
async function count() {
  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(id) FROM images", (err, count) => {
      if (err) reject(err);
      else resolve(count["COUNT(id)"]);
    });
  });
}
exports.count = count;
