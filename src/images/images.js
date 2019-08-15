const db = require("../db/sqlite");
const imgur = require("./imgur");
const { promisify } = require("util");

async function get(index) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("SELECT * FROM images WHERE id = ?");
    stmt.get(index, (err, result) => {
      if(err) reject(err);
      else resolve(result);
    });
    stmt.finalize();
  });
}
exports.get = get;

async function remove(index) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("DELETE FROM images WHERE id = ?");
    stmt.get(index, (err, result) => {
      if(err) reject(err);
      else resolve();
    });
    stmt.finalize();
  });
}
exports.remove = remove;

async function list() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM images", (err, rows) => {
      if(err) reject(err);
      else resolve(rows);
    })
  })
}
exports.list = list;

async function addMultiple(images) {
  var stmt = db.prepare("INSERT INTO images (url, caption) VALUES (?, ?)");
  images.forEach(image => {
    stmt.run(image.link, image.description);
  });
  stmt.finalize();
}
exports.addMultiple = addMultiple;

async function add(imageUrl, caption) {
  const url = imageUrl.includes("imgur") ? await imgur.getImageUrl(imageUrl) : imageUrl;
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("INSERT INTO images (url, caption) VALUES (?, ?)");
    stmt.get(url, caption, (err, result) => {
      if(err) reject(err);
      else resolve(result);
    });
    stmt.finalize();
  });
}
exports.add = add;

async function count() {
  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(id) FROM images", (err, count) => {
      if(err) reject(err);
      else resolve(count["COUNT(id)"]);
    });
  });
}
exports.count = count;