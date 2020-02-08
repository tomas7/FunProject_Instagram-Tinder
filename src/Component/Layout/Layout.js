import React, { Component } from 'react'
import myClassSass from './Layout.module.scss'
import {Transition, TransitionGroup, CSSTransition} from 'react-transition-group'
import Card from '../../Container/Card/Card'
import bodyImg1 from '../../Image/Photo/bodyImg1.jpg'
import bodyImg2 from '../../Image/Photo/bodyImg2.jpg'
import bodyImg3 from '../../Image/Photo/bodyImg3.jpg'
import avatar from '../../Image/Icons/avatar.png'
import TutWin from '../../HOC/tutWin/tutWin'

// // import videoTut1 from '../../Image/Video/Tut1.mp4'
// // import videoTut2 from '../../Image/Video/Tut2.mp4'

import likeI from '../../Image/Icons/like.png'
import disLikeI from '../../Image/Icons/dislike.png'

import videoTut1 from '../../Image/Video/Tut1.gif'
import videoTut2 from '../../Image/Video/Tut2.gif'



export class Layout extends Component {
    constructor(props){
        super(props) 
        this.state = {
            playTut: false,
            posArr: [1, 2, 3],
            swipeStyle: null,
            isSwipe:false,
            firstTutPlayed: false,
            secondTutPlayed: false,
            isFirstAnimActive:false,
            delay: 100,
            liked: false,
            disliked: false
        }
    }

    cardTextObj = [
        {
            likes: 25,
            mainText: "...starting a new project. Find out more bellow...",
            comments: 42,
            daysAgo: "7 days ago"
        },
        {
            likes: 871,
            mainText: "The place where old lives together with new.",
            comments: 112,
            daysAgo: "7 days ago"
        },
        {
            likes: 18.548,
            mainText: "London eye in sun shines",
            comments: 2.578,
            daysAgo: "12 hours ago"
        },
    ]

    array_move = (arr, old_index, new_index) => {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
    }
    
    firstAnimActive = (e) => {
        console.warn(e )
        this.setState({
            isFirstAnimActive: e
        })
    }
 
    calculatePosNext = (e, dir, delay) => {
       
    
        console.log(dir)
        if (dir) {
            console.log("swiping left")
            this.setState({
                swipeStyle: "swipeLeft",
                liked:true
            })
        }else if (!dir){
            console.log("swiping right")
            this.setState({
                swipeStyle: "swipeRight",
                disliked: true
            })
        }
   
    
        //delay until the animation of swipe is delayed
        this.setState({
            isSwipe:true,
            delay:delay,
        })
       
        setTimeout(()=>{
            console.log("waited 2 s: updating")
            let firstSwap = this.array_move(e.posArr, 2, 1)
            let secondSwap = this.array_move(firstSwap, 1, 0)
       
          
            console.log(secondSwap)
            let tmpArr = secondSwap
            this.setState({
                posArr: tmpArr,
                isSwipe:false,
                disliked: false,
                liked: false
            })
            //time until we go back from class in to class out
        },1500 + delay)
    }

    tut1Finsihed = (e) => {
        // alert(e)
        let oldTutState = this.state.firstTutPlayed
        oldTutState = e
   
        this.setState({
            firstTutPlayed: oldTutState
        })
    }
    
    tut2Finsihed = (e, actionDelay = 1500) => {
       

        let oldTutState = this.state.secondTutPlayed
        oldTutState = e
        //all tutorial is finished
        setTimeout(()=> {
            this.setState({
                secondTutPlayed: oldTutState,
                firstTutPlayed: oldTutState
            })
        },actionDelay)
        

    
    }
    nextHandler = (dir, delay = 100) => {
        console.log(delay)
        let oldState = this.state
        this.calculatePosNext(oldState, dir, delay)
    }

    // prevHandler = (dir) => {
    //     let oldState = this.state
    //     this.calculatePosPrev(oldState, dir)
    // }    

    componentDidMount() {
        setTimeout(()=>{
            // First check, if localStorage is supported.
            if (window.localStorage) {
                // Get the expiration date of the previous popup.
                  // Get the expiration date of the previous popup.
                var nextPopup = localStorage.getItem( 'nextNewsletter' );
                if (nextPopup > new Date()) {
                    return;
                }
                if (this.state.playTut) {
                    this.setState({
                        playTut:false
                    })
                }
                // Store the expiration date of the current popup in localStorage.
                var expires = new Date();
                expires = expires.setHours(expires.getHours() + 24 * 7 * 4 * 6);
                localStorage.setItem( 'nextNewsletter', expires );

            }
            if (!this.state.playTut) {
                this.setState({
                    playTut:true
                })
            }
        }, 1000);
    }

