import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { fetchPatient, selectAllPatients } from "../features/patients/patientsSlice"
import Layout from '../layouts/Layout'
import PatientTitle from '../layouts/PatientTitle'
import PatientForm from '../forms/PatientForm'
import { FiSettings } from "react-icons/fi"
import dayjs from 'dayjs'
import Loader from '../components/Loader'

const PatientPage = () => {

    const PageContent = ({ handleOpenModal, handleCloseModal }) => {

        const { id } = useParams()
        const dispatch = useDispatch()
        const [patient, setPatient] = useState(false)
        const patients = useSelector(selectAllPatients)

        // infos // stats // invoices
        const [tab, setTab] = useState("infos")

        useEffect(() => {
            dispatch(fetchPatient(id)).then(response => setPatient(response.payload))
        }, [])

        useEffect(() => {
            if (patient) {
                const index = patients.findIndex(obj => (obj.id === Number(id)))
                setPatient(patients[index])
            }
        }, [patients])

        const PatientInfos = () => {
            return (
                <div className="flex flex-row gap-5">
                    <div className="basis-9/12 relative">

                        <FiSettings size={28} className="absolute top-5 right-5 text-action rounded-full hover:text-primary cursor-pointer"
                            onClick={() => handleOpenModal({ title: 'Edition patient', content: <PatientForm event={patient} handleCloseModal={handleCloseModal} /> })}
                        />

                        <div className="grid grid-cols-2 bg-white border p-3 gap-5">

                            <div className='flex flex-col gap-5 p-3'>
                                <div className='font-semibold'>
                                    Coordonnées
                                    <hr className='hr_separator inset-0' />
                                </div>
                                <div>
                                    Adresse : {patient.address1}
                                </div>
                                {patient.address2 &&
                                    <div>
                                        Adresse complément : {patient.address2}
                                    </div>
                                }
                                <div>
                                    NPA : {patient.npa}
                                </div>
                                <div>
                                    Canton : {patient.canton}
                                </div>
                                <div>
                                    Ville : {patient.city}
                                </div>
                                <div>
                                    Téléphone : {patient.phone}
                                </div>
                                <div>
                                    Mobile : {patient.mobile}
                                </div>
                                <div>
                                    Email : {patient.email}
                                </div>
                            </div>

                            <div className='flex flex-col gap-5 p-3'>

                                <div className='font-semibold'>
                                    Infos assuré
                                    <hr className='hr_separator' />
                                </div>
                                <div>
                                    Date de naissance :  {patient.birthdate ? dayjs(patient.birthdate).format('L') : 'non renseignée'}
                                </div>
                                <div>
                                    Numéro d'assuré :  {patient.assuranceNumber}
                                </div>
                                <div>
                                    Numéro AVS :   {patient.avsNumber}
                                </div>

                                <div className='font-semibold mt-3'>
                                    Informations complémentaires
                                    <hr className='hr_separator' />
                                </div>
                                <div className='whitespace-pre-line'>
                                    {patient.furtherInfos}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="basis-3/12 flex flex-col gap-3">

                        <div className='bg-white border rounded-sm p-5'>
                            <div className='flex items-center justify-between'>
                                <div className='font-semibold'>
                                    Médecin traitant
                                </div>
                                <div>
                                    <FiSettings size={28} className="text-action rounded-full hover:text-primary cursor-pointer"
                                        onClick={() => handleOpenModal({ title: 'Médecin Traitant', content: <PatientForm event={patient} modalAction="doctorIRI" handleCloseModal={handleCloseModal} /> })}
                                    />
                                </div>
                            </div>

                            {patient.doctor &&
                                <>
                                    <hr className='hr_separator' />
                                    <div>
                                        {patient.doctor.fullname}
                                    </div>
                                    <div className='text-slate-400'>
                                        {patient.doctor.category}
                                    </div>
                                    {patient.doctor.rcc &&
                                        <div>
                                            RCC : {patient.doctor.rcc}
                                        </div>
                                    }
                                    <div>
                                        {patient.doctor.phone}
                                    </div>
                                    <div>
                                        {patient.doctor.email}
                                    </div>
                                </>
                            }
                        </div>
                        <div className='bg-white border rounded-sm p-5'>
                            <div className='flex items-center justify-between'>
                                <div className='font-semibold'>
                                    Assurance
                                </div>
                                <div>
                                    <FiSettings size={28} className="text-action rounded-full hover:text-primary cursor-pointer"
                                        onClick={() => handleOpenModal({ title: 'Assurance', content: <PatientForm event={patient} modalAction="assuranceIRI" handleCloseModal={handleCloseModal} /> })}
                                    />
                                </div>
                            </div>

                            {patient.assurance &&
                                <>
                                    <hr className='hr_separator' />
                                    <div>
                                        {patient.assurance.company}
                                    </div>
                                    <div className='text-slate-400'>
                                        {patient.assurance.type}
                                    </div>
                                    <div>
                                        GLN : {patient.assurance.gln}
                                    </div>
                                </>
                            }
                        </div>
                    </div>



                </div>
            )
        }

        const PatientStats = () => {
            return (
                <h1>schedules</h1>
            )
        }

        const PatientInvoices = () => {
            return (
                <h1>invoices</h1>

            )
        }


        if (!patient) return <Loader />
        else
            return (
                <>
                    <PatientTitle patient={patient} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} />
                    <div className='bg-white  flex border rounded-sm col-span-3 mb-5'>
                        <div className={`w-full p-3 text-center ${tab === "infos" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("infos")}>Infos</div>
                        <div className={`w-full p-3 text-center ${tab === "stats" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("stats")}>Documents</div>
                        <div className={`w-full p-3 text-center ${tab === "invoices" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("invoices")}>Facturation</div>
                    </div>
                    {tab === "infos" && <PatientInfos />}
                    {tab === "stats" && <PatientStats />}
                    {tab === "invoices" && <PatientInvoices />}
                </>
            )

    }


    return (
        <Layout>
            <PageContent />
        </Layout>
    )
}

export default PatientPage