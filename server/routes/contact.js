const router = require('express').Router()
const Contact = require('../models/contact')

router.use((res, req, next) => {
    console.log('A request is coming into contact api')
    next()
})

router.post('/', async (req, res) => {
    const { name, email, phone, content } = req.body;

    const createdContact = new Contact({
        name, email, phone, content
    })

    try {
        await createdContact.save()
        res.status(200).send("new product has been saved")
    } catch (error) {
        res.status(400).send("Cannot save product")
    }
})

router.get('/', (req, res) => {
    Contact.find({})
        .then((contact) => {
            res.send(contact)
        })
        .catch(() => {
            res.status(500).send('ERROR!! Cannot  get course')
        })
})

router.delete("/:_id", async (req, res) => {
    let { _id } = req.params
    let contact = await Contact.findOne({ _id })
    if (!contact) {
        res.status(404)
        return res.json({ message: "Contact cant find" })
    }

    Contact.deleteOne({ _id })
        .then(() => {
            res.send("Contact deleted")
        }).catch((err) => {
            res.send({ message: err })
        })
})



module.exports = router