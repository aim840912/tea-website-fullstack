import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { AuthContext } from '../../../shared/context/auth-context'


import loadingImg from '../../../picture/loading.gif'

import './BulletinDetail.css'
import MainTitle from '../../../shared/components/Title/MainTitle';

const BulletinDatail = () => {
    const auth = useContext(AuthContext);

    let { bulletinId } = useParams()
    let [bulletinData, setBulletinData] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const API_URL = `http://localhost:8080/bulletin/`

    useEffect(() => {
        setIsLoading(true)
        axios.get(API_URL + bulletinId)
            .then((result) => {
                setBulletinData(result.data)
                setIsLoading(false)
            }).catch((err) => {
                console.log(err)
                setIsLoading(false)
            });

    }, [API_URL, bulletinId])

    const bulletinDeletedHanlder = (id) => {
        axios.delete(API_URL + id)
            .then(() => {
                navigate('/bulletin/list')
            }).catch((error) => {
                console.log(error)
            })
    }

    if (isLoading) {
        return (
            <div>
                <MainTitle title="讀取中" />
                <div className="loading-container">
                    <img className="loading-img" src={loadingImg} alt='' />
                </div>
            </div>
        );
    }


    return (
        <div >
            <MainTitle title="公告" />
            {!isLoading && bulletinData &&
                <div className='newsdatail-container'>
                    <div className='newsdatail-topside'>
                        <h3>{bulletinData.title}</h3>
                    </div>
                    <section className='newdetail-img'>
                        <img className='detail-img' src={bulletinData.image} alt='rb' />
                    </section>
                    <article className='newsdatail-article'>
                        <div className='newsdatail-time'>{bulletinData.updatedAt}</div>
                        <pre>
                            {bulletinData.description}
                        </pre>
                        {!!auth.token &&
                            <div className='fixed-edit'>
                                <Link to={`/bulletin/update/${bulletinData._id}`}><button className='product-button'>編輯</button></Link>
                                <button onClick={() => bulletinDeletedHanlder(bulletinData._id)} className='product-button'>刪除</button>
                            </div>
                            }

                    </article>

                </div>
            }
        </div>
    )
}

export default BulletinDatail