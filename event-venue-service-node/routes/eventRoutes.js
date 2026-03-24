const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI, } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const controller = require('../controllers/eventController');

router.get('/', controller.getAllEvents);
router.get("/:id", controller.getEventById);
router.post('/', controller.createEvent);
router.delete('/:id', controller.deleteEvent);
router.put("/:id", controller.updateEvent);

router.post(
  "/generateDescription",
  async (req, res) => {

    try {

      const { name, city, category } =
        req.body;

      const prompt =
        `Write a short event description for 
        ${name} in ${city} for ${category} event. 
        Keep it professional and attractive. 
        Don't give me options, just a single description.`;

      const model =
        genAI.getGenerativeModel({
          model: "gemini-flash-latest",
        });

      const result =
        await model.generateContent(
          prompt
        );

      const text =
        result.response.text();

      res.json(text);

    } catch (err) {

      console.log(err);
      res.status(500).send("AI error");

    }

  }
);

module.exports = router;