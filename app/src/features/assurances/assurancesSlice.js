import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_ASSURANCES } from "../apiConfig"
import { toast } from 'react-toastify'
import dayjs from "dayjs"


const initialState = {
    assurances: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    saved: null
}


export const fetchAssurances = createAsyncThunk('assurances/fetchAssurances', async () => {
    try {
        const response = await toast.promise(
            axios.get(API_ASSURANCES + "?pagination=false"),
            {
                pending: 'Chargement des assurances',
                success: 'Chargement effectué',
                error: 'Erreur de chargement'
            },
            {
                toastId: "fetchAssurances"
            }
        )
        return response.data["hydra:member"]
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const fetchAssurance = createAsyncThunk('assurances/fetchAssurance', async (id) => {
    try {
        const response = await toast.promise(
            axios.get(API_ASSURANCES + "/" + id),
            {
                pending: "Chargement de l'assurance",
                success: 'Chargement effectué',
                error: 'Erreur de chargement'
            },
            {
                toastId: "fetchAssurance"
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const addAssurance = createAsyncThunk('assurances/addAssurance', async (form) => {

    const datas = { ...form }
    datas.createdAt = dayjs().format()

    try {
        const response = await toast.promise(
            axios.post(API_ASSURANCES, datas),
            {
                pending: 'Enregistrement',
                success: 'Assurance enregistrée',
                error: 'Erreur'
            },
            {
                toastId: "addAssurance"
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const updateAssurance = createAsyncThunk('assurances/updateAssurance', async (form) => {

    const datas = { ...form }
    datas.updatedAt = dayjs().format()

    try {
        const response = await toast.promise(
            axios.put(API_ASSURANCES + "/" + datas.id, datas),
            {
                pending: 'Enregistrement',
                success: 'Assurance modifiée',
                error: 'Erreur'
            }
            ,
            {
                toastId: "updateAssurance"
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

const assurancesSlice = createSlice({
    name: 'assurances',
    initialState,
    reducers: {
        addAssuranceState: (state, action) => {
            state.assurances.push({ ...action.payload, isActive: true })
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAssurances.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchAssurances.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.assurances = action.payload
            })
            .addCase(fetchAssurances.rejected, (state, action) => {
                state.assurances = []
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addAssurance.fulfilled, (state, action) => {
                state.assurances.push(action.payload)
            })
            .addCase(updateAssurance.pending, (state, action) => {
                const index = state.assurances.findIndex(obj => obj['@id'] === action.meta.arg['@id'])
                state.saved = state.assurances[index]
                state.assurances[index] = action.meta.arg
            })
            .addCase(updateAssurance.rejected, (state, action) => {
                const index = state.assurances.findIndex(obj => obj['@id'] === action.meta.arg['@id'])
                state.assurances[index] = state.saved
            })
            .addCase(fetchAssurance.fulfilled, (state, action) => {
                const index = state.assurances.findIndex(obj => obj['@id'] === action.payload['@id'])
                state.assurances[index] = { ...action.payload, fulfilled: true }
            })
    }
})

export const selectAllAssurances = (state) => state.assurances.assurances
export const getAssurancesStatus = (state) => state.assurances.status
export const getAssurancesError = (state) => state.assurances.error
export const getAssurancesSaved = (state) => state.assurances.saved
export const { addAssuranceState } = assurancesSlice.actions
export default assurancesSlice.reducer