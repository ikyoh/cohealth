import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, API_PARTNERS } from "../apiConfig";
import { toast } from 'react-toastify';
import dayjs from "dayjs";


const initialState = {
    partners: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    saved: null
}

export const fetchPartners = createAsyncThunk('partners/fetchPartners', async () => {

    try {
        const response = await toast.promise(
            axios.get(API_PARTNERS + "?pagination=false"),
            {
                pending: 'Chargement des partenaires',
                success: 'Chargement effectué',
                error: 'Erreur de chargement'
            },
            {
                toastId: "fetchPartners"
            }
        )
        return response.data["hydra:member"];
    } catch (error) {
        console.log(error)
        throw error
    }
})


export const fetchPartner = createAsyncThunk('partners/fetchPartner', async (id) => {
    try {
        const response = await toast.promise(
            axios.get(API_PARTNERS + "/" + id),
            {
                pending: 'Chargement de la fiche partner',
                success: 'Chargement effectué',
                error: 'Erreur de chargement'
            }
        )
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
})


export const addPartner = createAsyncThunk('partners/addPartner', async (form) => {

    const datas = { ...form }
    datas.status = "isActive"

    try {
        const response = await toast.promise(
            axios.post(API_PARTNERS, datas),
            {
                pending: 'Enregistrement',
                success: 'Partner enregistrée',
                error: 'Erreur'
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const updatePartner = createAsyncThunk('partners/updatePartner', async (form) => {

    console.log('form', form)
    const datas = { ...form.values }
    datas.updatedAt = dayjs().format()    
    delete datas.doctor
    delete datas.assurance
    // action can be  / selectDoctor / addDoctor / selectAssurance / addAssurance /
    if (form.action==="selectDoctor") datas.doctor = API_URL + form.values.doctorIRI
    if (form.action==="selectAssurance") datas.assurance = API_URL + form.values.assuranceIRI
    if (form.action==="addDoctor") datas.doctor = form.values.doctor
    if (form.action==="addAssurance") datas.assurance = form.values.assurance

    console.log('datas', datas)

    try {
        const response = await toast.promise(
            axios.put(API_PARTNERS + "/" + datas.id, datas),
            {
                pending: 'Enregistrement',
                success: 'Partner modifié',
                error: 'Erreur'
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

const partnersSlice = createSlice({
    name: 'partners',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchPartners.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPartners.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.partners = action.payload
            })
            .addCase(fetchPartners.rejected, (state, action) => {
                state.partners = []
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addPartner.fulfilled, (state, action) => {
                state.partners.push(action.payload)
            })
            .addCase(updatePartner.pending, (state, action) => {
                const index = state.partners.findIndex(obj => obj['@id'] === action.meta.arg['@id'])
                state.saved = state.partners[index]
                state.partners[index] = action.meta.arg
            })
            .addCase(updatePartner.fulfilled, (state, action) => {
                const index = state.partners.findIndex(obj => obj['@id'] === action.payload['@id'])
                console.log('action.payload', action.payload)
                state.partners[index] = action.payload
            })
            .addCase(updatePartner.rejected, (state, action) => {
                const index = state.partners.findIndex(obj => obj['@id'] === action.meta.arg['@id'])
                state.partners[index] = state.saved
            })
            .addCase(fetchPartner.fulfilled, (state, action) => {
                const index = state.partners.findIndex(obj => obj['@id'] === action.payload['@id'])
                state.partners[index] = {...action.payload, fulfilled : true }
            })
    }
})

export const selectAllPartners = (state) => state.partners.partners;
export const getPartnersStatus = (state) => state.partners.status;
export const getPartnersError = (state) => state.partners.error;
export const getPartnersSaved = (state) => state.partners.saved;
export default partnersSlice.reducer