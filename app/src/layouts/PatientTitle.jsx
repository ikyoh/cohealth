import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiFillPlusCircle } from "react-icons/ai"
import { IoPersonCircleOutline } from "react-icons/io5"
import dayjs from 'dayjs';



const PatientTitle = ({ patient = false }) => {

    if (!patient) return null
    else return (
        <div className='flex justify-between mb-3 h-20'>
            <div className='flex items-center space-x-3'>

                <IoPersonCircleOutline size={40} />
                <span className='font-medium text-2xl'>
                    {patient.gender === "homme" ? "Mr " : "Mme "}
                    {patient.firstname} {patient.lastname}
                </span>
                {patient.birthdate &&
                    <span className='font-light text-2xl'>
                        ({dayjs().diff(patient.birthdate, 'years')} ans)
                    </span>
                }
            </div>
            <div className='flex items-center space-x-10'>
                <div className='origin-center rotate-45'>
                    <NavLink to="/patients">
                        <AiFillPlusCircle size={52} className="text-action rounded-full hover:text-primary" />
                    </NavLink>
                </div>
            </div>
        </div>

    )
}

export default PatientTitle