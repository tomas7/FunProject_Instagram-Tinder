import React from 'react'
import TopNav from './InsideCard/TopNav/TopNav';
import Body from './InsideCard/Body/Body';
import InfoBar from './InsideCard/InfoBar/InfoBar';
import {CSSTransition} from 'react-transition-group'
import classnames from 'classnames'
import mySassClass from './Card.module.scss';


function Card(props) {
    // console.log(props.order)
    // console.log(props.order)
    // let opacityStyle = 1

    // switch (props.order) {
    //     case 1:
    //         opacityStyle = 1
    //         break;
    //     case 2:
    //          opacityStyle = .9
    //         break;
    //     case 3:
    //          opacityStyle = 7.
    //         break;
    //     default:
    //         break;
    // }
// // console.log(props)

    let styleOrder = {
        transform: `scale(1.0${props.order * 3}) translate(-50%, -50%)`,
        zIndex: "-" + props.order,
        transition: "all .5s",

    }

    let bol = true;
 
    let testClass = classnames(mySassClass.testClass, {"test_me": bol, "test__me":!bol})

    let isActive = false
    let overlays = null
    if(props.order === 1){

        if(props.isFirstAnimActive){
            // alert("having second anim")
            overlays = <>
            <div onClick={() => props.nextHandler(true)} className={mySassClass.leftOverlay_anim}></div>
            <div onClick={() => props.nextHandler(false)} className={mySassClass.rightOverlay_anim}></div>
         </>
        }else {
            overlays = <>
            <div onClick={() => props.nextHandler(true)} className={mySassClass.leftOverlay}></div>
            <div onClick={() => props.nextHandler(false)} className={mySassClass.rightOverlay}></div>
         </>
        }
      
    }
    console.log(props)
    if (props.order === 1 && props.isSwipe) {
        console.log("swipping on click")
        // overlays = 
       console.log(props.isSwipe)
        isActive = props.isSwipe

      
    }else {
        isActive = false
        // console.log(props.isSwipe)
    }

    if (props.isSecondAnimActive  && props.order === 1){
        // console.log("swipping from anim")
        // console.log(props.isSwipe)
        isActive = true
    }
    
    return (
      
          
            <CSSTransition
                    in={isActive}
                    appear
                    //if swipe false

                    classNames={props.swipeClass}
                    timeout={props.delay}
            >

                    <div key="{props.order}" style={styleOrder} className={mySassClass.bodyWrapper}>
                    {/* <button className={testClass}>test</button> */}
                        {overlays}
                      
                        <TopNav avatar={props.avatar}/>
                        <Body bodyPhoto={props.bodyImg}/>
                        <InfoBar likes={props.cardTextObj.likes} mainText={props.cardTextObj.mainText} comments={props.cardTextObj.comments} daysAgo={props.cardTextObj.daysAgo}/>
                    </div>
                 
                
            </CSSTransition>
  
    )
}

export default Card
