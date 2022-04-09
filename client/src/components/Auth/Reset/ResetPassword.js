import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'


const ResetPassword = () =>{
    const history = useHistory()
    const [email, setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
            M.toast({html:"Enter a valid email", classes:"#82b1ff blue darken-1"})
            return
        }

        fetch("/api/users/resetPassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email
            })
        }).then(res=>
            res.json())
        .then(data=>{
            //console.log(data)
           if(data.error)
           {
               M.toast({html: data.error, classes:"#82b1ff blue darken-1"})
           }
           else{
               M.toast({html:data.message, classes: "#00e676 green accent-3"})
               history.push('/api/users/login')
           }
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <body className="bg jumbotron">
        <div className="mycard">
             <div className="card auth-card input-field">
                 <div style={{textAlign:"center"}}>
                <h2><b>Event Sensei - Password Reset</b></h2>
                <br/>
                </div>
                <input type="text" 
                placeholder="Email"
                style={{fontSize:"22px"}}
                value={email}
                onChange= {(e)=> setEmail(e.target.value)}/>

                {/* <input type="password" 
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}/> */}
                <br/>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=> PostData()} style={{fontSize:"25px"}}>
                    Reset password
                </button>
                <br/><br/>
             
                <h5>
                    <Link style={{color: "darkred"}} to="/signup"> Don't have an account? - Sign Up </Link>
                </h5> 
            </div>
        </div>
        </body>
    )
}

export default ResetPassword