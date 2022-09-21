import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_SERVICES } from "../apiConfig";
import { toast } from 'react-toastify';

const initialState = {
    services: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    saved : null
}

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
    try {
        const response = await toast.promise(
            axios.get(API_SERVICES + "?pagination=false"),
            {
                pending: 'Chargement des prestations',
                success: 'Chargement effectué',
                error: 'Erreur de chargement'
            },
            {
                toastId: "fetchServices"
            }
        )
        return response.data["hydra:member"];
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const addService = createAsyncThunk('services/addService', async (form) => {
    try {
        const response = await toast.promise(
            axios.post(API_SERVICES, form),
            {
                pending: 'Enregistrement',
                success: 'Service enregistré',
                error: 'Erreur'
            },
            {
                toastId: "addServices"
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const updateService = createAsyncThunk('services/updateService', async (form) => {
    try {
        const response = await toast.promise(
            axios.put(API_SERVICES + "/" + form.id, form),
            {
                pending: 'Enregistrement',
                success: 'Service modifié',
                error: 'Erreur'
            },
            {
                toastId: "updateService"
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.services = action.payload
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.services = []
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addService.fulfilled, (state, action) => {
                state.services.push(action.payload)
            })
            .addCase(updateService.pending, (state, action) => {
                const index = state.services.findIndex(obj => obj['@id'] === action.meta.arg['@id'])
                state.saved =  state.services[index]
                state.services[index] = action.meta.arg
            })
            .addCase(updateService.rejected, (state, action) => {
                console.log('state.saved', state.services)
                console.log('action rejected', action)
                const index = state.services.findIndex(obj => obj['@id'] === action.meta.arg['@id'])
                state.services[index] = state.saved
            })
    }
})


export const selectAllServices = (state) => state.services.services;
export const getServicesStatus = (state) => state.services.status;
export const getServicesError = (state) => state.services.error;
export const getServicesSaved = (state) => state.services.saved;

export const { serviceAdded, serviceUpdated } = servicesSlice.actions

export default servicesSlice.reducer