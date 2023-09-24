import React, { useState, useEffect } from 'react';

import './MainHeader.css'

const MainHeader = props => {
    const [moveNav, setMoveNav] = useState('');

    useEffect(() => {
        let lastScrollY = 0;
        window.addEventListener('scroll', function () {
            var st = this.scrollY;
            // 判斷是向上捲動，而且捲軸超過 200px
            if (st < lastScrollY) {
                setMoveNav('');
            } else {
                setMoveNav('hideUp');
            }
            lastScrollY = st;
        });
    }, [])


    return (
        <header  className={`main-header ${moveNav}` }>{props.children}</header>
    )
}

export default MainHeader