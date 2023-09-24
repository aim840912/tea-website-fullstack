import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import FileBase64 from 'react-file-base64';

import MainTitle from '../../../shared/components/Title/MainTitle'
import { AuthContext } from '../../../shared/context/auth-context';
import './UpdateBulletin.css';


import loadingImg from '../../../picture/loading.gif'

const initialValues = {
    main: false,
    title: "",
    image: "",
    description: "",
    url: ""
};

const UpdateProduct = () => {
    const auth = useContext(AuthContext);
    const [values, setValues] = useState(initialValues);
    const [isLoading, setIsLoading] = useState(false);
    const bulletinId = useParams().bulletinId;

    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleCheckedChange = (e) => {
        let isChecked = e.target.checked;

        setValues({
            ...values,
            main: isChecked,
        });
    };



    useEffect(() => {
        setIsLoading(true)
        const fetchProduct = async () => {
            try {
                const responseData = await axios.get(
                    `http://localhost:8080/bulletin/${bulletinId}`
                );

                setValues(responseData.data)
                setIsLoading(false)

            } catch (err) {
                console.log(err)
            }
        };
        fetchProduct();

    }, []);

    const bulletinUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await axios.patch(
                `http://localhost:8080/bulletin/update/${bulletinId}`,
                {
                    main: values.main,
                    title: values.title,
                    image: values.image,
                    description: values.description,
                    url: values.url
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
            <MainTitle title="更新" />

            <div className='new-news-container'>
                <section className='new-news-image-show'>
                    <img className="new-news-image" src={values.image} alt="" />
                </section>
                <section className="new-news-form">
                    <div className='news-ckeckbox-container'>
                        <label className='new-news-label' htmlFor="main">是否大版面 : </label>
                        <input
                            className='new-news-check'
                            value={values.main}
                            checked={values.main}
                            onChange={handleCheckedChange}
                            type="checkbox"
                            name="main" />
                    </div>
                    <div>
                        <label className='new-news-label' htmlFor="title">標題 :</label>
                        <input
                            className='new-news-input'
                            value={values.title}
                            onChange={handleInputChange}
                            type="text"
                            name="title" />
                    </div>
                    <div>
                        <label className='new-news-label' htmlFor="自介">內文 :</label>
                        <textarea
                            className='new-news-textarea'
                            value={values.description}
                            onChange={handleInputChange}
                            name="description" id="description" rows="10" />
                    </div>
                    <div>
                        <label className='new-news-label' htmlFor="new_url">連結 :</label>
                        <input
                            className='new-news-input'
                            value={values.url}
                            onChange={handleInputChange}
                            type="text"
                            name="url" />
                    </div>

                    <div className='new-news-input'>
                        <FileBase64
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setValues({ ...values, image: base64 })}
                        />
                        <button className='new-news-button' onClick={bulletinUpdateSubmitHandler}>提交表單</button>
                    </div>

                </section>
            </div>
        </main>
    );
};

export default UpdateProduct;
