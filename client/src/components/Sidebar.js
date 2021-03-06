import React, { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';
import SidebarData from './SidebarData';
import 'typeface-roboto';


import "./Sidebar.css"


const Sidebar = ()=>{
    const profileLink="/anagrafica/"+sessionStorage.getItem('user_id');
    


    const [user,setUser]=useState("");
    //setUser(JSON.parse(sessionStorage.getItem("user")));

    const fetchData = async(handler) => {
        let response= await Axios.get('https://is-eclub.herokuapp.com/api/v1/user/'+sessionStorage.getItem('user_id'),{
        headers:{
            "auth-token":sessionStorage.getItem('token')}
        })
        
        sessionStorage.setItem('user', JSON.stringify(response.data));
        handler(response.data);
    }
    
    useEffect( () => {
        if(sessionStorage.length==0){
            window.location.href="/login";
        }else{
            if(!user){
                fetchData(setUser);
            }
        }
        switch(sessionStorage.getItem('user_a_type')){
            case "0": //ga
                document.getElementById("anagrafica").style.display="none";
                document.getElementById("squadre").style.display="none";
                break;
            case "1": //dd
                document.getElementById("squadra").style.display="none";
                break;
            case "2": //tm
                document.getElementById("squadra").style.display="none";
                break;
            case"3": //ch
                document.getElementById("meds").style.display="none";
                document.getElementById("squadra").style.display="none";
                break;      
        }
    },[user]);


    return (
        <div className="Sidebar">
            <div className='SidebarHeader'>
                <img src="img.jpg" id="profileImg"></img>
                <a href={profileLink}><h3 >{user.name} {user.surname}</h3></a>
            </div>
            <ul className="SidebarList" id="SidebarList"> 
                {SidebarData.map((val, key) => {
                    return(
                        <li key={key} className="row"
                            id={val.id} 
                            onClick={()=>{
                                if(val.id=="logout"){
                                    sessionStorage.clear();
                                    window.location.pathname="/login"
                                }else if(val.id=="squadra"){
                                    if(user.team_id!="000000000000000000000000"){
                                        window.location.pathname="/squadra/"+user.team_id
                                    }else{
                                        window.alert("Non sei ancora stato inserito in una squadra")    
                                    }
                                }else{
                                    window.location.pathname=val.link
                                }
                            
                            
                            }}
                            >
                            {" "}
                            <div id="icon">
                                {val.icon}
                            </div>{" "}
                            <div id="title">
                                {val.title}
                            </div>
                        </li>
                    );                    
                })}
            </ul>
        </div>
        
    );
}

export default Sidebar;