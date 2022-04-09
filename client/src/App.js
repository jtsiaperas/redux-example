import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import setAuthToken from './utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import {logoutUser, setCurrentUser} from './store/actions/index'
import store from './store'
import Fragment from  './utils/Fragment'
import Navbar from './containers/Navbar/Navbar'
import Login from './components/Auth/Login/Login'
import Signup from './components/Auth/Signup/Signup'
import Landing from './components/Landing/Landing'
import './App.css';
import * as action from './store/actions/index'
import PasswordReset from './components/Auth/Reset/PasswordReset'
import PasswordForgot from './components/Auth/Reset/PasswordForgot'
import ResetPassword from './components/Auth/Reset/ResetPassword'
import LatestPassword from './components/Auth/Reset/LatestPassword'
import UserProfilePage from './components/Profile'


if(localStorage.jwtToken){
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login';
  }
}


class App extends Component {
  componentDidMount(){
    this.props.user()   

  }


  render() {
    let routes = (
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={Landing} />
        <Route exact path='/resetPassword:email/:token' component={PasswordReset} />
        <Route exact path='/forgotpassword' component={PasswordForgot} />
        <Route exact path='/resetpassword' component={ResetPassword} />
        <Route exact path='/resetpassword/:token' component={LatestPassword}/>
        <Route exact path='/userprofile' component={UserProfilePage} />
      </Switch>
    )
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route exact path='/' component={Landing} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
    <BrowserRouter>
      <div className="App">
        <Fragment className="Content">
        <Navbar update={this.update} />
          <div>
            {routes}
          </div>
        </Fragment>
      </div>
    </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    user: () => { dispatch(action.getUser()) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);