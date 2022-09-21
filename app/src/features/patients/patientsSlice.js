import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL, API_PATIENTS, API_ASSURANCES, API_DOCTORS } from "../apiConfig"
import { toast } from 'react-toastify'
import dayjs from "dayjs"
import { addDoctorState } from "../doctors/doctorsSlice"
import { addAssuranceState } from "../assurances/assurancesSlice"

const initialState = {
    patients: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    saved: null,
    navigate: null
}

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async () => {

    try {
        const response = await toast.promise(
            axios.get(API_PATIENTS + "?pagination=false"),
            {
                pending: 'Chargement des patients',
                success: 'Chargement effectué',
                error: 'Erreur de chargement'
            },
            {
                toastId: "fetchPatients"
            }
        )
        return response.data["hydra:member"]
    } catch (error) {
        console.log(error)
        throw error
    }
})


export const fetchPatient = createAsyncThunk('missions/fetchPatient', async (id, state) => {

    const patient = state.getState().patients.patients.filter(f => Number(f.id) === Number(id))

    if (patient.length > 0 && patient[0].fulfilled) {
        return (patient[0])
    }
    else try {
        const response = await toast.promise(
            axios.get(API_PATIENTS + "/" + id),
            {
                pending: 'Chargement de la fiche patient',
                success: 'Chargement effectué',
                error: 'Erreur de chargement'
            },
            {
                toastId: "fetchPatient"
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})


export const addPatient = createAsyncThunk('patients/addPatient', async (form) => {

    const datas = { ...form.patient }
    datas.status = "isActive"
    delete datas.doctor
    delete datas.assurance

    try {
        const response = await toast.promise(
            axios.post(API_PATIENTS, datas),
            {
                pending: 'Enregistrement',
                success: 'Patient enregistrée',
                error: 'Erreur'
            },
            {
                toastId: "addPatient"
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const updatePatient = createAsyncThunk('patients/updatePatient', async (form, ThunkAPI) => {

    const datas = { ...form.values.patient }
    delete datas.doctor
    delete datas.assurance
    datas.updatedAt = dayjs().format()

    // action can be  / patient / doctorIRI / addDoctor / assuranceIRI / addAssurance /
    if (form.action === "doctorIRI") datas.doctor = API_DOCTORS + "/" + form.values.doctorIRI
    if (form.action === "assuranceIRI") datas.assurance = API_ASSURANCES + "/" + form.values.assuranceIRI
    if (form.action === "addDoctor") datas.doctor = form.values.doctor
    if (form.action === "addAssurance") datas.assurance = form.values.assurance

    try {
        const response = await toast.promise(
            axios.put(API_PATIENTS + "/" + form.values.patient.id, datas),
            {
                pending: 'Enregistrement',
                success: 'Patient modifié',
                error: 'Erreur'
            },
            {
                toastId: "updatePatient"
            }
        )
        if (form.action === "addDoctor")
            ThunkAPI.dispatch(addDoctorState(response.data.doctor))
        if (form.action === "addAssurance")
            ThunkAPI.dispatch(addAssuranceState(response.data.assurance))
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchPatients.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPatients.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.patients = action.payload
            })
            .addCase(fetchPatients.rejected, (state, action) => {
                state.patients = []
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addPatient.pending, (state) => {
                state.navigate = null
            })
            .addCase(addPatient.fulfilled, (state, action) => {
                state.patients.push({ ...action.payload, fulfilled: true })
                state.navigate = action.payload.id
            })
            .addCase(updatePatient.pending, (state, action) => {
                const index = state.patients.findIndex(obj => obj['@id'] === action.meta.arg['@id'])
                state.saved = state.patients[index]
                state.patients[index] = action.meta.arg
            })
            .addCase(updatePatient.fulfilled, (state, action) => {
                console.log('action.payload', action.payload)
                const index = state.patients.findIndex(obj => obj['@id'] === action.payload['@id'])
                state.patients[index] = { ...action.payload, fulfilled: true }
            })
            .addCase(updatePatient.rejected, (state, action) => {
                const index = state.patients.findIndex(obj => obj['@id'] === action.meta.arg['@id'])
                state.patients[index] = state.saved
            })
            .addCase(fetchPatient.fulfilled, (state, action) => {
                state.navigate = null
                const index = state.patients.findIndex(obj => obj['@id'] === action.payload['@id'])
                if (index < 0)
                    state.patients.push({ ...action.payload, fulfilled: true })
                else
                    state.patients[index] = { ...action.payload, fulfilled: true }
            })
    }
})

export const selectAllPatients = (state) => state.patients.patients
export const getPatientsStatus = (state) => state.patients.status
export const getPatientsError = (state) => state.patients.error
export const getPatientsSaved = (state) => state.patients.saved
export const getPatientsNavigate = (state) => state.patients.navigate


export default patientsSlice.reducer