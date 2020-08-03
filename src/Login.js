import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email:"",
      password:"",
      error:""
    }
	}
	
  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
		})
  }
  
  handleSubmit = async (e) => {
    e.preventDefault()
    let formData = {
      email:this.state.email,
      password:this.state.password
    }
    let response =await fetch(`${process.env.REACT_APP_BASE_URL }/api/sign_in`,{
      method:'POST',
      mode:"cors",
      cache:"no-cache",
      credentials:'same-origin',
      headers:{
        'Content-Type':'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body:JSON.stringify(formData)
    })
    
    let data = await response.json() 
    let token  = data.token
    if(response.status === 200){
      let role = data.user.role
      localStorage.setItem("token",token)
      localStorage.setItem("role",role)
      this.props.history.push('/technologies')
    }else{
      this.setState({
        error : data.error
      })
    }
  }
  
  render() {
		return (
			<div className="pt-5 mt-5" >
				<div className="row">
					<div className="col  col-sm-7 col-md-7 col-lg-7 col-xl-7 offset-3" >
						<form  onSubmit={this.handleSubmit} className="form-horizontal p-5 m-5 " >
							<div className="form-group">
									<label htmlFor="email">Email</label>
									<input type="text"  value={this.state.email} onChange={this.handleChange} name="email" className="form-control"  />
							</div>
							<div className="form-group">
									<label htmlFor="password">Password</label>
									<input type="password"  name="password" value={this.state.password} onChange={this.handleChange}  password="password" className="form-control"  />
							</div>
							<p> {this.state.error}</p>
							<input type="submit" value="Login" className="btn btn-outline-primary" />
					  </form>
					</div>
				</div>              
			</div>
		)
	}
}
export default withRouter(Login)