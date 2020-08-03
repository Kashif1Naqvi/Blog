import React, { Component } from 'react'
import {withRouter  } from 'react-router-dom'
import TechnologyList from './TechnologyList';
import {Api} from '../../Api'
class Technologies extends Component {
  constructor(props){
    super(props)
    this.state = {
      technologies:[],
    } 
  }

  async componentDidMount(){
    let response = await fetch(`${Api()}/technologies`,{
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
      technologies : data.data
    })
  }

  

  handleFullData = (data) => {
    this.setState({
      fulldata: data
    })
  }
  
  create = () => {
    this.props.history.push('/create_technologies')
  }
  render() {
    console.log(Api())
    let technologyList = this.state.technologies &&  this.state.technologies.map((tech)=>{ return <TechnologyList  {...tech} key={tech.id}  />})
    return   (
      <div className="container-fluid pt-5 mt-5 " >
          { localStorage.token === undefined ? "" : <button onClick={this.create} className="btn btn-outline-primary float-right ">Create post</button>}
          { this.props.location.state === 1 ? <button className="btn btn-outline-primary float-right ">User</button>:"" }
          { this.props.location.state === 2 ? <button className="btn btn-outline-primary float-right ">Admin</button>:""  }
          <div className="row"> {technologyList} </div>
      </div>
    )
  }
}
export default  withRouter(Technologies)
