
import React, { Component } from 'react'
import {Api} from '../../Api'
class EditInterNational extends Component {
  constructor(props){
    super(props)
    this.state = {
      title:this.props.location.state.title,
      author:this.props.location.state.author ,
      description:this.props.location.state.description,
      avatar : this.props.location.state.avatar,
      id: props.match.params.id ,
      msg:""
    }
  }
  handleShow = () => {
    this.setState({
      show:true
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value,
    })
  }

  handleImage = e => {
    this.setState({
      avatar : e.target.files[0]
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

    let response = await fetch(`${Api()}/internationals/${id}`,{
      method:"PUT",
      credentials:"same-origin",
      mode:"cors",
      headers:{
        "Access-Control-Allow-Origin":"*",
        "Authorization":localStorage.token
      },
      body:data
    })
    let msg = await response.json()
    if(response.status===200){
      this.setState({
        title:"",
        author:"",
        description:"",
        msg:msg
      })
    }
    return response
  }
  render() {
    return (
      <div className="container pt-5 mt-5" >
        <div className="row" >
          <div className="col  col-sm-8 col-md-8 col-lg-8 col-xl-8 offset-3">
            <h1 className="display-4 text-center " >Edit post</h1>
            <form className="form-horizontal" onSubmit={this.handleSubmit} >
              <div className="form-group">
                <label htmlFor="id" className="text-info"  >International ID</label>
                <p className="form-control">{this.state.id}</p>
              </div>  
              <div className="form-group">
                <label htmlFor="title" className="text-info">Title</label>
                <input type="text" required onChange={this.handleChange} name="title" value={this.state.title} className="form-control"/>
              </div>  
              <div className="form-group">
                <label htmlFor="author" className="text-info">Author</label>
                <input type="text" required onChange={this.handleChange} name="author"  value={this.state.author} className="form-control"/>
              </div>  
              <div className="form-group">
                <label htmlFor="description" className="text-info">Description</label>
                <textarea type="text" required style={{resize:"none"}} cols="10" rows="10" name="description" value={this.state.description} onChange={this.handleChange} className="form-control"></textarea>
              </div>  
              <div className="form-group">
                <label className="text-info" htmlFor="upload">Upload your file</label>
                <input type="file"   className="form-control"  name="avatar" onChange={this.handleImage}  />
              </div>  
              <button  className="btn btn-outline-info btn-lg"  type="submit">Update</button>
              <a href={`/international/${this.state.id}`} className="btn btn-outline-info btn-lg float-right " >Back to the posts</a>
              { this.state.msg ? <p className="alert alert-success">{this.state.msg}</p> : "" }
            </form>  
          </div>
        </div>
      </div>
    )
  }
}

export default  EditInterNational