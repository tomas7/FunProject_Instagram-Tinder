import React from 'react'
import myClassSass from './InfoBar.module.scss'
import likeI from '../../../../Image/Icons/like_icons.png'
import commentI from '../../../../Image/Icons/comment_icons.png'
import shareI from '../../../../Image/Icons/share_icons.png'
import bookmarkI from '../../../../Image/Icons/bookmark_icons.png'

function InfoBar(props) {
    return (
        <div className={myClassSass.infoBarWrapper}>
            <div className={myClassSass.infoBarIconWrapper}>
                <img src={likeI} alt="Blank"/>
                <img src={commentI} alt="Blank"/>
                <img src={shareI} alt="Blank"/>
                <img className={myClassSass.infoBarBookmarkI} src={bookmarkI} alt="Blank"/>
            </div>
            <div>
                <p><b>{props.likes} Likes</b></p>
                <p><b>Tomas Haverla</b> {props.mainText}</p>
                <p className={myClassSass.infoBarViewText}>{props.comments} Comments</p>
                <p className={myClassSass.infoBarTimeText}>{props.daysAgo}</p>
            </div>

        </div>
    )
}

export default InfoBar
