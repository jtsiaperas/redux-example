import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as action from '../../store/actions/index'
import Fragment from '../../utils/Fragment'
import './Navbar.css'

class Navbar extends Component {
  
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser()
  }


  eventSwitch = () => {
    this.props.dashboards.switchEvent = false
   }

  render(){

    const needAuthentication = 
      <Fragment>
        <li className="nav-item">
          <Link 
            className="nav-link" 
            to='/signup'>
            <i className="fas fa-user-edit fa-sm"></i> Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to='/login'>
            <i className="fas fa-sign-in-alt fa-sm"></i> Login</Link>
        </li>
      </Fragment>
    
    const guestAuthenticated = 
      <Fragment>
        <li className="nav-item">
          <Link
            className="nav-link"
            to='/userprofile'>
            <i className="fas fa-user fa-sm"></i> Profile</Link>
        </li>
      <li className="nav-item">
        <Link 
          to="/"
          onClick={(e)=>this.onLogout(e)}
          className="nav-link">
        <i className="fas fa-user fa-sm"></i> Logout</Link>
      </li>


      </Fragment>



    return (
      <Fragment>
      <div className="NavHeader">
          {/* <div className=""> */}
            <div className="Header">
            <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark NavBk">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link 
                    className="navbar-brand" 
                    to='/'>M1 Interactive Test</Link>
                </div>
                <div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="nav navbar-nav navbar-right">
                  {this.props.isAuthenticated? guestAuthenticated : needAuthentication}
                </ul>
                </div>
              </div>
              </div>
            </nav>
        </div>
      </div>
    </Fragment>
  )}
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    dashboards: state.dashboard,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => {dispatch(action.logoutUser())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)