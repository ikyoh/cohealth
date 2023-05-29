import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useGetOneData } from '../queryHooks/usePatient'
import { useGetIRI as Doctor } from '../queryHooks/useDoctor'
import { useGetIRI as Assurance } from '../queryHooks/useAssurance'
import { useModal } from '../hooks/useModal'
import PatientTitle from '../layouts/PatientTitle'
import PatientForm from '../forms/PatientForm'
import dayjs from 'dayjs'
import Loader from '../components/Loader'
import Dropdown from '../components/dropdown/Dropdown'
import uuid from "react-uuid"
import { IoPersonCircleOutline } from "react-icons/io5"
import { RiStethoscopeFill } from "react-icons/ri";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import PageTitle from '../layouts/PageTitle'
import { MdPendingActions, MdArrowBack } from "react-icons/md";
import Button from '../components/buttons/Button'

const PatientPage = () => {

    const navigate = useNavigate();
    const { state: previousPageState } = useLocation();
    const { id } = useParams()
    const { data, isLoading, error } = useGetOneData(id)
    const { Modal, handleOpenModal, handleCloseModal } = useModal()
    const [tab, setTab] = useState("infos")


    console.log('data', data)

    const DoctorCard = ({ iri }) => {

        const { data, isLoading, error } = Doctor(iri ? iri : null)

        if (isLoading) return <Loader />
        if (!data) return null
        else return (
            <>
                <div>
                    {data.fullname}
                </div>
                <div className='text-slate-400'>
                    {data.category}
                </div>
                {data.rcc &&
                    <div>
                        RCC : {data.rcc}
                    </div>
                }
                <div>
                    {data.phone}
                </div>
                <div>
                    {data.email}
                </div>
            </>
        )
    }
    const AssuranceCard = ({ iri }) => {

        const { data, isLoading, error } = Assurance(iri ? iri : null)

        if (isLoading) return <Loader />
        if (!data) return null
        else return (
            <>
                <div>
                    {data.company}
                </div>
                <div className='text-slate-400'>
                    {data.type}
                </div>
                <div>
                    GLN : {data.gln}
                </div>
            </>
        )
    }


    const PatientInfos = () => {
        return (
            <div className="flex flex-row gap-5">
                <div className="basis-9/12 relative">
                    <div className="grid grid-cols-2 bg-white border rounded-sm p-5 pt-20 relative">
                        <div className='bg-slate-200 rounded-br-full px-3 flex items-center gap-1 absolute top-0 left-0 h-11 w-44 font-bold uppercase'>
                            <IoPersonCircleOutline size={36} />
                            Patient
                        </div>
                        <Dropdown type='card'>
                            <button
                                onClick={() => handleOpenModal({ title: 'Edition patient', content: <PatientForm iri={data['@id']} handleCloseModal={handleCloseModal} /> })}
                            >
                                Modifier le patient
                            </button>
                        </Dropdown>
                        <div className='flex flex-col gap-5 p-3 relative'>
                            <div className='font-semibold'>
                                Coordonnées
                                <hr className='hr_separator inset-0' />
                            </div>
                            <div>
                                Adresse : {data.address1}
                            </div>
                            {data.address2 &&
                                <div>
                                    Adresse complément : {data.address2}
                                </div>
                            }
                            <div>
                                NPA : {data.npa}
                            </div>
                            <div>
                                Canton : {data.canton}
                            </div>
                            <div>
                                Ville : {data.city}
                            </div>
                            {data.phone &&
                                <div>
                                    Téléphone : {data.phone}
                                </div>
                            }
                            {data.mobile &&
                                <div>
                                    Mobile : {data.mobile}
                                </div>
                            }
                            {data.email &&
                                <div>
                                    Email : {data.email}
                                </div>
                            }
                        </div>

                        <div className='flex flex-col gap-5 p-3'>

                            <div className='font-semibold'>
                                Infos assuré
                                <hr className='hr_separator' />
                            </div>
                            <div>
                                Date de naissance : {data.birthdate ? dayjs(data.birthdate).format('L') : 'non renseignée'}
                            </div>
                            <div>
                                Age : {dayjs().diff(data.birthdate, 'years')} ans
                            </div>
                            <div>
                                Numéro d'assuré : {data.assuranceNumber}
                            </div>
                            <div>
                                Numéro AVS : {data.avsNumber}
                            </div>
                            {data.furtherInfos &&
                                <>
                                    <div className='font-semibold mt-3'>
                                        Informations complémentaires
                                        <hr className='hr_separator' />
                                    </div>
                                    <div className='whitespace-pre-line'>
                                        {data.furtherInfos}
                                    </div>
                                </>
                            }
                        </div>

                    </div>
                </div>

                <div className="basis-3/12 flex flex-col gap-3">

                    <div className='bg-white border rounded-sm p-5 pt-16 relative'>
                        <Dropdown type='card'>
                            <button
                                onClick={() => handleOpenModal({ title: 'Médecin Traitant', content: <PatientForm iri={data['@id']} action="doctorIRI" handleCloseModal={handleCloseModal} /> })}
                            >
                                Modifier le médecin
                            </button>
                        </Dropdown>
                        <div className='bg-slate-200 rounded-br-full px-3 flex items-center gap-1 absolute top-0 left-0 h-11 w-44 font-bold uppercase'>
                            <RiStethoscopeFill size={36} />
                            Médecin
                        </div>
                        {data && data.doctor &&
                            <DoctorCard iri={data.doctor} />
                        }
                        {/* {data.missions.length > 0 &&
                            <div className='bg-white border rounded-sm p-5 relative'>
                                <div className='flex items-center justify-between'>
                                    <div className='font-semibold'>
                                        Autres médecins
                                    </div>
                                </div>
                                {data.missions.map(mission =>
                                    <DoctorCard key={uuid()} iri={mission.doctor} />
                                )
                                }
                            </div>
                        } */}
                    </div>
                    <div className='bg-white border rounded-sm p-5 pt-16 relative'>
                        <Dropdown type='card'>
                            <button
                                onClick={() => handleOpenModal({ title: 'Assurance', content: <PatientForm iri={data['@id']} action="assuranceIRI" handleCloseModal={handleCloseModal} /> })}
                            >
                                Modifier l'assurance
                            </button>
                        </Dropdown>
                        <div className='bg-slate-200 rounded-br-full px-3 flex items-center gap-1 absolute top-0 left-0 h-11 w-44 font-bold uppercase'>
                            <MdOutlineHealthAndSafety size={36} />
                            Assurance
                        </div>
                        {data && data.assurance &&
                            <AssuranceCard iri={data.assurance} />
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

    if (!data) return <Loader />
    else
        return (
            <>
                <Modal />
                <PageTitle
                    title={data.gender === "homme" ? "Mr " : "Mme " + data.firstname + " " + data.lastname}
                    icon={<MdPendingActions size={40} />}>
                    {_.isEmpty(previousPageState)
                        ?
                        <Button
                            onClick={() => navigate(-1)}
                        >
                            <MdArrowBack />
                        </Button>
                        :
                        <Button
                            onClick={() => navigate("/patients", { state: previousPageState })}
                        >
                            <MdArrowBack />
                        </Button>
                    }
                </PageTitle>
                <div className='bg-slate-200  flex border rounded-sm col-span-3 mb-5'>
                    <div className={`px-8 py-3 text-center ${tab === "infos" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("infos")}>Informations</div>
                    <div className={`px-8 py-3 text-center ${tab === "stats" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("stats")}>Documents</div>
                    <div className={`px-8 py-3 text-center ${tab === "invoices" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("invoices")}>Facturation</div>
                    <div className="w-full"></div>
                </div>

                {tab === "infos" && <PatientInfos />}
                {tab === "stats" && <PatientStats />}
                {tab === "invoices" && <PatientInvoices />}
            </>
        )

}

export default PatientPage