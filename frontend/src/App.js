
import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import Page1  from './MyComponents/page1/page1';
import Login  from './MyComponents/login/login'; 
import Home  from './MyComponents/Home'; 
import { BrowserRouter as Router,Routes ,Route} from "react-router-dom";



function App() {
  const [isAuth, setisAuth] = useState(false);
  useEffect(() => {
   Axios.get("/isAuthenticated").then((response)=>{
     console.log(response.data);
     setisAuth(response.data);
   })
  
  });
  return (
    <Router>
			<Routes>
				  <Route exact path="/" element={isAuth?<Home />:<Page1 />} />
          <Route path="/login" element={<Login />} />
		 	</Routes>
		 </Router>
  );
}

export default App;