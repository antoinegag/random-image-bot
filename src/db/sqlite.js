const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./images.db', (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  
  db.run("CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY, url varchar(64), caption TEXT);")
  
  console.log('Connected to the image database.');
});

module.exports = db;