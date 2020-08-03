import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import SportList from './SportList'
import {Api} from '../../Api'
class Sport extends Component {
  constructor(props){
    super(props)
    this.state = {
      sports:[],
    }
  }

  async componentDidMount(){
    let response = await fetch(`${Api()}/sports`,{
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
      sports : data.data
    })  
  }
  
  create = () => {
    this.props.history.push("/create_sports")
  }
  
  handleSport = (sport) => {
    this.setState({
      sportObj : sport
    })
  }

  render() {
    let sportsList =this.state.sports &&  this.state.sports.map((sport)=>{ return <SportList {...sport}  key={sport.id}  />})
    return (
      <div className="container-fluid pt-5 mt-5" > 
          {localStorage.token === undefined ? "" : <button onClick={this.create} className="btn btn-outline-primary float-right ">Create post</button>}
          <div className="row"> {sportsList} </div>
      </div>
    )
  }
}
export default withRouter(Sport)