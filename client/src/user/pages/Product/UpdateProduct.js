import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import FileBase64 from 'react-file-base64';

import MainTitle from '../../../shared/components/Title/MainTitle'
import { AuthContext } from '../../../shared/context/auth-context';
import './UpdateProduct.css';


import loadingImg from '../../../picture/loading.gif'

const initialValues = {
    name: "",
    image: "",
    description: "",
    price: "",
    quantity: ""
};

const UpdateProduct = () => {
    const auth = useContext(AuthContext);
    const [values, setValues] = useState(initialValues);
    const [isLoading, setIsLoading] = useState(false);
    const productId = useParams().productId;

    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };



    useEffect(() => {
        setIsLoading(true)
        const fetchProduct = async () => {
            try {
                const responseData = await axios.get(
                    `http://localhost:8080/product/${productId}`
                );
                setValues(responseData.data)
                setIsLoading(false)

            } catch (err) {
                console.log(err)
            }
        };
        fetchProduct();

    }, []);

    const productUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await axios.patch(
                `http://localhost:8080/product/update/${productId}`,
                {
                    name: values.name,
                    image: values.image,
                    description: values.description,
                    price: values.price,
                    quantity: values.quantity
                },
                {
                    'Content-Type': 'application/json'

                }
            )
            navigate(-1);

        } catch (err) { }
    };

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
                        <button className='newstreamer-button' onClick={productUpdateSubmitHandler}>提交表單</button>

                    </div>

                </section>
            </div>

        </main>
    );
};

export default UpdateProduct;
