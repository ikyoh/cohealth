import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_AUTHENTICATION, API_CURRENT_USER, API_USERS, API_MEDIAS, API_URL } from "../apiConfig";
import dayjs from "dayjs";
import { toast } from 'react-toastify';


const initialState = {
    account: null,
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    token: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    isAuthenticated: false,
    saved: null
}


export const loginAccount = createAsyncThunk('account/loginAccount', async (form) => {
    try {
        const response = await axios.post(API_AUTHENTICATION, form)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})


export const currentAccount = createAsyncThunk('account/currentAccount', async () => {
    try {
        const response = await axios.get(API_CURRENT_USER)
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
})


export const updateAccount = createAsyncThunk('account/updateAccount', async (form) => {

    console.log('form', form)
    const datas = { ...form }
    datas.updatedAt = dayjs().format()

    try {
        const response = await toast.promise(
            axios.put(API_USERS + "/" + datas.id, datas),
            {
                pending: 'Enregistrement',
                success: 'Compte modifié',
                error: 'Erreur'
            },{
                toastId: "updateAccount"
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const updateAccountMedia = createAsyncThunk('account/updateAccountMedia', async (form, { getState }) => {

    const state = getState()
    const userId = state.account.account.id

    const formData = new FormData();

    // Update the formData object
    formData.append("file", form.file);
    formData.append("type", form.type);

    try {
        const response = await axios.post(API_MEDIAS, formData)

        const update = await axios.put(API_USERS + "/" + userId, { [form.type] : response.data['@id'] })
        console.log('update.data', update.data)

        return update.data


    } catch (error) {
        if (error.response) { // get response with a status code not in range 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) { // no response
            console.log(error.request);
        } else { // Something wrong in setting up the request
            console.log('Error', error.message);
        }
        console.log(error.config);
    }


})


const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        logout: {
            reducer(state) {
                window.localStorage.removeItem("cohealthToken")
                delete axios.defaults.headers["Authorization"]
                state = initialState
                window.location.href = '/'
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginAccount.fulfilled, (state, action) => {
                console.log('action.payload', action.payload)
                localStorage.setItem("cohealthToken", action.payload.token)
                axios.defaults.headers["Authorization"] = "Bearer " + action.payload.token
                state.token = "succeeded"
                state.error = null
            })
            .addCase(loginAccount.pending, (state, action) => {
                state.token = "loading"
                state.error = null
            })
            .addCase(loginAccount.rejected, (state, action) => {
                state.account = null
                state.token = "failed"
                state.error = action.error
            })
            .addCase(currentAccount.fulfilled, (state, action) => {
                state.account = action.payload
                state.status = "succeeded"
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(currentAccount.pending, (state) => {
                state.status = "loading"
                state.isAuthenticated = false
                state.error = null
            })
            .addCase(currentAccount.rejected, (state, action) => {
                state.account = null
                state.status = "failed"
                state.isAuthenticated = false
                state.error = action.error
            })
            .addCase(updateAccount.pending, (state, action) => {
                state.saved = state.account
                state.account = {...state.account, ...action.meta.arg}
            })
            .addCase(updateAccount.rejected, (state, action) => {
                state.account = state.saved
            })
            .addCase(updateAccountMedia.fulfilled, (state, action) => {
                state.account = action.payload
            })
    }
})


export const { logout } = accountSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export const getAccount = (state) => state.account.account;
export const getAccountToken = (state) => state.account.token;
export const getAccountStatus = (state) => state.account.status;
export const getAccountError = (state) => state.account.error;
export const getAccountIsAuthenticated = (state) => state.account.isAuthenticated;

export default accountSlice.reducer