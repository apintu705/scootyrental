
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {Home} from "./pages/Home"
import {Login} from "./pages/Login"
import {Register} from "./pages/Register"
import {Car} from "./pages/Car"
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
          <Route path="/car/:id" element={<Car/>} />
          <Route path="*" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
