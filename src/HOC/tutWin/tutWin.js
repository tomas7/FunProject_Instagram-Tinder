import React, { Component } from 'react'
import myClassSass from './tutWin.module.scss'
import videoTut1 from '../../Image/Video/Tut1.mp4'
// import videoTut2 from '../../Image/Video/Tut2.mp4'
import replayI from '../../Image/Icons/replay-arrow.png'
import {Transition, TransitionGroup, CSSTransition} from 'react-transition-group'
import canceI from '../../Image/Icons/close-button.png'

export class tutWin extends Component {
    constructor(props){
        super(props)
        this.state = {
            tut1: false,
            allTutDone: true
        }
    }


    callTutorial = (num) => {
        console.log(num)
        setTimeout(() => {
           this.setState({
                    tut1: true,
                    // allTutDone: true
                })

            if (num === 1) {

                this.props.firstAnimActive(true)

            }else if (num === 2) {
                console.log("having second anim !" + num)
                this.props.nextHandler()
            }

            // this.curVid.currentTime = '0';

            setTimeout(()=> {
                console.log("popup showed")
                this.setState({
                    tut1: false
                })
                if (num === 1) {
                    this.props.firstAnimActive(false)
                    setTimeout(()=> {
                        this.props.tut1State(true)
                    },2000)
                }else if (num === 2) {

                    // this.props.secondAnimActive(false)
                    // this.props.tut1State(true)
                    this.setState({
                        allTutDone: false
                    })
                    this.props.tut2State(true)
               
                }


            },this.props.animLength)
            //time to start tutorial
         }, 1000)
    }

    curVid = null
    componentDidMount() {
        this.curVid = document.getElementById('gifClip');


        if (this.props.firstTutDone) {
            this.callTutorial(2)
        }else {
            console.log("TUT win || mounted")

            this.callTutorial(1)
        }
      

    }


    componentWillUnmount() {
        this.curVid = null
    }


    componentDidUpdate(prevProps) {
        // console.log(prevProps)
        // console.log(prevProps.firstTutDone)
        // console.log(this.props.firstTutDone)
        // if (prevProps.firstTutDone !== this.props.firstTutDone) {
        //   console.log("I update||tutWin")


        // }
      }


    replayHandler = () => {
        console.log(this.curVid)
        console.log("hey")

        this.curVid.setAttribute("src", this.props.videoTut)
    }



    render() {
        let currentStep= 1

        if (this.props.firstTutDone) {
            currentStep = 2
        }
        let backdrop =    null
        if (this.state.tut1) {
            backdrop =    <div className={myClassSass.backDrop}> </div>
        }else {
            backdrop =    null
        }
        return (
         <>

          <div className={this.state.tut1 ? myClassSass.backDrop : myClassSass.noBackDrop}>
          <div className={myClassSass.canceltutStyle} onClick={() => this.props.cancelTut()} >

            <p onClick={() => this.props.cancelTut()} >SKIP TUTORIAL</p>
            <img src={canceI} />

          </div>
          <p className={myClassSass.tutTextH}>{`TUTORIAL STEPS: ${currentStep}/2`}

          </p>

           </div>


            <CSSTransition
            in={this.state.tut1}
            timeout={1000}
            classNames="tutAnim"
            >
            <>
               <div className={myClassSass.contentWrapper}>
                <div className={myClassSass.tutWinWrapper_}>
                    <img id="gifClip"  className={myClassSass.gifi} src={this.props.videoTut} alt="Empty"/>
                    <img src={replayI} className={myClassSass.tutWinWrapperRepI} onClick={() => this.replayHandler()}/>
                </div>
                </div>
            </>
            </CSSTransition>


         </>



        )
    }
}

export default tutWin
// this.state.tut1 ? myClassSass.tutWinWrapper :