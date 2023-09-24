import React from 'react';
import * as queryString from 'query-string';

import MainTitle from '../../shared/components/Title/MainTitle';

import twitchIcon from '../../Icons/twitch.svg'
import facebookIcon from '../../Icons/facebook.svg'
import './Login.css'

// const URL = "https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=1huxzz32id0etcwctvmmiw5ik3oji5&redirect_uri=http://localhost:3000&state=c3ab8aa609ea11e793ae92361f002671"

const scope = "user:read:email"
// const scope="channel:read:subscriptions"
const URL_twitch = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=http://localhost:3000/twitchLogin&scope=${scope}&state=c3ab8aa609ea11e793ae92361f002671`

const stringifiedParams = queryString.stringify({
    client_id: '517857646532077',
    redirect_uri: 'http://localhost:3000/authenticate/facebook/',
    scope: ['email', 'user_friends'].join(','), // comma seperated string
    response_type: 'code',
    auth_type: 'rerequest',
    display: 'popup',
  });

// const URL_facebook = `https://www.facebook.com/v13.0/dialog/oauth?client_id=517857646532077&redirect_uri=http://localhost:3000/authenticate/facebook/&client_secret=4c070a1741ea618e856218e328a9628d`
const URL_facebook = `https://www.facebook.com/v13.0/dialog/oauth?${stringifiedParams}`

const Login = () => {
    return (
        <div>
            <MainTitle title="登入" />

            <div className='twitch-login-container'>
                <button >
                    <a href={URL_twitch}>
                        <img className='twitch-login-img' src={twitchIcon} alt="" />Login with Twitch
                    </a>
                </button>

                <button >
                    <a href={URL_facebook}>
                        <img className='twitch-login-img' src={facebookIcon} alt="" />Login with Facebook
                    </a>
                </button>
            </div>
        </div>

    )
}

export default Login