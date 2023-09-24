import React, { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';


import { AuthContext } from '../../shared/context/auth-context';

import './TwitchLogin.css'

const TwitchLogin = () => {
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
        const codeURL = `http://localhost:8080/twitchLogin/getTwitchToken`

        axios.post(codeURL, {
            data: {
                code
            }
        }).then(result =>
            auth.login(result.data.access_token),
            history('/')
        ).catch(error =>
            console.log(error)
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='twitch-login-container'>
        </div>
    )
}

export default TwitchLogin