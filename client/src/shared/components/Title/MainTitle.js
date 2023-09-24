import React from 'react';

import './MainTitle.css'

const MainTitle = (props) => {
    return (
        <div className='title'>
            <p> {props.title}</p>
        </div>
    )
}

export default MainTitle