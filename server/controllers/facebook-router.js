const router = require('express').Router()
const axios = require('axios')

router.get('/', (req, res) => {
    console.log('inside fb login server')

    const FacebookCode = req.query.code

    const client_id = `${process.env.FACEBOOK_CLIENT_ID}`

    axios.get(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${client_id}&redirect_uri=http://localhost:3000/authenticate/facebook/&client_secret=${process.env.FB_CLIENT_SCERET}&code=${FacebookCode}`)
        .then((result) => {
            res.send(result.data)
            console.log('server success')

        }).catch((err) => {
            console.log('server fail')
        });

})

module.exports = router