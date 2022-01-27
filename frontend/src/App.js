
import './App.css';
import Page1  from './MyComponents/page1/page1';
import Login  from './MyComponents/login/login'; 
import { BrowserRouter as Router,Routes ,Route} from "react-router-dom";


function App() {
  return (
    <Router>
			<Routes>
				  <Route exact path="/" element={<Page1 />} />
          <Route path="/login" element={<Login />} />
		 	</Routes>
		 </Router>
  );
}

export default App;