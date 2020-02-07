import React, { Component } from 'react'
import Child from './Component/Layout/Layout'
import image from './Web.mp4'

export class Parent extends Component {
    constructor(props){
        super(props) 
        this.state = {
            value: 1
        }
    }

    componentDidMount() {
        console.log("Parent| I have mounted")
    }
   
    componentDidUpdate() {
        console.log("Parent| I have updated")
        console.log(this.state.value)
    }


  
    render() {
        return (
            <div className="mainWrapper">
                <Child/>
            </div>
        )
    }
}

export default Parent
