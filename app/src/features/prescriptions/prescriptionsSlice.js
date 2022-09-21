import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL, URL, API_PRESCRIPTIONS } from "../apiConfig"
import { toast } from 'react-toastify'
import dayjs from "dayjs"
import { setMissionsStatusIddle } from "../missions/missionsSlice"

const initialState = {
    prescriptions: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    saved: null,
    navigate: null
}

export const fetchPrescriptions = createAsyncThunk('prescriptions/fetchPrescriptions', async () => {

    try {
        const response = await toast.promise(
            axios.get(API_PRESCRIPTIONS + "?pagination=false"),
            {
                pending: 'Chargement des prescriptions',
                success: 'Chargement effectué',
                error: 'Erreur de chargement'
            },
            {
                toastId: "fetchPrescriptions"
            }
        )
        return response.data["hydra:member"]
    } catch (error) {
        console.log(error)
        throw error
    }
})


export const fetchPrescription = createAsyncThunk('prescriptions/fetchPrescription', async (id, state) => {

    const prescription = state.getState().prescriptions.prescriptions.filter(f => Number(f.id) === Number(id))

    if (prescription.length > 0 && prescription[0].fulfilled) {
        return (prescription[0])
    }
    else try {
        const response = await toast.promise(
            axios.get(API_PRESCRIPTIONS + "/" + id),
            {
                pending: 'Chargement de la prescription',
                success: 'Chargement effectué',
                error: 'Erreur de chargement'
            },
            {
                toastId: "fetchPrescription"
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})


export const addPrescription = createAsyncThunk('prescriptions/addPrescription', async (form) => {

    const datas = { ...form.prescription }
    datas.status = "isActive"
    delete datas.doctor
    delete datas.assurance

    try {
        const response = await toast.promise(
            axios.post(API_PRESCRIPTIONS, datas),
            {
                pending: 'Enregistrement',
                success: 'Prescription enregistrée',
                error: 'Erreur'
            },
            {
                toastId: "addPrescription"
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const updatePrescription = createAsyncThunk('prescriptions/updatePrescription', async (form) => {

    console.log('form', form)

    const datas = { ...form }
    delete datas.user

    try {
        const response = await toast.promise(
            axios.put(URL + form['@id'], datas),
            {
                pending: 'Enregistrement',
                success: 'Prescription modifié',
                error: 'Erreur'
            },
            {
                toastId: "updatePrescription"
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const updatePrescriptionStatus = createAsyncThunk('prescriptions/updatePrescription', async ({ id, status }, ThunkAPI) => {

    ThunkAPI.dispatch(setMissionsStatusIddle())

    try {
        const response = await toast.promise(
            axios.put(URL+ id, { status: status }),
            {
                pending: 'Enregistrement',
                success: 'Prescription modifié',
                error: 'Erreur'
            }
            ,
            {
                toastId: "updatePrescriptionStatus"
            }
        )

        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

const prescriptionsSlice = createSlice({
    name: 'prescriptions',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchPrescriptions.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPrescriptions.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.prescriptions = action.payload
            })
            .addCase(fetchPrescriptions.rejected, (state, action) => {
                state.prescriptions = []
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addPrescription.pending, (state) => {
                state.navigate = false
            })
            .addCase(addPrescription.fulfilled, (state, action) => {
                state.prescriptions.push({ ...action.payload, fulfilled: true })
                state.navigate = action.payload['@id']
            })
            .addCase(updatePrescription.fulfilled, (state, action) => {
                console.log('action.payload', action.payload)
                const index = state.prescriptions.findIndex(obj => obj['@id'] === action.payload['@id'])
                state.prescriptions[index] = { ...action.payload, fulfilled: true }
            })
            .addCase(updatePrescription.rejected, (state, action) => {
                const index = state.prescriptions.findIndex(obj => obj['@id'] === action.meta.arg['@id'])
                state.prescriptions[index] = state.saved
            })
            .addCase(fetchPrescription.fulfilled, (state, action) => {
                state.navigate = null
                const index = state.prescriptions.findIndex(obj => obj['@id'] === action.payload['@id'])
                if (index < 0)
                    state.prescriptions.push({ ...action.payload, fulfilled: true })
                else
                    state.prescriptions[index] = { ...action.payload, fulfilled: true }
            })
    }
})

export const selectAllPrescriptions = (state) => state.prescriptions.prescriptions
export const getPrescriptionsStatus = (state) => state.prescriptions.status
export const getPrescriptionsError = (state) => state.prescriptions.error
export const getPrescriptionsSaved = (state) => state.prescriptions.saved
export const getPrescriptionsNavigate = (state) => state.prescriptions.navigate


export default prescriptionsSlice.reducer