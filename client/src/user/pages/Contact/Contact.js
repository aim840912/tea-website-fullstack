import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import MainTitle from '../../../shared/components/Title/MainTitle'

import axios from 'axios'
import './Contact.css'


const API_URL = 'http://localhost:8080/contact'


const initialValues = {
    name: "",
    email: "",
    phone: "",
    content: "",
};

const Contact = () => {
    const [values, setValues] = useState(initialValues);
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        //const name = e.target.name 
        //const value = e.target.value 
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const postContact = () => {
        axios.post(
            API_URL,
            {
                name: values.name,
                email: values.email,
                phone: values.phone,
                content: values.content
            }
        )
            .then(() => {
                window.alert("Your contact has been serviced.");
                navigate('/')
            })
            .catch((error) => {
                console.log(error.response.data)
            });
    };

    return (
        <>
            <MainTitle title="聯絡" />
            <div className='contact-div'>
                <section className="form">
                    <div className="contact-form">
                        <div>
                            <label className='contact-label' htmlFor="name">姓名 :</label>
                            <input
                                className='contact-input'
                                value={values.name}
                                onChange={handleInputChange}
                                type="text"
                                name="name" />
                        </div>

                        <div>
                            <label className='contact-label' htmlFor="email">郵件 :</label>
                            <input
                                className='contact-input'
                                value={values.email}
                                onChange={handleInputChange}
                                type="email"
                                name="email" />
                        </div>
                        <div>
                            <label className='contact-label' htmlFor="phone">電話 :</label>
                            <input
                                className='contact-input'
                                value={values.phone}
                                onChange={handleInputChange}
                                type="text"
                                name="phone" />
                        </div>
                        <div>
                            <label className='contact-label' htmlFor="content">內容 :</label>
                            <textarea
                                className='contact-textarea'
                                value={values.need}
                                onChange={handleInputChange}
                                name="content" id="content" rows="10" />
                        </div>
                        <br />
                        <button className='contact-button' onClick={postContact}>提交表單</button>
                    </div>
                </section>
                <div className="line"></div>
                <section className="contact-section">
                    <div className="contact-content">
                        <h2>電話: 0911-303-123</h2>
                        <h2>Email : unknown@fakemail.com</h2>
                        <h2>方便聯絡時間 : 周一至周六早上八點到晚上七點</h2>
                        <h2>其他聯絡方式 : 臉書</h2>
                    </div>
                    <div className="links">
                        {/* <a href="https://www.facebook.com/groups/181308509429603" target="_blank" rel="noopener noreferrer"><img src={fbLogo} alt="facebook" /></a> */}
                    </div>
                </section>
            </div>
        </>
    )
}

export default Contact