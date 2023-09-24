import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios'
import FileBase64 from 'react-file-base64';

import MainTitle from '../../../shared/components/Title/MainTitle'

import './NewProduct.css'

const initialValues = {
    name: "",
    image: "",
    description: "",
    price: "",
    quantity: ""
};

const StreamerDetail = () => {
    const API_URL = 'http://localhost:8080/product/new'

    const [values, setValues] = useState(initialValues);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const postNewstreamer = () => {
        axios.post(
            API_URL,
            {
                name: values.name,
                image: values.image,
                description: values.description,
                price: values.price,
                quantity: values.quantity
            }
        )
            .then(() => {
                window.alert("Your new product has been added.");
                navigate('/product/list')
            })
            .catch((error) => {
                console.log(error)
            });
    };
    return (
        <main >
            <MainTitle title="新增" />
            <div className='newstreamer-container'>
                <section className='newstreamer-image-show'>
                    <img className="newstreamer-image" src={values.image} alt="" />
                </section>
                <section className="newstreamer-form">
                    <div>
                        <label className='newstreamer-label' htmlFor="name">產品名稱 :</label>
                        <input
                            className='newstreamer-input'
                            value={values.name}
                            onChange={handleInputChange}
                            type="text"
                            name="name" />
                    </div>
                    <div>
                        <label className='newstreamer-label' htmlFor="price">價錢 :</label>
                        <input
                            className='newstreamer-input'
                            value={values.price}
                            onChange={handleInputChange}
                            type="text"
                            name="price" />
                    </div>
                    <div className='newstreamer-url-container'>
                        <label className='newstreamer-label' htmlFor="quantity">數量 :</label>
                        <input
                            className='newstreamer-input'
                            value={values.quantity}
                            onChange={handleInputChange}
                            type="text"
                            name='quantity' />
                    </div>
                    <div>
                        <label className='newstreamer-label' htmlFor="自介">描述 :</label>
                        <textarea
                            className='newstreamer-textarea'
                            value={values.description}
                            onChange={handleInputChange}
                            name="description" id="description" rows="10" />
                    </div>



                    <div className='newstreamer-input'>
                        <FileBase64
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setValues({ ...values, image: base64 })}
                        />
                        <button className='newstreamer-button' onClick={postNewstreamer}>提交表單</button>

                    </div>

                </section>
            </div>

        </main>
    )
}

export default StreamerDetail