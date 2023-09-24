import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../../shared/context/auth-context'


import loadingImg from '../../../picture/loading.gif'

import './ProductDetail.css'

const ProductDetail = () => {
    const auth = useContext(AuthContext);
    let { productId } = useParams()
    let [productData, setProductData] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const API_URL = `http://localhost:8080/product/`

    useEffect(() => {
        setIsLoading(true)
        axios.get(API_URL + productId)
            .then((result) => {
                setProductData(result.data)
                setIsLoading(false)
            }).catch((err) => {
                console.log(err)
                setIsLoading(false)
            });

    }, [API_URL, productId])



    const productDeletedHanlder = (id) => {
        axios.delete(API_URL + id)
            .then(() => {
                console.log('delete success')
                navigate('/product/list')
            }).catch((error) => {
                console.log(error)
            })
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
        <div >
            {!isLoading && productData &&
                <div>
                    <div className='detail-main'>
                        <section className='left-half'>
                            <img className='detail-img' src={productData.image} alt='' />
                        </section>
                        <section className='right-half'>
                            <div className='right-title'>
                                {productData.name}
                                <div className='link-top'></div>
                            </div>
                            <pre className='right-desciption'>
                                {productData.description}
                            </pre>

                            <section className='right-price'>
                                <div className='link-top'></div>
                                <p className='price'>${productData.price}</p>
                            </section>
                        </section>

                    </div>
                    {!!auth.token &&
                        <div className='fixed-edit'>
                            <Link to={`/product/update/${productData._id}`}><button className='product-button'>編輯</button></Link>
                            <button onClick={() => productDeletedHanlder(productData._id)} className='product-button'>刪除</button>
                        </div>}

                </div>
            }
        </div>
    )
}

export default ProductDetail