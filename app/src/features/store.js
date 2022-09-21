

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import accountReducer from './account/accountSlice'
import authenticationReducer from './authentication/authenticationSlice'
import assuranceReducer from './assurances/assurancesSlice'
import commentReducer from './comments/commentsSlice'
import doctorReducer from './doctors/doctorsSlice'
import partnerReducer from './partners/partnersSlice'
import patientReducer from './patients/patientsSlice'
import prescriptionReducer from './prescriptions/prescriptionsSlice'
import missionReducer from './missions/missionsSlice'
import serviceReducer from './services/servicesSlice'
import userReducer from './users/usersSlice'

//const combinedReducer = combineReducers({missionReducer, patientReducer})

export const store = configureStore({
  reducer: {
    //combined : combinedReducer,
    account: accountReducer,
    authentication: authenticationReducer,
    assurances: assuranceReducer,
    comments: commentReducer,
    doctors: doctorReducer,
    missions: missionReducer,
    partners: partnerReducer,
    patients: patientReducer,
    prescriptions: prescriptionReducer,
    services: serviceReducer,
    users: userReducer,
  },

})