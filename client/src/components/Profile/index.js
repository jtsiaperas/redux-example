import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import * as action from '../../store/actions/index'
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'

class index extends Component {

  state ={
    addModalShow: false
  }

 handleClick = (evt) => {
    evt.preventDefault()
    return fetch('/cancel-subscription', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json()
      })
  }

putRequest = (urllink) => {

  this.props.updateDashboard(urllink)
}

    render() {
      let authRedirect = null
      if(!this.props.isAuthenticated){
        authRedirect = <Redirect to='/' />
      }
      
        return (
          <div className="container">
            <div className="jumbotron">
              {authRedirect}
              <div style={{textAlign:"center"}}>
              <h1><b>Profile Information</b></h1><br/>
              <img style={{overflow: "hidden", width:"200px", height: "200px", border:"1px solid gray", borderRadius: "70%", }} src ={this.props.user.pic}></img>
              </div>

<div  style={{textAlign:"center", marginTop: "20px"}}>
              <>
      <WidgetLoader />
      <Widget
        sources={['local', 'camera', 'dropbox']} // set the sources available for uploading -> by default
        // all sources are available. More information on their use can be found at
        // https://cloudinary.com/documentation/upload_widget#the_sources_parameter
        sourceKeys={{dropboxAppKey: '1dsf42dl1i2', instagramClientId: 'd7aadf962m'}} // add source keys
        // and ID's as an object. More information on their use can be found at
        // https://cloudinary.com/documentation/upload_widget#the_sources_parameter
        resourceType={'image'} // optionally set with 'auto', 'image', 'video' or 'raw' -> default = 'auto'
        cloudName={'dxun6gsre'} // your cloudinary account cloud name.
        // Located on https://cloudinary.com/console/
        uploadPreset={'oehbwgkv'} // check that an upload preset exists and check mode is signed or unisgned
        buttonText={'Change Profile Picture'} // default 'Upload Files'
        style={{
              color: 'white',
              border: 'none',
              width: '190px',
              backgroundColor: 'green',
              borderRadius: '4px',
              height: '25px'
            }} // inline styling only or style id='cloudinary_upload_button'
        folder={'my_folder'} // set cloudinary folder name to send file
        cropping={true} // set ability to crop images -> default = true
        // https://support.cloudinary.com/hc/en-us/articles/203062071-How-to-crop-images-via-the-Upload-Widget-#:~:text=Click%20on%20the%20%22Edit%22%20link,OK%22%20and%20Save%20the%20changes.
        // more information here on cropping. Coordinates are returned or upload preset needs changing
        multiple={true} // set to false as default. Allows multiple file uploading
        // will only allow 1 file to be uploaded if cropping set to true
        autoClose={false} // will close the widget after success. Default true


        onSuccess={(res)=> this.putRequest(res.info.url)} // add success callback -> returns result
        // onFailure={failureCallBack} // add failure callback -> returns 'response.error' + 'response.result'



        logging={false} // logs will be provided for success and failure messages,
        // set to false for production -> default = true
        customPublicId={'sample'} // set a specific custom public_id.
        // To use the file name as the public_id use 'use_filename={true}' parameter
        eager={'w_400,h_300,c_pad|w_260,h_200,c_crop'} // add eager transformations -> deafult = null
        use_filename={false} // tell Cloudinary to use the original name of the uploaded
        // file as its public ID -> default = true,

        widgetStyles={{
          palette: {
            window: '#737373',
            windowBorder: '#FFFFFF',
            tabIcon: '#FF9600',
            menuIcons: '#D7D7D8',
            textDark: '#DEDEDE',
            textLight: '#FFFFFF',
            link: '#0078FF',
            action: '#FF620C',
            inactiveTabIcon: '#B3B3B3',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#909090'
          },
          fonts: {
            default: null,
            "'Fira Sans', sans-serif": {
              url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
              active: true
            }
          }
        }} // ability to customise the style of the widget uploader
        destroy={true} // will destroy the widget on completion

      />
    </>
    </div>
              <div style={{marginTop: "40px"}}>
              <h2><b>Name: </b> {this.props.user.name}</h2> <br/>
              <h2><b>Email: </b> {this.props.user.email}</h2> <br/>
              <h2><b>Username: </b> {this.props.user.username}</h2><br/>
              <h2><b>Role: </b> {this.props.user.role}</h2><br/>
              <h2><b>Associated Account: </b> {this.props.user.associatedemail}</h2><br/>
              <h2><b>Phone: </b> {this.props.user.name}</h2> <br/>
              <h2><b>Address: </b> {this.props.user.address}</h2> <br/>
              <h2><b>City: </b> {this.props.user.city}</h2><br/>
              <h2><b>State: </b> {this.props.user.state}</h2><br/>
              <h2><b>Zip Code: </b> {this.props.user.zip}</h2><br/>
              <h2><b>Country: </b> {this.props.user.country}</h2><br/>
              </div>
              </div> 
              </div>    
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }}

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchUser: () => {dispatch(action.fetchUser())
      },
      updateDashboard: (urllink) => {dispatch(action.updateDashboard(urllink))
      },
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(index)
  // export default connect(mapStateToProps, null)(index)