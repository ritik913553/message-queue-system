import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './component/Login'
import Signup from './component/Signup'
import Dashboard from './Pages/Dashboard'
import  {useLoadingWithRefresh}  from './utils/useLodingWithRefresh'

const App = () => {
  const {loading,user} = useLoadingWithRefresh();
  if(loading){
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  return (
    
      <Routes>
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
  )
}

export default App

