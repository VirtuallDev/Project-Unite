import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import useAuth, { ApiFunction } from './hooks/auth.hook'
import { createContext } from 'react';
import Home from './pages/home/Home';
import Register from './pages/auth/register/Register';


export type AuthContextType = {
  useApi: ApiFunction
}

export const AuthContext = createContext<AuthContextType | null>(null);


function App() {
  const { useApi } = useAuth();
  return (
    <AuthContext.Provider value={ { useApi } }>
        <div>
          <BrowserRouter>
          <Routes>

          <Route path="/" element={<Home />}/>
          {/* <Route path="/auth/login" element={< />}/> */}
          <Route path="/auth/register" element={<Register />}/>


          </Routes>
          </BrowserRouter>
        </div>
    </AuthContext.Provider>
  )
}

export default App
