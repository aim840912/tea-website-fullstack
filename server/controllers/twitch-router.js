const router = require('express').Router()
const mongoose = require('mongoose')

const axios = require('axios')

router.get('/', (req, res) => { })

router.post('/getTwitchToken', (req, res) => {
    const TwitchCode = req.body.data.code
    const token = ""
    const Tien_Id = '97737561'

    axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&code=${TwitchCode}&grant_type=authorization_code&redirect_uri=http://localhost:3000/contact`)
        .then((result) => {
            res.send(result.data)
            axios.get('https://api.twitch.tv/helix/users',
                {
                    headers: {
                        'Authorization': 'Bearer ' + result.data.access_token,
                        'Client-ID': `${process.env.TWITCH_CLIENT_ID}`
                    }
                })
                .then(result => {
                })
                .catch(err => console.log(err))
        }).catch((err) => {
            console.log(err)
        });

})

module.exports = router