import React, { useState, useEffect } from 'react'

import axios from 'axios'

import MainTitle from '../../../shared/components/Title/MainTitle'

import loadingImg from '../../../picture/loading.gif'

import './ContactList.css'
import del from '../../../Icons/delete.svg'
import check from '../../../Icons/check.png'


const API_URL = 'http://localhost:8080/contact'

const ContactList = () => {
    const [isLoading, setIsLoading] = useState(true);
    let [productData, setProductData] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        axios.get(API_URL)
            .then((data) => {
                setProductData(data.data)
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false);
            })
    }, [])

    const contactDeletedHanlder = (id) => {
        axios.delete(API_URL + `/${id}`)
            .then(() => {
                // console.log('delete success')
                window.location.reload();
            }).catch((error) => {
                console.log(error)
            })
    }
    const contactReadHanlder = (id) => {
        console.log("已讀")
    }

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
        <div>
            <MainTitle title="聯絡資訊" />
            <div className="contactlist-container">
                {productData && productData.map((eachdata) => (
                    <div className="contactlist-card-container">
                        <div className="contactlist-card">
                            <div className="contactlist-details">
                                <h1>{eachdata.name}</h1>
                                <br />
                                <pre >{eachdata.content}</pre>
                                <br />
                            </div>

                        </div>
                        <div className='contactlist-inform'>
                            <span >Phone : {eachdata.phone}</span>
                            <br />
                            <span >Email : {eachdata.email}</span>
                            <br />
                        </div>

                        <div className='contactlist-bottom-side'>
                            <button className='read-button' onClick={() => contactReadHanlder(eachdata._id)}>
                                <img className='contactlist-img' src={check} alt="" />
                            </button>
                            <button className='delete-button' onClick={() => contactDeletedHanlder(eachdata._id)}>
                                <img className='contactlist-img' src={del} alt="" />
                            </button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default ContactList