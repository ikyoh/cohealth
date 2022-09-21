import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { URL, API_URL, API_MISSIONS, API_PATIENTS, API_PRESCRIPTIONS, API_MEDIAS, API_DOCTORS, API_ASSURANCES } from "../apiConfig"
import { toast } from 'react-toastify'
import * as dayjs from 'dayjs'

import { addDoctorState } from "../doctors/doctorsSlice"
import { addAssuranceState } from "../assurances/assurancesSlice"
import { addPatient, updatePatient } from "../patients/patientsSlice"



const initialState = {
    missions: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    saved: null,
    navigate: null
}


export const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
    try {
        const response = await toast.promise(
            axios.get(API_MISSIONS + "?pagination=false"),
            {
                pending: 'Chargement des missions',
                success: 'Chargement effectué',
                error: 'Erreur de chargement'
            },
            {
                toastId: "fetchMissions"
            }
        )
        return response.data["hydra:member"]
    } catch (error) {
        console.log(error)
        throw error
    }
})


export const fetchMission = createAsyncThunk('missions/fetchMission', async (id, state) => {

    const mission = state.getState().missions.missions.filter(f => Number(f.id) === Number(id))

    if (mission.length > 0 && mission[0].fulfilled) {
        //console.log('mission[0]', mission[0])
        return (mission[0])
    }
    else try {
        const response = await toast.promise(
            axios.get(API_MISSIONS + "/" + id),
            {
                pending: 'Chargement de la mission',
                success: 'Chargement effectué',
                error: 'Erreur de chargement'
            },
            {
                toastId: "fetchMission"
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})


export const addMission = createAsyncThunk('missions/addMission', async (form, ThunkAPI) => {

    const datas = { ...form.values }
    delete datas.patient
    delete datas.patientIRI
    datas.createdAt = dayjs().format()
    datas.beginAt = dayjs(form.values.beginAt).format()
    datas.endAt = dayjs(form.values.endAt).format()
    datas.status = "En cours"

    if (form.action === "patientIRI") {
        datas.patient = API_PATIENTS + "/" + form.values.patientIRI
        try {
            const response = await toast.promise(
                axios.post(API_MISSIONS, datas),
                {
                    pending: 'Enregistrement',
                    success: 'Mission enregistrée',
                    error: 'Erreur'
                },
                {
                    toastId: "addMission"
                }
            )
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    if (form.action === "addPatient") {

        const patient = await ThunkAPI.dispatch(addPatient({ patient: form.values.patient }))
        try {
            const response = await toast.promise(
                axios.post(API_MISSIONS, { ...datas, patient: URL + patient.payload['@id'] }),
                {
                    pending: 'Enregistrement',
                    success: 'Mission enregistrée',
                    error: 'Erreur'
                },
                {
                    toastId: "addPatient"
                }
            )
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }

})


export const addPrescription = createAsyncThunk('missions/addPrescription', async (form) => {

    const datas = { ...form }

    try {
        const response = await toast.promise(
            axios.post(API_PRESCRIPTIONS, datas),
            {
                pending: 'Enregistrement',
                success: 'Document enregistré',
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

export const addDocument = createAsyncThunk('missions/addDocument', async (form) => {

    const formData = new FormData();

    // Update the formData object
    formData.append("file", form.file);
    formData.append("type", form.type);
    formData.append("comment", form.comment);
    // formData.append("missionId", form.missionId);

    try {
        const response = await axios.post(API_MEDIAS, formData)
        const update = await axios.put(URL + response.data['@id'], { mission: form.mission })
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


export const updateMission = createAsyncThunk('missions/updateMission', async (form, ThunkAPI) => {

    const datas = { ...form.values }
    delete datas.documents
    delete datas.assurance
    delete datas.doctor
    delete datas.patient
    delete datas.user
    delete datas.prescriptions

    datas.updatedAt = dayjs().format()

    if (form.action === 'updateMission') {
        datas.description = form.values.description
        datas.beginAt = dayjs(form.values.beginAt).format()
        datas.endAt = dayjs(form.values.endAt).format()
    }

    if (form.action === 'doctorIRI')
        datas.doctor = API_DOCTORS + "/" + form.values.doctorIRI

    if (form.action === 'assuranceIRI')
        datas.assurance = API_ASSURANCES + "/" + form.values.assuranceIRI

    if (form.action === 'addDoctor')
        datas.doctor = form.values.doctor

    if (form.action === 'addAssurance')
        datas.assurance = form.values.assurance

    if (form.action === 'selectPartners') {
        datas.coworkers = form.values.coworkersDetailed.reduce((acc, item) => [...acc, item.id], [])
        datas.coworkersDetailed = form.values.coworkersDetailed
    }

    try {
        const response = await toast.promise(
            axios.put(API_MISSIONS + "/" + form.values.id, datas),
            {
                pending: 'Enregistrement',
                success: 'Mission modifiée',
                error: 'Erreur'
            },
            {
                toastId: "updateMission"
            }
        )

        if (form.action === "addDoctor")
            ThunkAPI.dispatch(addDoctorState(response.data.doctor))
        if (form.action === "addAssurance")
            ThunkAPI.dispatch(addAssuranceState(response.data.assurance))

        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})


const missionsSlice = createSlice({
    name: 'missions',
    initialState,
    reducers: {
        setMissionsStatusIddle: {
            reducer(state) {
                state.status = 'idle'
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchMissions.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchMissions.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.missions = action.payload
            })
            .addCase(fetchMissions.rejected, (state, action) => {
                state.missions = []
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addMission.pending, (state) => {
                state.navigate = null
            })
            .addCase(addMission.fulfilled, (state, action) => {
                state.missions.push(action.payload)
                state.navigate = action.payload.id
            })
            .addCase(updateMission.pending, (state, action) => {
                const index = state.missions.findIndex(obj => obj['@id'] === action.meta.arg['@id'])
                state.saved = state.missions[index]
                state.missions[index] = action.meta.arg
            })
            .addCase(updateMission.rejected, (state, action) => {
                const index = state.missions.findIndex(obj => obj['@id'] === action.meta.arg['@id'])
                state.missions[index] = state.saved
            })
            .addCase(updateMission.fulfilled, (state, action) => {
                const index = state.missions.findIndex(obj => obj['@id'] === action.payload['@id'])
                state.missions[index] = { ...action.payload, fulfilled: false }
            })
            .addCase(fetchMission.fulfilled, (state, action) => {
                state.navigate = null
                const index = state.missions.findIndex(obj => obj['@id'] === action.payload['@id'])
                if (index < 0)
                    state.missions.push({ ...action.payload, fulfilled: true })
                else
                    state.missions[index] = { ...action.payload, fulfilled: true }
            })
            .addCase(addPrescription.fulfilled, (state, action) => {
                const index = state.missions.findIndex(obj => obj['@id'] === action.payload.mission)
                state.missions[index].prescriptions.push(action.payload)
            })
            .addCase(addDocument.fulfilled, (state, action) => {
                const index = state.missions.findIndex(obj => obj['@id'] === action.payload.mission)
                state.missions[index].documents.push(action.payload)
            })
    }
})

export const selectAllMissions = (state) => state.missions.missions
export const getMissionsStatus = (state) => state.missions.status
export const getMissionsError = (state) => state.missions.error
export const getMissionsSaved = (state) => state.missions.saved
export const getMissionsNavigate = (state) => state.missions.navigate
export const { setMissionsStatusIddle } = missionsSlice.actions
export default missionsSlice.reducer