import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
class TechnologyList extends Component {
  render() {
    let { title,avatar} = this.props;
    return (
      <div className="col col-sm-3 col-md-3 col-lg-3 col-xl-3">
        <div className="card-group mt-4 ">
          <div className="card">
            <img className="card-img-top img-thumbnail img-fluid"  src={avatar} alt={avatar}/>
            <div className="card-body">
              <h5 className="card-title text-info text-center " >{title}</h5>
            </div>
            <div className="card-footer">
                <Link className="btn btn-outline-info float-right  " to={`${this.props.history.location.pathname}/${this.props.id}`} >See more</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(TechnologyList)