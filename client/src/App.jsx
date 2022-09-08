
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {Home} from "./pages/Home"
import {Login} from "./pages/Login"
import {Register} from "./pages/Register"
import {Scooty} from "./pages/Scooty"
import {ToastContainer} from "react-toastify"
import {BrowserRouter,Route,Routes} from "react-router-dom"

function App() {
  return (
    <div className="app">
      <ToastContainer position="bottom-center" limit={1}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/scooty/:id" element={<Scooty/>} />
          <Route path="*" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
