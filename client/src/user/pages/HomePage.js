import React from 'react';

import './HomePage.css'
import MainTitle from '../../shared/components/Title/MainTitle';
import tea_pic_big from '../../picture/tea3.jpg'
import fruit from '../../picture/fruit.jpg'
import tea2 from '../../picture/tea2.jpg'
// import ReactPlayer from 'react-player';


const FB_url = "https://www.facebook.com/groups/284358098576086"


const HomePage = () => {

    return (
        <div className='homepage'>
            <MainTitle title="主頁" />
            <div className='homepage-contianer'>
                <div className="homepage-cards">
                    <div className="homepage-card homepage-content">
                        <div className="homepage-card-content">
                            <div className="homepage-card-img">
                                <a href={FB_url} target="_blank" rel="noreferrer">
                                    <img src={tea_pic_big} alt="Gamer" />
                                </a>
                            </div>
                            <div className="homepage-card-label">FaceBook</div>
                            <div className="homepage-card-title">
                                豪德商店
                            </div>
                        </div>
                    </div>
                    <div className="homepage-card content">
                        <div className="homepage-card-content">
                            <div className="homepage-card-img">
                                <img src={fruit} alt="keyboard" />
                            </div>
                            <div className="homepage-card-label">
                                Fruit
                            </div>
                            <div className="homepage-card-title">
                                article3
                            </div>
                        </div>
                    </div>
                    <div className="homepage-card content">
                        <div className="homepage-card-content">
                            <div className="homepage-card-img">
                                <img src={tea2} alt="Controller" />
                            </div>
                            <div className="homepage-card-label">
                                Tea
                            </div>
                            <div className="homepage-card-title">
                                article2
                            </div>
                        </div>
                    </div>
                    <div className="homepage-card form">
                        <a href="https://www.facebook.com/groups/284358098576086" target="_blank" rel="noreferrer">
                            <div className="form-title">豪德</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default HomePage