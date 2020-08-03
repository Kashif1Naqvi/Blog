import React, { Component } from 'react'
import { withRouter,Link } from 'react-router-dom'
import {Api} from '../../Api'
class CreateInternational extends Component {
  constructor(props){
    super(props)
    this.state = {
      title:"",
      author:"",
      description:"",
      error:null,
      avatar:""
    }
  }
  handleImage = (e) => {      
    this.setState({
      avatar:e.target.files[0]
    });
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  handleSubmit  = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('title',this.state.title)
    formData.append('author',this.state.author)
    formData.append('description',this.state.description)
    formData.append('avatar',this.state.avatar)

    let response = await fetch(`${Api()}/internationals`,{
          
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Authorization": localStorage.token
      },
      body:formData,
      referrer:"no-referrer",
      redirect:"follow"
    })
    if(response.status === 201){
      this.props.history.push("/international")
    }
    if(response.status === 422){
      this.setState({
        error:"something went wrong fill the text fields and try again"
      })
    }
  }
   
  render() {
    return (
      <div className="p-5 m-5" >
        <div className="row" >
          <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 offset-3">
            <form onSubmit={this.handleSubmit} className=" form-horizontal">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text"  onChange={this.handleChange} name="title" value={this.state.title} className="form-control"/>
              </div>  
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input type="text" onChange={this.handleChange} name="author"  value={this.state.author} className="form-control"/>
              </div>  
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea type="text" style={{resize:"none"}} cols="10" rows="10" name="description" value={this.state.description} onChange={this.handleChange} className="form-control"></textarea>
              </div>  
              <div className="form-group  ">
                <label htmlFor="upload">Upload your file</label>
                  <input type="file"  name="avatar" className="form-control"  onChange={this.handleImage}  />
              </div>  
              <div className="pt-2 mt-2 pb-2 mb-2" >
                { !this.state.error ? "" : <span className="alert alert-danger"  >{this.state.error}</span>}
              </div>
              <input type="submit" value="Create" className="btn btn-success btn-lg "/>
              <Link to="/international" className="btn btn-success btn-lg float-right">Go Back</Link>
            </form>
          </div>
        </div>  
      </div>
    )
  }
}
export default withRouter(CreateInternational)