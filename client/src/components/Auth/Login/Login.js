import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Fragment from '../../../utils/Fragment'
import {validation} from '../../../utils/Validation'
// import Spinner from '../../Spinner/Spinner'
import * as actions from '../../../store/actions/index'
import './Login.css'
import vid from '../../Background/bc.mp4'

class Login extends Component {

  constructor(){
    super();
    this.state = {
      email: {
        value: '',
        validbtn: null
      },
      password: {
        value: '',
        validbtn: null
      }
    }
    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

   onChange(e, input){
    const updatedState = this.state
    const toBeUpdated = updatedState[input]
    toBeUpdated.value = e.target.value
    toBeUpdated.validbtn = validation(input, toBeUpdated.value)
    this.setState({[this.state]: updatedState})
  }

  btnEnable(value) {
    const checkifTrue = (val) => val === true
    const valuet = value.splice(0, 2)
    return !valuet.every(checkifTrue)
  }

  onLogin(e){
    e.preventDefault(); 
    this.props.onloading()
    const newUser = {
      email: this.state.email.value.toLowerCase(),
      password: this.state.password.value
    }
    this.props.loginUser(newUser, this.props.history)

  }
  
  
  
  render() {
    
  let authRedirect = null
  if(this.props.isAuthenticated){
    this.props.history.push('/userprofile')
  }

  let btnDisable = []
    for(let i in this.state){ btnDisable.push(this.state[i].validbtn) }
let login=<div className="row"> 

        <div dangerouslySetInnerHTML={{ __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          src="${vid}"
          class="VideostyleBanner3"
        />,
      ` }}></div>
            <div className="col-sm-4 offset-sm-4 Login">
              <form onSubmit={(e)=>this.onLogin(e)}>
                <div className="form-group">
                  <h5>Account Information
                    <small className={'form-text text-'+this.props.type}>
                      {this.props.mesg ? this.props.mesg : ''}
                    </small>
                  </h5>
                  <input 
                    type="email" 
                    name="email"
                    className="form-control" 
                    placeholder="Email"
                    value={this.state.email.value}
                    onChange={(e)=>this.onChange(e, 'email')} />
                  <small className="form-text text-muted">
                    {this.state.email.valid === false ? 'Please enter a valid email' : null}
                  </small>
                </div>
                <div className="form-group">
   
                  <input 
                    type="password" 
                    name="password"
                    className="form-control" 
                    placeholder="Password"
                    value={this.state.password.value}
                    onChange={(e)=>this.onChange(e, 'password')} />
                  <small className="form-text text-muted">
                    {this.state.password.valid === false ? 'Password must be alphanumeric and atleast 6 characters!' : null}
                    </small>
                </div>
                <div className="col text-center">
                  <button 
                    disabled={this.btnEnable(btnDisable)}
                    type="submit" 
                    className="btn btn-primary">Login</button>
                         <div className="nav-item">
          <Link 
            className="nav-link" 
            to='/forgotpassword'>
            <i className="fas fa-user-lock fa-sm"></i> Forgot Password?</Link>
        </div>
        <div className="nav-item">
          <Link 
            className="nav-link" 
            to='/signup'>
            <i className="fas fa-user-edit fa-sm"></i> Sign Up</Link>
        </div>
                </div>
              </form>
            </div>
              <div className="col-sm-4"></div>
          </div>  

  // login = this.props.loading ? <Spinner /> : login

    return (
      <Fragment>
        {authRedirect}
        {login}
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    mesg: state.auth.authMessage.mesg,
    type: state.auth.authMessage.type,
    loading: state.auth.loading,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginUser: (userData, history) => { dispatch(actions.loginUser(userData, history)) },
    onloading: () => {
      dispatch(actions.onloading())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)

const vido = {
  position:"absolute",
  width:"100%",
  left:"50%",
  height:"1370px",
  objectFit:"cover",
  transform:"translate(-50%, -50%)",
  zIndex:"-1"
}