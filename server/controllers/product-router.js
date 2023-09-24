const router = require('express').Router()
const mongoose = require('mongoose')
const Product = require('../models/product')

router.get('/', (req, res) => {
  Product.find({})
    .then((products) => {
      res.send(products)
    })
    .catch(() => {
      res.status(500).send('ERROR!! Cannot  get product')
    })
})

router.get('/:id', async (req, res) => {
  console.log('into get server')
  const productId = req.params.id;

  try {
    product = await Product.findById(productId)
    res.send(product)
  } catch (error) {
    res.status(500).send('ERROR!! Cannot  get product')
  }
})

router.post('/new', async (req, res) => {
  const { name, image, description, price, quantity } = req.body;
  const createdProduct = new Product({
    name,
    image,
    description,
    price,
    quantity,
  });

  try {
    await createdProduct.save()
    res.status(201).json({ message: 'add information successfully' })
  } catch (error) {
    console.log(error)
  }
})

router.patch('/update/:id', async (req, res) => {

  console.log('into patch server')
  const productId = req.params.id;
  const { name, image, description, price, quantity } = req.body;
  let product;
  try {
    product = await Product.findById(productId);

  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  product.name = name;
  product.image = image;
  product.description = description;
  product.price = price;
  product.quantity = quantity;

  try {
    await product.save();
    res.send(product);
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:_id', async (req, res) => {

  let { _id } = req.params
  let product = await Product.findOne({ _id })
  if (!product) {
    res.status(404)
    return res.json({ message: "Contact cant find" })
  }

  Product.deleteOne({ _id })
    .then(() => {
      res.send("Contact deleted")
    }).catch((err) => {
      res.send({ message: err })
    })
})




module.exports = router