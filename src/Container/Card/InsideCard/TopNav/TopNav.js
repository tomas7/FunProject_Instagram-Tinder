import React from 'react'
import myClassSass from './TopNav.module.scss'
import menuI from '../../../../Image/Icons/menu_icons.png'

function TopNav(props) {
    return (
        <div className={myClassSass.TopNavWrapper}>
            <img className={myClassSass.avatarStyle} src={props.avatar} alt="Blank"/>
            <p><b>Tomas Haverla</b></p>
            <img className={myClassSass.menuIStyle} src={menuI} alt="Blank"/>
        </div>
    )
}

export default TopNav
