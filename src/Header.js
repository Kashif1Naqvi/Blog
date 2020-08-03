import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom' 
class Header extends Component {
  logout = () =>{
      localStorage.clear()
      this.props.history.push('/technologies')
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top ">   
          <Link className="navbar-brand" to="/technologies" >News App</Link> 
          <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation" data-target="#nav" >
            <span className="navbar-toggler-icon " ></span>
          </button>
          <div className="collapse navbar-collapse" id="nav" >
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <Link className="nav-item nav-link"  to="/technologies" >Technologies</Link>
              <Link className="nav-item nav-link"  to="/sports">Sports</Link>
              <Link className="nav-item nav-link"  to="/national" >Nationals</Link>
              <Link className="nav-item nav-link"  to="/international" >International</Link>
            </ul>
              <div className="float-right offset-7" >
              {localStorage.role === '1'  ? <button className="btn btn-outline-primary mr-2 pr-2">User</button> : "" }
              {localStorage.role === '2' ? <button className="btn btn-outline-primary mr-2 pr-2">Admin</button> : "" }
              {
                localStorage.token === undefined ? <Link className="btn btn-outline-primary mr-2 pr-2"  to="/" >Login</Link> :<button className="btn btn-outline-danger" onClick={this.logout} >Logout</button>
              }
              </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default withRouter(Header)