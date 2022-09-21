import React, { useState } from 'react'
import PatientsContainer from '../../features/patients/PatientsContainer'
import SearchFilter from '../SearchFilter'
import { ErrorMessage } from 'formik'


const FormSelectPatientIRI = ({ name = false, setField, value }) => {

    const [search, setSearch] = useState('')

    const Patient = ({ item }) => {
        return (
            <div className={`border-b px-3 py-2 flex justify-between ${value === item.id ? 'bg-action' : 'hover:bg-slate-200 cursor-pointer'}`}
                onClick={() => setField('patientIRI', item.id)}
            >
                <div>
                    {item.firstname} {item.lastname}
                </div>
                <div>
                    {item.canton}
                </div>
            </div>
        )
    }

    return (
        <>
            <div className='-top-5 py-3 sticky bg-white flex justify-between gap-3 items-center border-b'>
                <SearchFilter value={search} handleSearch={({ currentTarget }) => setSearch(currentTarget.value)} />
                <ErrorMessage name='patientIRI' render={msg => <div className="error">({msg})</div>} />
            </div>
            <PatientsContainer search={search}>
                <Patient />
            </PatientsContainer>
        </>
    )
}

export default FormSelectPatientIRI