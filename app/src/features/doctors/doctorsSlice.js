import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_DOCTORS } from "../apiConfig"
import { toast } from 'react-toastify'
import dayjs from "dayjs"

const initialState = {
    doctors: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    saved: null
}

export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
    try {
        const response = await toast.promise(
            axios.get(API_DOCTORS + "?pagination=false"),
            {
                pending: 'Chargement des médecins',
                success: 'Chargement effectué',
                error: 'Erreur de chargement'
            },
            {
                toastId: "fetchDoctors"
            }
        )
        return response.data["hydra:member"]
    } catch (error) {
        console.log(error)
        throw error
    }
})


export const fetchDoctor = createAsyncThunk('doctors/fetchDoctor', async (id) => {
    try {
        const response = await toast.promise(
            axios.get(API_DOCTORS + "/" + id),
            {
                pending: 'Chargement de la fiche médecin',
                success: 'Chargement effectué',
                error: 'Erreur de chargement'
            },
            {
                toastId: "fetchDoctor"
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const addDoctor = createAsyncThunk('doctors/addDoctor', async (form) => {

    const datas = { ...form }
    datas.createdAt = dayjs().format()

    try {
        const response = await toast.promise(
            axios.post(API_DOCTORS, datas),
            {
                pending: 'Enregistrement',
                success: 'Médecin enregistré',
                error: 'Erreur'
            },
            {
                toastId: "addDoctor"
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const updateDoctor = createAsyncThunk('doctors/updateDoctor', async (form) => {

    const datas = { ...form }
    datas.updatedAt = dayjs().format()

    try {
        const response = await toast.promise(
            axios.put(API_DOCTORS + "/" + datas.id, datas),
            {
                pending: 'Enregistrement',
                success: 'Médecin modifié',
                error: 'Erreur'
            },
            {
                toastId: "updateDoctor"
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

const doctorsSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {
        addDoctorState: (state, action) => {
            state.doctors.push({ ...action.payload, isActive: true })
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchDoctors.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchDoctors.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.doctors = action.payload
            })
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.doctors = []
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addDoctor.fulfilled, (state, action) => {
                state.doctors.push(action.payload)
            })
            .addCase(updateDoctor.pending, (state, action) => {
                const index = state.doctors.findIndex(obj => obj['@id'] === action.meta.arg['@id'])
                state.saved = state.doctors[index]
                state.doctors[index] = action.meta.arg
            })
            .addCase(updateDoctor.rejected, (state, action) => {
                const index = state.doctors.findIndex(obj => obj['@id'] === action.meta.arg['@id'])
                state.doctors[index] = state.saved
            })
            .addCase(fetchDoctor.fulfilled, (state, action) => {
                const index = state.doctors.findIndex(obj => obj['@id'] === action.payload['@id'])
                state.doctors[index] = { ...action.payload, fulfilled: true }
            })
    }
})

export const selectAllDoctors = (state) => state.doctors.doctors
export const getDoctorsStatus = (state) => state.doctors.status
export const getDoctorsError = (state) => state.doctors.error
export const getDoctorsSaved = (state) => state.doctors.saved
export const { addDoctorState } = doctorsSlice.actions
export default doctorsSlice.reducer