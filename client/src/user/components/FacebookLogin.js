import React, { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

import { AuthContext } from '../../shared/context/auth-context';

import './FacebookLogin.css'

const FacebookLogin = () => {
    const auth = useContext(AuthContext)

    const history = useNavigate()

    useEffect(() => {
        const OauthURL = window.location.href
        let code = ""
        if (OauthURL.indexOf('?') !== -1) {
            let spiltURL = OauthURL.split('?')[1].split('&');

            for (let i = 0; i <= spiltURL.length - 1; i++) {
                if (spiltURL[i].split('=')[0] === 'code')
                    code = spiltURL[i].split('=')[1];
            }
        }

        const codeURLFacebook = `http://localhost:8080/authenticate/facebook`
        // axios.get(codeURLFacebook+`/?${code}`
        axios.get(codeURLFacebook, {
            params: {
                code
            }
        }
        ).then((result) =>
            auth.login(result.data.access_token),
            history('/')
        ).catch((err) => {
            console.log('client err')
        });


    }, [])

    return (
        <div className='twitch-login-container'>
        </div>
    )
}

export default FacebookLogin