import React from 'react';
import {Link} from 'react-router-dom'
import Fragment from '../../utils/Fragment';
import './Landing.css'
// import vid from '../Background/vid.mp4'
import vid from '../Background/bc.mp4'
import Button from 'react-bootstrap/Button';
import partygraphic from '../Background/aboutus.png';
import partylinegraphic from '../Background/longline.jpg';
import Footer from '../Footer/Footer.js'

const Landing = () => {

  return (
    <div>
    <Fragment>
      <div className=''>
      <div dangerouslySetInnerHTML={{ __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          src="${vid}"
          class="VideostyleBanner"
        />,
      ` }}></div>
        <div className="jumbotron container">
          <h1      style={{
          textAlign: "center"
        }} className="display-4">M1 Interactive Coding Test <br/></h1>
          <hr className="my-4" />
          <div style={{textAlign: "center"}}>
          </div>
          <p className="lead leadBtn">
            <Link 
            to='/signup' className="btn"><Button
            style={{
            fontSize: "25px",
            borderRadius: "34px",
            boxShadow: "0px 3px 10px black"
            }}
            variant="info">Sign Up</Button></Link>        
            <Link 
            to='/login'
            className="btn pull-right" >
            <Button
            style={{
            fontSize: "25px",
            borderRadius: "34px",
            boxShadow: "0px 3px 10px black",
    
            }}
            variant="success">Login</Button></Link>
          </p>
        </div>
<br/><br/><br/><br/><br/><br/><br/>
<h1 style={{textAlign:"center"}}><b>Sign up for Social Media</b></h1>
<br/><br/>
      <img src={partygraphic}
      position = "absolute"
    width="674" height="400"
    style= {{maxWidth:"100%", display: 'block', marginLeft:  'auto', marginRight: 'auto'}}
    />

</div>
<Footer/>
    </Fragment>


    </div>
  )
}


export default Landing