
import React, { Component } from 'react'
import {withRouter } from 'react-router-dom'
import {Api} from '../../Api'
class EditTech extends Component {
  constructor(props){
    super(props)
    this.state = {
      title:this.props.location.state.title,
      author:this.props.location.state.author,
      description:this.props.location.state.description,
      avatar:this.props.location.state.avatar,
      id:props.match.params.id,
      msg:""
    }
  }
  
  handleImage = (e) => {
    this.setState({
      avatar: e.target.files[0]
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value,
    })
  }
  handleSubmit = async  (e) => {
    e.preventDefault()

    let data = new FormData()

    data.append('title',this.state.title)
    data.append('author',this.state.author)
    data.append('description',this.state.description)
    data.append('avatar',this.state.avatar)

    let id = this.state.id 
    let response = await fetch(`${Api()}/technologies/${id}`,{
      method:"PUT",
      credentials:"same-origin",
      mode:"cors",
      headers:{
          "Access-Control-Allow-Origin":"*",
          "Authorization":localStorage.token
      },
      body:data
    })
    let result = await response.json()
    console.log("result is",result)
    if(response.status===200){
      this.setState({
          msg:result,
          title:"",
          author:"",
          description:"",
          avatar : ""
      })
    }
  }
  render() {
    console.log("avatar", this.state.avatar)
    return (
      <div className="container pt-5 mt-5" >
        <div className="row" >
          <div className="col  col-sm-8 col-md-8 col-lg-8 col-xl-8 offset-3">
            <h1 className="display-4 text-center " >Edit post</h1>
            <form className="form-horizontal" onSubmit={this.handleSubmit} >
            <div className="form-group">
                <label htmlFor="title">News Id</label>
                <p className="form-control" >{this.state.id}</p>
              </div> 
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" required onChange={this.handleChange} name="title" value={this.state.title} className="form-control"/>
              </div>  
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input type="text" required onChange={this.handleChange} name="author"  value={this.state.author} className="form-control"/>
              </div>  
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea type="text" required style={{resize:"none"}} cols="10" rows="10" name="description" value={this.state.description} onChange={this.handleChange} className="form-control"></textarea>
              </div>  
              <div className="form-group">
                <label htmlFor="avatar">Upload Image</label>
                <input type="file" onChange={this.handleImage} name="avatar"   className="form-control" />
                </div>
              <input  className="btn btn-outline-info btn-lg"  type="submit" value="Update" />
            </form>  
            { this.state.msg ? <p className="alert alert-success">{this.state.msg}</p> : "" }
          </div>
        </div>
        <a href={`/technologies/${this.state.id}`} className="btn btn-outline-info btn-lg float-right">Back to the posts</a>
      </div>         
    )
  }
}

export default  withRouter(EditTech)