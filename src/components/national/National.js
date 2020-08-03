import React, { Component } from 'react'
import NationalList from './NationalList'
import { withRouter } from 'react-router-dom'
import {Api} from '../../Api'

class National extends Component {
  constructor(props){
    super(props)
    this.state = {
      nationals:[],
      nationalObj:{}
    }
  }

  handleNationalPost = (post) => {
    this.setState({
      nationalObj : post
    })
  }

  create = () => {
    this.props.history.push("/create_national")
  }
  
  async componentDidMount(){
    let response = await fetch(`${Api()}/nationals`,{
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
        nationals : data.data
      })  
    }
  render() {
    let nationalList =this.state.nationals && this.state.nationals.map((national)=>{ return <NationalList {...national}  key={national.id}  />})
    return (
      <div className="container-fluid mt-5 pt-5" > 
        { localStorage.token === undefined ? "" : <button onClick={this.create} className="btn btn-outline-primary float-right ">Create post</button>}
        <div className="row"> {nationalList} </div>
      </div>
    )
  }
}
export default withRouter(National)