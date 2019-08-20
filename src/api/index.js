const express = require("express");
const router = express.Router();
const images = require("../images/images");

router.get("/", (req, res) => {
  return res.json({ success: true });
});

router.get("/images", async (req, res) => {
  const imageList = await images.list();
  if (!images) {
    res.status(500);
    return res.json({ error: "Error fetching image list" });
  }
  return res.json(imageList);
});

router.get("/images/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400);
    return res.json({ error: "Missing param ID" });
  }

  const image = await images.get(id);

  if (!image) {
    res.status(500);
    return res.json({ error: "Error fetching the image" });
  }
  return res.json(image);
});

router.delete("/images/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400);
    return res.json({ error: "Missing param ID" });
  }
  await images.remove(id);
  res.json({ message: "success" });
});

router.post("/images", async (req, res) => {
  const { url, caption, images: imageList } = req.body;

  if (!(url && caption) && !imageList) {
    res.status(400);
    res.json({ error: "Missing param url, caption or images" });
  }

  if (imageList) {
    try {
      await images.addMultiple(
        imageList.map(image => {
          if (!image.url || !image.caption) {
            throw new Error("Malformed image");
          }
          return image;
        })
      );
    } catch (error) {
      res.status(500);
      res.json({ error: "Failed to add images" });
    }
  } else {
    await images.add(caption, url);
  }

  return res.json({ message: "success" });
});

module.exports = router;
