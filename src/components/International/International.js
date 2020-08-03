import React, { Component } from 'react'
import InterNationalList from './InterNationalList'
import { withRouter } from 'react-router-dom'
import {Api } from '../../Api'
class International extends Component {
  constructor(props){
    super(props)
    this.state = {
      internationals:[],
    }
  }
  async componentDidMount(){
    
    let response = await fetch(`${Api()}/internationals`,{
      method:'GET',
      mode:"cors",
      credentials:"same-origin",
      cache:"no-cache",
      headers:{
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin":"*",
        "Authorization":  localStorage.token
      },
      redirect:"follow",
      referrer:"no-referrer",
      })        
      let data = await response.json()
      this.setState({
        internationals : data.data
      })  
  }

  handleList = (lists) => {
    this.setState({
      internationallist:lists
    })
  }

  create  = () => {
    this.props.history.push('/create_international')
  }

  render() {
    let interNationalList =this.state.internationals && this.state.internationals.map((international)=>{ return <InterNationalList {...international} key={international.id}   />})
    return (
      <div className="container-fluid pt-5 mt-5" > 
        { localStorage.token === undefined ? "" : <button onClick={this.create} className="btn btn-outline-primary float-right ">Create post</button>}
        <div className="row"> {interNationalList} </div>
      </div>
    )
  }
}
export default withRouter(International)