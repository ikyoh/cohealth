import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { URL, API_URL, API_COMMENTS } from "../apiConfig"
import { toast } from 'react-toastify'


const initialState = {
    comments: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    saved: null,
    assuranceComment: { content: '' },
    doctorComment: { content: '' },
}


export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
    try {
        const response = await toast.promise(
            axios.get(API_COMMENTS + "?pagination=false"),
            {
                pending: 'Chargement des comments',
                success: 'Chargement effectué',
                error: 'Erreur de chargement'
            }
        )
        return response.data["hydra:member"]
    } catch (error) {
        console.log(error)
        throw error
    }
})


export const fetchDoctorComment = createAsyncThunk('comments/fetchDoctorComment', async (doctorId) => {
    try {
        const response = await axios.get(API_COMMENTS + "?exists[doctor]=true&doctor=" + doctorId)
        console.log('response.data["hydra:member"]', response.data["hydra:member"])
        if (response.data["hydra:member"].length > 0) return response.data["hydra:member"][0]
        else return initialState.doctorComment
    } catch (error) {
        console.log(error)
        throw error
    }
})


export const fetchAssuranceComment = createAsyncThunk('comments/fetchAssuranceComment', async (assuranceId) => {
    try {
        const response = await axios.get(API_COMMENTS + "?exists[assurance]=true&assurance=" + assuranceId)
        console.log('response.data["hydra:member"]', response.data["hydra:member"])
        if (response.data["hydra:member"].length > 0) return response.data["hydra:member"][0]
        else return initialState.assuranceComment
    } catch (error) {
        console.log(error)
        throw error
    }
})


export const fetchComment = createAsyncThunk('comments/fetchComment', async (id) => {
    console.log('fetchComment')
    try {
        const response = await toast.promise(
            axios.get(API_COMMENTS + "/" + id),
            {
                pending: 'Chargement de la comment',
                success: 'Chargement effectué',
                error: 'Erreur de chargement'
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})


export const addComment = createAsyncThunk('comments/addComment', async (form) => {
    console.log("addcomment")
    try {
        const response = await toast.promise(
            axios.post(API_COMMENTS, form),
            {
                pending: 'Enregistrement',
                success: 'Comment enregistrée',
                error: 'Erreur'
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})


export const updateComment = createAsyncThunk('comments/updateComment', async (form) => {
    console.log("updatecomment")
    try {
        const response = await toast.promise(
            axios.put(URL + form['@id'], form),
            {
                pending: 'Enregistrement',
                success: 'Comment modifiée',
                error: 'Erreur'
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})


const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.comments = action.payload
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.comments = []
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addComment.pending, (state) => {

            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.comments.push(action.payload)
            })
            .addCase(updateComment.pending, (state, action) => {
                const index = state.comments.findIndex(obj => obj['@id'] === action.meta.arg['@id'])
                state.saved = state.comments[index]
                state.comments[index] = action.meta.arg
            })
            .addCase(updateComment.rejected, (state, action) => {
                const index = state.comments.findIndex(obj => obj['@id'] === action.meta.arg['@id'])
                state.comments[index] = state.saved
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                const index = state.comments.findIndex(obj => obj['@id'] === action.payload['@id'])
                state.comments[index] = { ...state.comments[index], ...action.payload }
            })
            .addCase(fetchComment.fulfilled, (state, action) => {
                const index = state.comments.findIndex(obj => obj['@id'] === action.payload['@id'])
                state.comments[index] = { ...action.payload, fulfilled: true }

            })
            .addCase(fetchDoctorComment.pending, (state) => {
                state.doctorComment = initialState.doctorComment

            })
            .addCase(fetchDoctorComment.fulfilled, (state, action) => {
                state.doctorComment = action.payload
            })
            .addCase(fetchAssuranceComment.pending, (state) => {
                state.assuranceComment = initialState.assuranceComment

            })
            .addCase(fetchAssuranceComment.fulfilled, (state, action) => {
                state.assuranceComment = action.payload
            })
    }
})

export const selectAllComments = (state) => state.comments.comments
export const selectDoctorComment = (state) => state.comments.doctorComment
export const selectAssuranceComment = (state) => state.comments.assuranceComment
export const getCommentsStatus = (state) => state.comments.status
export const getCommentsError = (state) => state.comments.error
export const getCommentsSaved = (state) => state.comments.saved
export const getCommentsNavigate = (state) => state.comments.navigate
export default commentsSlice.reducer