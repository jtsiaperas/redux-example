import React, {Component} from 'react'
import {connect} from 'react-redux'
import Fragment from '../../../utils/Fragment'
import {validation} from '../../../utils/Validation'
// import Spinner from '../../Spinner/Spinner'
import * as actions from '../../../store/actions/index'
import './Signup.css'
import vid from '../../Background/bc.mp4'

class Signup extends Component {

  constructor(){
    super();
    this.state = {
      email: {
        value: '',
        valid: null
      },
      password: {
        value: '',
        valid: null
      },
      name: {
        value: '',
        valid: null
      },
      phone: {
        value: '',
        valid: null
      },
      address: {
        value: '',
        valid: null
      },
      city: {
        value: '',
        valid: null
      },
      state: {
        value: '',
        valid: null
      },
      zip: {
        value: '',
        valid: null
      },
      country: {
        value: '',
        valid: null
      },
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e, input){
    const updatedState = this.state
    const toBeUpdated = updatedState[input]
    toBeUpdated.value = e.target.value
    toBeUpdated.valid = validation(input, toBeUpdated.value)
    this.setState({[this.state]: updatedState})
  }
  componentDidMount(){
    console.log("this.props.history")
    console.log(this.props.history)
  }

  btnEnable(value){
    const checkifTrue = (val) => val === true 
    const valuet = value.splice(0,2)
      return !valuet.every(checkifTrue)
  }

  onSubmit(e){
    e.preventDefault(); 
    this.props.onloading()
    const newUser = {
      email: this.state.email.value.toLowerCase(),
      password: this.state.password.value,
      name: this.state.name.value,
      associatedemail: this.state.email.value.toLowerCase(),
      phone: this.state.phone.value,
      address: this.state.address.value,
      city: this.state.city.value,
      state: this.state.state.value,
      zip: this.state.zip.value,
      country: this.state.country.value,
    }
    this.props.registerUser(newUser, this.props.history)
  }

  render() {

  let authRedirect = null
  if(this.props.isAuthenticated){
    this.props.history.push('/userprofile')
  }
    let btnDisable = []
    for(let i in this.state){
      btnDisable.push(this.state[i].valid)
    }

let signup = <div className="row">
        <div dangerouslySetInnerHTML={{ __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          src="${vid}"
          class="VideostyleBanner2"
        />,
      ` }}></div>
              <div className="col-sm-4 offset-sm-4 Signup">
                <form onSubmit={(e)=>this.onSubmit(e)}>
                  <div className="form-group">
                    <h5>Signup
                      <small className="form-text text-muted">
                        {this.props.mesg ? this.props.mesg : ''}
                      </small>
                    </h5>
                    <div className="form-group">
                    <input 
                      type="name" 
                      name="name"
                      className="form-control" 
                      placeholder="Name"
                      value={this.state.name.value}
                      onChange={(e)=>this.onChange(e, 'name')} />
                    <small className="form-text text-muted">
                      {this.state.name.valid === false ? 'Please enter a valid name' : null}
                      </small>
                  </div>
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






                  <div className="form-group">
                    <input 
                      type="phone" 
                      name="phone"
                      className="form-control" 
                      placeholder="Phone"
                      value={this.state.phone.value}
                      onChange={(e)=>this.onChange(e, 'phone')} />
                  </div>
                  <div className="form-group">
                    <input 
                      type="address" 
                      name="address"
                      className="form-control" 
                      placeholder="Address"
                      value={this.state.address.value}
                      onChange={(e)=>this.onChange(e, 'address')} />
                  </div>
                  <div className="form-group">
                    <input 
                      type="city" 
                      name="city"
                      className="form-control" 
                      placeholder="City"
                      value={this.state.city.value}
                      onChange={(e)=>this.onChange(e, 'city')} />
                  </div>
                  <div className="form-group">
                    <input 
                      type="state" 
                      name="state"
                      className="form-control" 
                      placeholder="State"
                      value={this.state.state.value}
                      onChange={(e)=>this.onChange(e, 'state')} />
                  </div>
                  <div className="form-group">
                    <input 
                      type="zip" 
                      name="zip"
                      className="form-control" 
                      placeholder="Zip Code"
                      value={this.state.zip.value}
                      onChange={(e)=>this.onChange(e, 'zip')} />
                  </div>
                  <div className="form-group">
                    <input 
                      type="country" 
                      name="country"
                      className="form-control" 
                      placeholder="Coountry"
                      value={this.state.country.value}
                      onChange={(e)=>this.onChange(e, 'country')} />
                  </div>





                  <div className="col text-center">
                    <button 
                      disabled={this.btnEnable(btnDisable)}
                      type="submit" 
                      className="btn btn-primary">Submit</button>
                  </div>
                </form>
              </div>
              <div className="col-sm-4"></div>
            </div>    

    return (
      <Fragment>
        {authRedirect}
        {signup}
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    mesg: state.auth.authMessage.mesg,
    type: state.auth.authMessage.type,
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    registerUser: (userData, history) => { 
      dispatch(actions.registerUser(userData, history))
    },
    onloading: () => {
      dispatch(actions.onloading())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)