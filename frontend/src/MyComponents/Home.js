import React from 'react';
import Axios from "axios";

 const Home = () => {
     function logout(e){
        e.preventDefault();
    
        Axios.post("/logout").then((response)=>{
            alert("logged out");
        })
     }
  return<>
   <div>Welcome to home page because u logged in successfully</div>
   <button onClick={logout}>Logout</button>
   </>
};
export default  Home;