
import React, { useEffect } from "react"
import './assets/css/main.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { currentAccount } from "./features/account/accountSlice"
import { getAuthenticationStatus, setupToken } from "./features/authentication/authenticationSlice"
import { useDispatch, useSelector } from "react-redux"
import AccountPage from './pages/AccountPage'
import AssurancesPage from './pages/AssurancesPage'
import DashboardPage from './pages/DashboardPage'
import DoctorsPage from './pages/DoctorsPage'
import Homepage from './pages/Homepage'
import LoginPage from './pages/LoginPage'
import MissionPage from './pages/MissionPage'
import MissionsPage from './pages/MissionsPage'
import PartnersPage from './pages/PartnersPage'
import PatientPage from './pages/PatientPage'
import PatientsPage from './pages/PatientsPage'
import UsersPage from './pages/UsersPage'
import ServicesPage from './pages/ServicesPage'
import RegistrationPage from './pages/RegistrationPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './components/ProtectedRoute'


import * as dayjs from 'dayjs'
require('dayjs/locale/fr')
dayjs.locale('fr')

let localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)


const App = () => {

  const dispatch = useDispatch()

  const authenticationStatus = useSelector(getAuthenticationStatus)

  console.log('authenticationStatus', authenticationStatus)

  dispatch(setupToken())

  useEffect(() => {
    if (authenticationStatus === "succeeded")
      dispatch(currentAccount())
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/account' element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          } />
          <Route path='/assurances' element={<AssurancesPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/doctors' element={<DoctorsPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/users' element={<UsersPage />} />
          <Route path='/missions/:id' element={<MissionPage />} />
          <Route path='/missions' element={
            <ProtectedRoute>
              <MissionsPage />
            </ProtectedRoute>
          } />
          <Route path='/partners' element={
            <ProtectedRoute>
              <PartnersPage />
            </ProtectedRoute>
          } />
          <Route path='/patients/:id' element={<PatientPage />} />
          <Route path='/patients' element={
            <ProtectedRoute>
              <PatientsPage />
            </ProtectedRoute>
          } />
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
        </Routes>
      </Router>
      <ToastContainer
        autoClose={1000}
      />
    </>
  )
}

export default App
