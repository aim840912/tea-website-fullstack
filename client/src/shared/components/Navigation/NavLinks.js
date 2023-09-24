import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css'

const NavLinks = props => {
    const auth = useContext(AuthContext);


    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/">
                     關於
                </NavLink>
            </li>
            <li>
                <NavLink to="/product/list">
                    產品
                </NavLink>
            </li>

            <li>
                <NavLink to="/bulletin/list">
                    公告
                </NavLink>
            </li>
            <li>
                <NavLink to="/contact/new">
                    聯絡
                </NavLink>
            </li>
            {/* <li>
                <NavLink to="/feedback">
                    發問
                </NavLink>
            </li> */}
            {!!auth.token &&
                <li className="nav__menu-item">
                    <NavLink to="/">更多</NavLink>
                    <ul className="nav__submenu">
                        <li className="nav__submenu-item ">
                            <NavLink to="/contact/list" >聯絡資訊</NavLink>
                        </li>
                        <li className="nav__submenu-item ">
                            <NavLink to="/product/new">新增產品</NavLink>
                        </li>
                        <li className="nav__submenu-item ">
                            <NavLink to="/bulletin/new">新增公告</NavLink>
                        </li>
                    </ul>
                </li>
            }
            <li className='login-li'>
                {auth.token ?
                    <button className='login-li-btn' onClick={auth.logout}>登出</button>
                    :
                    <NavLink to="/login">
                        登入
                    </NavLink>
                }
            </li>
        </ul>
    )
}

export default NavLinks