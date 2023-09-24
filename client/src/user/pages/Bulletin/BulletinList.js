import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

import './BulletinList.css'

import loadingImg from '../../../picture/loading.gif'

const API_URL = 'http://localhost:8080/bulletin'

const BulletinList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [bulletinData, setBulletinData] = useState(null);
    const [bulletinCount, setBulletinCount] = useState(1)

    useEffect(() => {
        setIsLoading(true);
        axios.get(API_URL)

            .then((data) => {
                setBulletinData(data.data)

                setBulletinCount(data.data.length)
                console.log(bulletinData)
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false);
            })
    }, [])

    if (isLoading) {
        return (
            <div>
                <div className="loading-container">
                    <img className="loading-img" src={loadingImg} alt='' />
                </div>
            </div>
        );
    }

    return (

        <section >
            <div className="band-top">
                <Link to={`/bulletin/${bulletinData[bulletinCount - 1]._id}`} className="news-card">
                    <div className="thumb">
                        <img className='news-image' src={bulletinData[bulletinCount - 1].image} alt="" />
                        <h1>{bulletinData[bulletinCount - 1].title}</h1>
                    </div>
                </Link>

                <Link to={`/bulletin/${bulletinData[bulletinCount - 2]._id}`} className="news-card">
                    <div className="thumb">
                        <img className='news-image' src={bulletinData[bulletinCount - 2].image} alt="" />
                        <h1>{bulletinData[bulletinCount - 2].title}</h1>
                    </div>
                </Link>
            </div>
            <div className='bottom-word'>Recent Posts</div>
            <div className="band-bottom">
                {bulletinData && bulletinData.slice(0, bulletinCount - 2).reverse().map((data) => (
                    <div key={uuidv4()} className={data.main ? "item-1" : "item-2"}>
                        <Link to={`/bulletin/${data._id}`} className="news-card">
                            <div className="thumb">
                                <img className='news-image' src={data.image} alt="" />
                                <h1>{data.title}</h1>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default BulletinList