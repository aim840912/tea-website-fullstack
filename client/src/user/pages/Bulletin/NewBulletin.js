import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios'
import FileBase64 from 'react-file-base64';

import MainTitle from '../../../shared/components/Title/MainTitle'

import './NewBulletin.css'

const initialValues = {
    main: false,
    title: "",
    image: "",
    description: "",
    url: ""
};

const NewBulletin = () => {

    const API_URL = 'http://localhost:8080/bulletin/new'

    const [values, setValues] = useState(initialValues);
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

    const postNewbulletin = () => {
        axios.post(
            API_URL,
            {
                main: values.main,
                title: values.title,
                image: values.image,
                description: values.description,
                url: values.url,
            }
        )
            .then(() => {
                window.alert("Your bulletin has been added.");
                navigate('/bulletin/list')
            })
            .catch((error) => {
                console.log(error)
            });
    };
    return (
        <main >
            <MainTitle title="新增公告" />
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
                        <button className='new-news-button' onClick={postNewbulletin}>提交表單</button>
                    </div>

                </section>
            </div>

        </main>
    )
}

export default NewBulletin