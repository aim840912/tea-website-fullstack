const router = require('express').Router()
const mongoose = require('mongoose')
const Testdb = require('../models/testdb')

router.get('/', async (req, res) => {
  try {
    const item = await Testdb.find()
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
)

router.post('/new', async (req, res) => {
  const image = req.body;
  const createdStestdb = new Testdb( image );
  try {
    await createdStestdb.save()
    res.status(201).json(createdStestdb);
  } catch (error) {
    console.log(error)
  }
})

module.exports = router