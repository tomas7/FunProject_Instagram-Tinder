import React from 'react'
import mySassClass from './Body.module.scss'

function Body(props) {
    return (
        <div className={mySassClass.bodyWrapperBody}>
            <img src={props.bodyPhoto} alt="Blank"/>
        </div>
    )
}

export default Body
