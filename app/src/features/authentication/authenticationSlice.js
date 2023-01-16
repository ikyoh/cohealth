import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_LOGIN, API_LOGOUT, URL } from '../../config/api.config'
import { toast } from 'react-toastify';


const initialState = {
    authentication: null,
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}


export const login = createAsyncThunk('authentication/login', async (form) => {

    try {
        const response = await toast.promise(
            axios.post(API_LOGIN, form),
            {
                pending: 'Connexion',
                success: 'Compte connecté',
                error: 'Problème de connexion'
            },
            {
                toastId: "login"
            }

        )
        console.log('login response', response)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})


export const logout = createAsyncThunk('authentication/logout', async () => {
    try {
        const response = await toast.promise(
            axios.post(API_LOGOUT),
            {
                pending: 'Déconnexion',
                success: 'Compte déconnecté',
                error: 'Problème de déconnexion'
            },
            {
                toastId: "login"
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})


const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action) => {
                axios.defaults.withCredentials = true
                state.status = "succeeded"
                state.error = null
            })
            .addCase(login.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(login.rejected, (state, action) => {
                state.authentication = null
                state.status = "failed"
                state.error = action.error
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = "idle"
                state.error = null
                window.location.href = '/'
            })
    }
})


// export const { logout } = authenticationSlice.actions
// export const { setupToken } = authenticationSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export const getAuthenticationStatus = (state) => state.authentication.status;
export const getAuthenticationError = (state) => state.authentication.error;


export default authenticationSlice.reducer