    render() {
        console.log(this.state)
        let tutorial = null

        if(this.state.playTut){
            tutorial = 
        <>
            
            <TutWin 
            firstTutDone={false} 
            videoTut={videoTut1} 
            animLength={7200} 
            tut1State={(e) =>this.tut1Finsihed(e)}
            cancelTut={() => this.tut2Finsihed(true, 500)}
            firstAnimActive={(e) => this.firstAnimActive(e)}
            >  
            </TutWin>
        </>
        }

        if (this.state.firstTutPlayed && this.state.playTut) {
            tutorial =<TutWin 
            firstTutDone={true} 
            videoTut={videoTut2} 
            animLength={8000} 
            cancelTut={() => this.tut2Finsihed(true, 500)}
            tut2State={(e) =>this.tut2Finsihed(e)}
            nextHandler={() =>this.nextHandler(true, 3000)} 
            secondAnimActive={(e) => this.secondAnimActive(e)} 
        
            >
            </TutWin>
        }if (this.state.secondTutPlayed){
            tutorial = null
        }
        return (

   
           <>
            
         
           <TransitionGroup
           className="todo-list"
           >
            <CSSTransition
                appear={true}
                in={true}
                classNames="fadeIn"
                timeout={200}
                >
               
             <div>
               
             
                <div className={myClassSass.contentContainer}>
                <div id="t1" className={myClassSass.iconWrapper}>
                    <img  src={disLikeI} className={this.state.liked ? myClassSass.likeIStyle_ :  myClassSass.likeIStyle}/>
                    <img  src={likeI} className={this.state.disliked ? myClassSass.disLikeIStyle_ :  myClassSass.disLikeIStyle} />
                </div>

               
                <Card
                    delay={this.state.delay}
                    isFirstAnimActive = {this.state.isFirstAnimActive}
                    // isSecondAnimActive = {this.state.isSecondAnimActive}
                    nextHandler={(isright) =>this.nextHandler(isright)} 
                    isSwipe={this.state.isSwipe} 
                    swipeClass={this.state.swipeStyle} 
                    bodyImg={bodyImg1} 
                    avatar={avatar} 
                    order={this.state.posArr[0]}
                    cardTextObj={this.cardTextObj[0]}
                    />

                <Card
                    delay={this.state.delay}
                    isFirstAnimActive = {this.state.isFirstAnimActive}
                    // isSecondAnimActive = {this.state.isSecondAnimActive}
                    nextHandler={(isright) =>this.nextHandler(isright)} 
                    isSwipe={this.state.isSwipe} 
                    swipeClass={this.state.swipeStyle} 
                    bodyImg={bodyImg2} 
                    avatar={avatar} 
                    order={this.state.posArr[1]}
                    cardTextObj={this.cardTextObj[1]}
                    />

                <Card
                    delay={this.state.delay}
                    isFirstAnimActive = {this.state.isFirstAnimActive}
                    // isSecondAnimActive = {this.state.isSecondAnimActive}
                    nextHandler={(isright) =>this.nextHandler(isright)} 
                    isSwipe={this.state.isSwipe} 
                    swipeClass={this.state.swipeStyle} 
                    bodyImg={bodyImg3} 
                    avatar={avatar} 
                    order={this.state.posArr[2]}
                    cardTextObj={this.cardTextObj[2]}
                    />
                </div>
                <div className={myClassSass.textFieldWrapper}>
                    <div>
                        <h2 className="test">About this project</h2>
                        <p>A little project I made to test css animations and react transitions.</p>
                        <p>Tutorial will be played on your device only once (first time).</p>
                        <p>For a design I was inspired by Instagram UI and I looked at swiping animation which are close to Tinder (dating app)</p>
                        <p>Please keep in mind this was very a quick project and I didn`t invest much time into responsiveness or performance</p>
                    </div>
                </div>
              
                {tutorial}
               <h1>Unit test</h1>
     
          </div>
            

            </CSSTransition>
            </TransitionGroup>
            {/* <button>next</button>
            <button>previous</button> */}
         
           </>
           
        )
    }
}

export default Layout
