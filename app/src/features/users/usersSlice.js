import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_USERS } from "../apiConfig";
import { toast } from 'react-toastify';
import dayjs from "dayjs";



const initialState = {
    users: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    saved: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await toast.promise(
            axios.get(API_USERS + "?pagination=false"),
            {
                pending: 'Chargement des utilisateurs',
                success: 'Chargement effectué',
                error: 'Erreur de chargement'
            },
            {
                toastId: "fetchUsers"
            }
        )
        return response.data["hydra:member"];
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const addUser = createAsyncThunk('users/addUser', async (form) => {

    const datas = {...form}
    datas.password = "password"
    datas.secureKey = "key"
    datas.isOptin = true

    try {
        const response = await toast.promise(
            axios.post(API_USERS, datas),
            {
                pending: 'Enregistrement',
                success: 'Utilisateur enregistré',
                error: 'Erreur'
            },
            {
                toastId: "addUser"
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const updateUser = createAsyncThunk('users/updateUser', async (form) => {

    const datas = {...form}
    datas.updatedAt = dayjs().format()

    try {
        const response = await toast.promise(
            axios.put(API_USERS + "/" + datas.id, datas),
            {
                pending: 'Enregistrement',
                success: 'Utilisateur modifié',
                error: 'Erreur'
            },
            {
                toastId: "updateUser"
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.users = []
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload)
            })
            .addCase(updateUser.pending, (state, action) => {
                console.log('action', action)
                const index = state.users.findIndex(obj => obj['@id'] === action.meta.arg['@id'])
                console.log('index', index)
                state.saved = state.users[index]
                state.users[index] = action.meta.arg
            })
            .addCase(updateUser.rejected, (state, action) => {
                const index = state.users.findIndex(obj => obj['@id'] === action.meta.arg['@id'])
                state.users[index] = state.saved
            })
    }
})

export const selectAllUsers = (state) => state.users.users;
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;
export const getUsersSaved = (state) => state.users.saved;
export default usersSlice.reducer