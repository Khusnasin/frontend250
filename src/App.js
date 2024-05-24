import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import Profilepage from './Screens/Profilepage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
    
    <Routes>
    
      <Route path = "/profile" element = {<Profilepage/>} />
  
    </Routes>
  
  </BrowserRouter>
    </div>
  );
}

export default App;
