const router = require('express').Router()
const mongoose = require('mongoose')
const Bulletin = require('../models/bulletin')

router.get('/', (req, res) => {
  console.log("into Bulletin server")

  Bulletin.find({})
    .then((bulletins) => {
      res.send(bulletins)
    }).catch((err) => {
      console.log(err)
      res.status(500).send('ERROR!! Cannot  get product')
    });
}
)

router.get('/:id', async (req, res) => {
  const bulletindbId = req.params.id;
  try {
    bulletindb = await Bulletin.findById(bulletindbId)
    // console.log(bulletindb)
    res.send(bulletindb)
  } catch (error) {
    res.status(500).send('ERROR!! Cannot  get bulletin')
  }
})

router.post('/new', async (req, res) => {
  const { main, title, image, description, url } = req.body;
  const createdBulletin = new Bulletin({
    main,
    title,
    image,
    description,
    url,
  });

  try {
    await createdBulletin.save()
    res.status(201).json({ message: 'add news successfully' })
  } catch (error) {
    console.log(error)
  }
})

router.patch('/update/:id', async (req, res) => {

  console.log('into patch server')
  const bulletinId = req.params.id;
  const { main, title, image, description, url } = req.body;

  let bulletin;
  try {
    bulletin = await Bulletin.findById(bulletinId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  bulletin.main = main;
  bulletin.title = title;
  bulletin.image = image;
  bulletin.description = description;
  bulletin.url = url;

  try {
    await bulletin.save();
    res.send(bulletin);
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:_id', async (req, res) => {

  let { _id } = req.params
  let bulletin = await Bulletin.findOne({ _id })
  console.log(_id)
  
  if (!bulletin) {
    res.status(404)
    return res.json({ message: "Contact cant find" })
  }

  Bulletin.deleteOne({ _id })
    .then(() => {
      res.send("Bulletin deleted")
    }).catch((err) => {
      res.send({ message: err })
    })
})

module.exports = router