import React, { Component } from 'react'
import {Link ,withRouter } from 'react-router-dom'
import {Api} from '../../Api'

class NationalItems extends Component {
  constructor(props){
    super(props)
    this.state = {
      show :false,
      items:{},
      id:props.match.params.id,
    }
  }  

  DeletePost = async () => {
    let id = this.state.id
    let response = await fetch(`${Api()}/nationals/${id}`,{
      method:"DELETE",
      credentials:"same-origin",
      mode:"cors",
      headers:{
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin":"*",
        "Authorization": localStorage.token
      },
      referrer:"no-referrer",
      redirect:"follow"
    })
    if(response.status === 204){
      this.props.history.push('/national')
    }
    return response
  }

  async componentDidMount(){
    let id = this.state.id
    let response = await fetch(`${Api()}/nationals/${id}`,{
      method:"GET",
      credentials:"same-origin",
      mode:"cors",
      headers:{
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin":"*",
        "Authorization": localStorage.token
      },
      referrer:"no-referrer",
      redirect:"follow"
    })
    let data = await response.json()
    if(response.status === 200){
      this.setState({
        items : data.data
      })
    }else{
      alert("Something went wrong")
    }
    
    
  }

  edit = () => {
    this.props.history.push({
      pathname : `/editNational/${this.state.id}`,
      state :{
        title : this.state.items.title,
        author : this.state.items.author,
        description : this.state.items.description,
        avatar : this.state.items.avatar,
      }
    })
  }

  render() {
    
    let  { title,author ,description,avatar} = this.state.items
    return (
      <div className="container mt-5 pt-5 mb-3 pb-3 ">
        <div className="row">
          <div className="col  col-sm-2 col-md-2 col-lg-2 col-md-2 ">
            <Link className="btn btn-outline-danger"  to="/national">Back</Link>
          </div>
          <div className="col col-sm-10 col-md-10 col-lg-10 col-md-10   ">
          <h2 className="text-center display-5 text-info mt-4 pt-4 pb-4 mb-4 " >{title}</h2>
              <div className="center float-right ">
                <img className="img-thumbnail  "  src={avatar}  alt={avatar}/>
              </div>
              <div className="flaot-left mb-5 pb-5" > 
                <h4 className="mt-2 pt-2  pb-2 mb-2" >Author:</h4> <i className="text-info ml-5 " >{author}</i>
                <h4 className="mt-2 pt-2 pb-2 mb-2" >Description:</h4>  <i className="text-info ml-5" >{description}</i>
              </div>
            { localStorage.token  ===  undefined || localStorage.role === '1' ? "" :<button className="btn btn-outline-danger" onClick={this.DeletePost} > Delete Post</button> }
            { localStorage.token  ===  undefined ? " ":<button onClick={this.edit} className="btn btn-outline-primary float-right ">Edit Post </button> }
          </div>
        </div>
      </div>
    )
  }
}

export default  withRouter(NationalItems)