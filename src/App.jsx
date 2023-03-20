import { Route, Routes } from 'react-router-dom';
// import SignUp from './SignUp';
import Login from './Login';
import Dash from './Dash';
import './App.css'

function App() {

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        {/* <Route path="/signup" element={<SignUp />}></Route> */}
        <Route path="/dash" element={<Dash />}></Route> 
        </Routes>
    </div>
  );
}

export default App;
