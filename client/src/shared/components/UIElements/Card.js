import React, { useState } from 'react';
import { Link } from 'react-router-dom'


import './Card.css'

const Card = props => {
    const [title, setTitle] = useState(props.data.name)
    
    const handleChangeTitle = () => {
        setTitle('點選了解詳細資訊')
    }
    const handleChangeLeave = () => {
        setTitle(props.data.name)
    }
    return (

        <div className="card-container">

            <Link className="card_image"
                onMouseEnter={handleChangeTitle}
                onMouseLeave={handleChangeLeave}
                to={`/product/${props.data._id}`}>
                <img src={props.data.image} alt='' />
                <p className="card_title ">{title}</p>
            </Link>


        </div>

    )
}

export default Card