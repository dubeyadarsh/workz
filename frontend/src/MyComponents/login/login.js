import logo2 from "../img/logo.png";
import React from "react";
import { useState, useEffect } from "react";
import "./login.css";
import Axios from "axios";

// Variable name should be named as camelcase letter
export const Login = () => {
// Variable defined
// Signup department 
const [registerName, setregisterName] = useState("");
const [registerMail, setregisterMail] = useState("");
const [registerPass, setregisterPass] = useState("");

// Login deparment
const [loginMail, setloginMail] = useState("");
const [loginPass, setloginPass] = useState("");


  useEffect(() => {
    login();
  });
  function login() {

    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container1");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  }
  function register(e){
	e.preventDefault();
	console.log(registerName+" "+registerMail+" "+registerPass);
	Axios.post("/register",{registerName:registerName,registerMail:registerMail,registerPass:registerPass});
  }
  return (
    <div className="body1">
      <img class="img1" src={logo2} href="#" />
      <div class="container1" id="container1">
        <div class="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <div class="social-container">
              {/* <a href="#" class="social"><i class="fab fa-facebook-f"></i></a> */}
              <a href="#" class="social">
                <i class="fab fa-google-plus-g"></i>
              </a>
              {/* <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a> */}
            </div>
            <span>or use your email for registration</span>
            <input value={registerName}  onChange={(e)=>setregisterName(e.target.value)} type="text" placeholder="Name" />
            <input  value={registerMail}  onChange={(e)=>setregisterMail(e.target.value)} type="email" placeholder="Email" />
            <input value={registerPass}  onChange={(e)=>setregisterPass(e.target.value)} type="password" placeholder="Password" />
            <button onClick={register}>Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form action="#">
            <h1 className="fr">Sign in</h1>
            <div class="social-container">
              {/* <a href="#" class="social"><i class="fab fa-facebook-f"></i></a> */}
              <a href="#" class="social">
                <i class="fab fa-google-plus-g"></i>
              </a>
              {/* <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a> */}
            </div>
            <span>or use your account</span>
            <input value={loginMail}  onChange={(e)=>setloginMail(e.target.value)} type="email" placeholder="Email" required />
            <input value={loginPass}  onChange={(e)=>setloginPass(e.target.value)} type="password" placeholder="Password" required />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1 className="fs">Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button class="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button class="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React from "react";
// import "./login.css";
// const Login = () => {

//   return (

//     <>
//       <div className="row flex-row justify-content-center">
//         <div className="col-6 text--center">
//           <h2>WorkZone</h2>
//         </div>
//       </div>
//       <div className="row   mt-2 justify-content-center ">
//         <div className="col-lg-4 col-md-4 col-10">
//           <div className="row flex-row justify-content-center">
//             <button className="btn button-rounded signup ">
//               SignUp
//             </button>
//             <button className="btn  button-rounded login">Login</button>
//           </div>
//           <div className="row  mainbox box-rounded ">
//             <div className="container  my-4">

//               <form>
//               <div class="form-group">
//                   <label for="exampleInputEmail1">Name</label>
//                   <input
//                     type="name"
//                     class="form-control input"
//                     id="name"

//                     placeholder="Enter Name"
//                   />

//                 </div>
//                 <div class="form-group">
//                   <label for="exampleInputEmail1">Email address</label>
//                   <input
//                     type="email"
//                     class="form-control input"
//                     id="exampleInputEmail1"
//                     aria-describedby="emailHelp"
//                     placeholder="email@address.com"
//                   />
//                   <small id="emailHelp" class="form-text text-muted">
//                     We'll never share your email with anyone else.
//                   </small>
//                 </div>
//                 <div class="form-group">
//                   <label for="exampleInputPassword1">Create Password</label>
//                   <input
//                     type="password"
//                     class="form-control input"
//                     id="exampleInputPassword1"
//                     placeholder="Password"
//                   />
//                 </div>
//                 <div class="form-group">
//                   <input
//                     type="password"
//                     class="form-control input"
//                     id="exampleInputPassword1"
//                     placeholder="Confirm Password"
//                   />
//                 </div>

//                 <button type="submit" class="btn inputButton text-center text-light w-100">
//                  Continue with email
//                 </button>
//               </form>

//             </div>
//           </div>
//         </div>
//       </div>

//     </>
//   );
// };
// export default Login;
