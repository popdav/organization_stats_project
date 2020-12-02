import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class Project extends React.Component {
  

  render() {
    return (
    <div className="card">
        <div className="card-body">
          Name: {this.props.element.name} <br/>
          City: {this.props.element.city} <br/>
          Street: {this.props.element.street} <br/>
          Country: {this.props.element.country} <br/>
          Deleted: {this.props.element.deleted ? 'yes' : 'no'} <br/>
          Package: {this.props.element.package} <br/>
          Paid: {this.props.element.paid ? 'yes' : 'no'} <br/>
        </div>
      </div>
    )
  }
}

export default Project;
