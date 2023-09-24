import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';


import Card from '../../../shared/components/UIElements/Card'
import MainTitle from '../../../shared/components/Title/MainTitle'

import './ProductList.css'
import loadingImg from '../../../picture/loading.gif'

const API_URL = 'http://localhost:8080/product'


const ProductList = () => {
    const [isLoading, setIsLoading] = useState(false);
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


    return (
        <div>
            <MainTitle title="產品" />
            {!isLoading ?
                <div className='productlist-div'>
                    {productData && productData.map((data) => (
                        <Card key={uuidv4()} data={data} />
                    ))}
                </div>
                :
                <div className="loading-container">
                    <img className="loading-img" src={loadingImg} alt='' />
                </div>}
        </div>
    )
}

export default ProductList