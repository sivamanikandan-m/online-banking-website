import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './Components/User/UserLogin'
import UserRegister from './Components/User/UserRegister'
import UserNavbar from './Components/User/UserNavbar'
import UserDashboard from './Components/User/UserDashboard'
import UserTransaction from './Components/User/UserTransaction'
import AdminLogin from './Components/Admin/AdminLogin'
import AdminDashboard from './Components/Admin/AdminDashboard'
import AllUsers from './Components/Admin/AllUsers'
import AllTransactions from './Components/Admin/AllTransactions'
import RegisterAdmin from './Components/Admin/RegisterAdmin'
import AllAdmins from './Components/Admin/AllAdmins'


function App() {
  

  return (
    <>
    
    <Routes>

      <Route path='/' element={<UserLogin/>} />
      <Route path='/register' element={<UserRegister/>} />
      
      <Route path='/dashboard/user' element={<UserDashboard/>} />
      <Route path='/transactions/user' element={<UserTransaction/>} />

      <Route path='/admin' element={<AdminLogin/>} />

      <Route path='/dashboard/admin' element={<AdminDashboard/>} />
      <Route path='/users/all' element={<AllUsers/>} />
      <Route path='/transactions/all' element={<AllTransactions/>} />
      <Route path='/registeradmin' element={<RegisterAdmin/>} />
      <Route path='/admins/all' element={<AllAdmins/>} />

    </Routes>
    </>
  )
}

export default App
