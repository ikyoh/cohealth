import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_AUTHENTICATION, URL } from "../apiConfig";
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";


const initialState = {
    authentication: null,
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}


export const login = createAsyncThunk('authentication/login', async (form) => {
    // console.log('API_AUTHENTICATION', API_AUTHENTICATION)
    // console.log('URL', URL)
    try {
        const response =  await toast.promise(
            axios.post(API_AUTHENTICATION, form),
            {
                pending: 'Connexion',
                success: 'Compte connecté',
                error: 'Problème de connexion'
            },
            {
                toastId: "login"
            }

        )
        console.log('response.data', response.data)
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
        logout: {
            reducer(state) {
                window.localStorage.removeItem("cohealthToken")
                delete axios.defaults.headers["Authorization"]
                state = initialState
                window.location.href = '/login'
            }
        },
        setupToken: {
            reducer(state) {
                // Token ?
                const token = window.localStorage.getItem("cohealthToken")
                // Token encore valide ?
                if (token) {
                    if (token === "undefined")
                        window.localStorage.removeItem("cohealthToken")
                    else {
                        const { exp: expiration } = jwt_decode(token)
                        if (expiration * 1000 > new Date().getTime()) {
                            axios.defaults.headers["Authorization"] = "Bearer " + token
                            state.status = "succeeded"
                        }
                    }
                }
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action) => {
                console.log('action.payload', action.payload)
                const token = action.payload.token
                axios.defaults.headers["Authorization"] = "Bearer " + token
                localStorage.setItem("cohealthToken", token)
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
    }
})


export const { logout } = authenticationSlice.actions
export const { setupToken } = authenticationSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export const getAuthenticationStatus = (state) => state.authentication.status;
export const getAuthenticationError = (state) => state.authentication.error;


export default authenticationSlice.reducer