import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiFillPlusCircle } from "react-icons/ai"
import { MdPendingActions } from "react-icons/md";
import * as dayjs from 'dayjs'

const MissionTitle = ({ mission = false, patient = false, children }) => {

    if (!mission || !patient) return null
    else return (
        <div className='flex flex-col md:flex-row justify-between mb-3 h-20'>
            <div className='flex flex-col md:flex-row items-center gap-3'>
                <MdPendingActions size={40} />
                <div className='font-medium text-2xl'>
                    Mission
                </div>
                <div className='flex pt-1'>
                    {patient.gender === "homme" ? "Mr " : "Mme "}
                    {patient.firstname} {patient.lastname}
                    {patient.birthdate &&
                        " (" + dayjs().diff(patient.birthdate, 'years') + " ans)"
                    }
                    {mission.beginAt &&
                        " du " + dayjs(mission.beginAt).format('DD/MM/YYYY')
                    }
                    {mission.endAt &&
                        " au " + dayjs(mission.endAt).format('DD/MM/YYYY')
                    }
                    {mission.beginAt && mission.endAt ?
                        " (" + dayjs(mission.endAt).diff(mission.beginAt, 'days') + " jours)"
                        : null
                    }
                </div>

            </div>
            <div className='flex items-center gap-10'>
                <div className='flex gap-3'>
                    {children}
                </div>
                <div className='transform rotate-45'>
                    <NavLink to="/missions">
                        <AiFillPlusCircle size={52} className='text-action rounded-full hover:text-primary' />
                    </NavLink>
                </div>
            </div>
        </div>

    )
}

export default MissionTitle