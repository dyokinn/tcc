import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {DrawerContextProvider} from "./contexts/useDrawer" 
import "./index.scss"
import Scopes from './pages/Scopes';
import TextAnalysis from './pages/TextAnalysis';
import About from './pages/About';
import Login from './pages/Login';
import { AuthContextProvider } from './contexts/useAuth';


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <DrawerContextProvider>
            <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/scopes" element={<Scopes/>} />
            <Route path="/analysis" element={<TextAnalysis/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/login" element={<Login/>} />
            </Routes>
        </DrawerContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;