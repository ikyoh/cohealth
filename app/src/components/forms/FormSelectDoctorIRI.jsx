import React, { useState } from 'react'
import DoctorsContainer from '../../features/doctors/DoctorsContainer'
import SearchFilter from '../SearchFilter'
import { ErrorMessage } from 'formik'


const FormSelectDoctorIRI = ({ name = false, setField, value }) => {

    const [search, setSearch] = useState('')

    const Doctor = ({ item }) => {
        return (
            <div className={`border-b px-3 py-2 flex justify-between ${value === item.id ? 'bg-action' : 'hover:bg-slate-200 cursor-pointer'}`}
                onClick={() => setField('doctorIRI', item.id)}
            >
                <div>{item.fullname} <span className='pl-3 text-slate-400'>{item.category}</span></div>
                {item.rcc &&
                    <div>RCC : {item.rcc}</div>
                }
            </div>
        )
    }

    return (
        <>
            <div className='-top-5 py-3 sticky bg-white flex justify-between gap-3 items-center border-b'>
                <SearchFilter value={search} handleSearch={({ currentTarget }) => setSearch(currentTarget.value)} />
                <ErrorMessage name='doctorIRI' render={msg => <div className="error">({msg})</div>} />
            </div>

            <DoctorsContainer search={search}>
                <Doctor />
            </DoctorsContainer>
        </>
    )
}

export default FormSelectDoctorIRI