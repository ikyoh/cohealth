import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useGetOneData, usePutData } from '../queryHooks/useMission'
import { useGetIRI as Patient } from '../queryHooks/usePatient'
import { useGetIRI as Doctor } from '../queryHooks/useDoctor'
import { useGetIRI as Assurance } from '../queryHooks/useAssurance'
import { IoPersonCircleOutline } from "react-icons/io5"
import { MdPendingActions, MdArrowBack } from "react-icons/md";
import { HiOutlinePaperClip } from "react-icons/hi"
import { AiOutlineFolderOpen } from "react-icons/ai"
import { FaHandshake } from "react-icons/fa";
import * as dayjs from 'dayjs'
import DocumentForm from '../forms/DocumentForm'
import Loader from '../components/Loader'
import { calcNumberOfDays } from '../utils/functions'
import Dropdown from '../components/dropdown/Dropdown'
import { useModal } from '../hooks/useModal'
import PageTitle from '../layouts/PageTitle'
import Button from '../components/buttons/Button'
import MissionForm from '../forms/MissionForm'
import PatientForm from '../forms/PatientForm'
import MissionStatus from '../components/mission_status/MissionsStatus'
import OpasCard from '../components/opas/OpasCard'
import MissionDocument from '../components/mission_document/MissionDocument'
import MissionPartner from '../components/mission_partner/MissionPartner'
import MissionPartnerForm from '../forms/MissionPartnerForm'
import { useQueryClient } from '@tanstack/react-query'
import { URL } from '../features/apiConfig';
import { missionStatus } from '../utils/arrays'
import _ from 'lodash'

const MandatePage = () => {

    const navigate = useNavigate();
    const { state: previousPageState } = useLocation();
    const { id } = useParams()
    const { data, isLoading, error } = useGetOneData(id)
    const { data: patient, isLoading: isLoadingPatient, error: errorPatient } = Patient(data && data.patient ? data.patient : null)
    const { data: doctor, isLoading: isLoadingDoctor, error: errorDoctor } = Doctor(data && data.doctor ? data.doctor : null)
    const { data: assurance, isLoading: isLoadingAssurance, error: errorAssurance } = Assurance(data && data.assurance ? data.assurance : null)
    const { Modal, handleOpenModal, handleCloseModal } = useModal()
    const [tab, setTab] = useState("infos")
    const { mutate } = usePutData()

    const queryClient = useQueryClient()
    const account = queryClient.getQueryData(['account'])


    const [isMine, setIsMine] = useState(false)

    useEffect(() => {
        if (data) {
            if (account.id === data.user.id) setIsMine(true)
        }
    }, [data])

    const handleChangeStatus = (status) => {
        mutate({ id: data.id, status: status })
    }


    const MissionInfos = () => {

        if (!data) return null
        else return (
            <div className="grid md:grid-cols-12 gap-5">
                <div className="md:col-span-4 relative bg-white border p-5 pt-20 flex flex-col gap-5">
                    {isMine &&
                        <Dropdown type='card'>
                            <button
                                onClick={() => handleOpenModal({ title: "Edition de la mission", content: <MissionForm action="mission" iri={data['@id']} handleCloseModal={handleCloseModal} /> })}>
                                Editer la mission
                            </button>
                            <button
                                onClick={() => handleOpenModal({ title: "Edition du médecin", content: <MissionForm action="doctorIRI" iri={data['@id']} handleCloseModal={handleCloseModal} /> })}>
                                Editer le médecin mandataire
                            </button>
                            <button
                                onClick={() => handleOpenModal({ title: "Edition de l'assurance'", content: <MissionForm action="assuranceIRI" iri={data['@id']} handleCloseModal={handleCloseModal} /> })}>
                                Editer l'assurance
                            </button>
                            <span>
                                Statut de la mission
                            </span>
                            <button
                                className='flex items-center gap-2'
                                onClick={() => handleChangeStatus("en cours")}>
                                <div className={`rounded-full w-4 h-4 ${missionStatus["en cours"]}`}>
                                </div>
                                En cours
                            </button>
                            <button
                                className='flex items-center gap-2'
                                onClick={() => handleChangeStatus("annulé")}>
                                <div className={`rounded-full w-4 h-4 ${missionStatus["annulé"]}`}>
                                </div>
                                Annulé
                            </button>
                            <button
                                className='flex items-center gap-2'
                                onClick={() => handleChangeStatus("archivé")}>
                                <div className={`rounded-full w-4 h-4 ${missionStatus["archivé"]}`}>
                                </div>
                                Archivé
                            </button>
                        </Dropdown>
                    }
                    <div className='bg-slate-200 rounded-br-full px-3 flex items-center gap-1 absolute top-0 left-0 h-11 w-44 font-bold uppercase'>
                        <MdPendingActions size={36} />
                        Mission
                    </div>

                    <div className='font-bold first-letter flex items-center gap-5'>
                        <div>
                            {data.beginAt &&
                                "Du " + dayjs(data.beginAt).format('DD/MM/YYYY')
                            }
                            {data.endAt &&
                                " au " + dayjs(data.endAt).format('DD/MM/YYYY')
                            }
                            {data.beginAt && data.endAt ?
                                " (" + calcNumberOfDays(data.beginAt, data.endAt) + " jours)"
                                : null
                            }
                        </div>
                    </div>
                    <hr className='hr_info inset-0' />
                    <div>
                        <div className='font-bold flex items-center gap-3 mb-2'>
                            Synthèse de la mission
                            <hr className='hr_separator inset-0' />
                        </div>
                        <div className='whitespace-pre-line'>
                            {data.description}
                        </div>
                    </div>
                    <div>
                        <div className='font-bold flex items-center gap-3 mb-2'>
                            Médecin mandataire
                            <hr className='hr_separator inset-0' />
                        </div>
                        <div className='whitespace-pre-line'>
                            {doctor ?
                                <>
                                    <div>
                                        {doctor.fullname}
                                    </div>
                                    <div className='text-slate-400'>
                                        {doctor.category}
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div>
                                            {doctor.phone &&
                                                "Téléphone: " + doctor.phone}
                                        </div>
                                        <div>
                                            {doctor.email &&
                                                "Email: " + doctor.email}
                                        </div>
                                    </div>
                                </>
                                : <span className="px-3 py-1 uppercase text-xs rounded-full text-white bg-error">
                                    A renseigner
                                </span>
                            }
                        </div>
                    </div>
                    <div>
                        <div className='font-bold flex items-center gap-3 mb-2'>
                            Assurance
                            <hr className='hr_separator inset-0' />
                        </div>
                        <div className='whitespace-pre-line'>
                            {assurance ?
                                <>
                                    <div>
                                        {assurance.company}
                                    </div>
                                    <div className='text-slate-400'>
                                        {assurance.type}
                                    </div>
                                </>
                                : <span className="px-3 py-1 uppercase text-xs rounded-full text-white bg-error">
                                    A renseigner
                                </span>
                            }
                        </div>
                    </div>
                </div>


                <div className="md:col-span-4 relative bg-white border p-5 pt-20 flex flex-col gap-5">
                    {isMine &&
                        <Dropdown type='card'>
                            <button
                                onClick={() => handleOpenModal({ title: "édition du patient", content: <PatientForm iri={patient['@id']} handleCloseModal={handleCloseModal} /> })}>
                                Editer le patient
                            </button>
                        </Dropdown>
                    }
                    <div className='bg-slate-200 rounded-br-full px-3 flex items-center gap-1 absolute top-0 left-0 h-11 w-44 font-bold uppercase'>
                        <IoPersonCircleOutline size={36} />
                        Patient
                    </div>

                    {
                        patient &&
                        <>
                            <div className='font-bold first-letter flex items-center gap-5'>
                                <div>
                                    {patient.gender === "homme" ? " Mr " : " Mme "}
                                    {patient.firstname + " " + patient.lastname + " "}
                                    ({dayjs().diff(patient.birthdate, 'years')} ans)
                                </div>
                            </div>
                            <hr className='hr_info' />
                            <div>
                                <div className='font-bold flex items-center gap-3 mb-2'>
                                    Infos assuré
                                    <hr className='hr_separator' />
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    {patient.birthdate &&
                                        <div>
                                            {patient.gender === 'hommme' ? "Né le : " : "Née le : "}
                                            {dayjs(patient.birthdate).format('DD/MM/YYYY')}
                                        </div>
                                    }
                                    <div>
                                        Numéro d'assuré : {patient.assuranceNumber}
                                    </div>
                                    <div>
                                        Numéro AVS : {patient.avsNumber}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='font-bold flex items-center gap-3 mb-2'>
                                    Coordonnées
                                    <hr className='hr_separator' />
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    <div>
                                        Adresse : {patient.address1}
                                    </div>
                                    {patient.address2 &&
                                        <div>
                                            Complèment d'adresse : {patient.address2}
                                        </div>
                                    }
                                    <div>
                                        Ville : {patient.city}
                                    </div>
                                    {patient.phone &&
                                        <div>
                                            Téléphone : {patient.phone}
                                        </div>
                                    }
                                    {patient.mobile &&
                                        <div>
                                            Mobile : {patient.mobile}
                                        </div>
                                    }
                                    {patient.email &&
                                        <div>
                                            Email : {patient.email}
                                        </div>
                                    }
                                </div>
                            </div>

                            {patient.furtherInfos &&
                                <div className='col-span-2'>
                                    <div className='font-bold flex items-center gap-3 mb-2'>
                                        Informations complémentaires
                                        <hr className='hr_separator' />
                                    </div>
                                    <div className='whitespace-pre-line'>
                                        {patient.furtherInfos}
                                    </div>
                                </div>
                            }
                        </>
                    }

                </div>
                <div className="md:col-span-4 flex flex-col gap-3">

                    <div className='bg-white border rounded-sm p-5 pt-16 relative'>
                        <div className='bg-slate-200 rounded-br-full px-3 flex items-center gap-1 absolute top-0 left-0 h-11 w-44 font-bold uppercase'>
                            <HiOutlinePaperClip size={30} />
                            Statut
                        </div>
                        <MissionStatus mission={data} />
                        {isMine &&
                            <Dropdown type='card'>
                                <button
                                    className='flex items-center gap-2'
                                    onClick={() => handleChangeStatus("en cours")}>
                                    <div className={`rounded-full w-4 h-4 ${missionStatus["en cours"]}`}>
                                    </div>
                                    En cours
                                </button>
                                <button
                                    className='flex items-center gap-2'
                                    onClick={() => handleChangeStatus("annulé")}>
                                    <div className={`rounded-full w-4 h-4 ${missionStatus["annulé"]}`}>
                                    </div>
                                    Annulé
                                </button>
                                <button
                                    className='flex items-center gap-2'
                                    onClick={() => handleChangeStatus("archivé")}>
                                    <div className={`rounded-full w-4 h-4 ${missionStatus["archivé"]}`}>
                                    </div>
                                    Archivé
                                </button>
                            </Dropdown>
                        }
                    </div>
                    {!isMine &&
                        <div className='bg-white border rounded-sm p-5 pt-16 relative'>
                            <div className='bg-slate-200 rounded-br-full px-3 flex items-center gap-1 absolute top-0 left-0 h-11 w-44 font-bold uppercase'>
                                <HiOutlinePaperClip size={30} />
                                Référent
                            </div>
                            <div className='flex items-center text-sm gap-2'>
                                {data.user.avatar
                                    ? <img src={URL + data.user.avatar.contentUrl} className='rounded-full object-cover h-10 w-10' alt="profil" />
                                    : <div className='rounded-full flex items-center h-10 justify-center w-10 bg-info'>
                                        {data.user.firstname && data.user.firstname.charAt(0)}
                                        {data.user.lastname && data.user.lastname.charAt(0)}
                                        {data.user.organization && data.user.organization.charAt(0).toUpperCase()}
                                    </div>
                                }
                                <p>{data.user.firstname} {data.user.lastname} {data.user.organization}</p>
                            </div>
                        </div>
                    }

                    {data.doctor && data.assurance &&
                        <OpasCard iri={data.prescriptions[0] || false} missionIRI={data['@id']} isMine={isMine} />
                    }

                    <div className='bg-white border rounded-sm p-5 pt-16 relative'>
                        {isMine &&
                            <Dropdown type='card'>
                                <button
                                    onClick={() => handleOpenModal({ title: 'Partenaires', content: <MissionPartnerForm iri={data["@id"]} partners={data.coworkers} handleCloseModal={handleCloseModal} /> })}
                                >
                                    Editer les partenaires
                                </button>
                            </Dropdown>
                        }
                        <div className='bg-slate-200 rounded-br-full px-3 flex items-center gap-1 absolute top-0 left-0 h-11 w-44 font-bold uppercase'>
                            <FaHandshake size={30} />
                            Partenaires
                        </div>
                        <MissionPartner partners={data.coworkers} />
                    </div>

                    <div className='bg-white border rounded-sm p-5 pt-16 relative'>
                        {isMine &&
                            <Dropdown type="card">
                                <button
                                    onClick={() => handleOpenModal({ title: 'Nouveau document', content: <DocumentForm event={false} missionID={data.id} handleCloseModal={handleCloseModal} /> })}
                                >
                                    Ajouter un document
                                </button>
                            </Dropdown>
                        }
                        <div className='bg-slate-200 rounded-br-full px-3 flex items-center gap-1 absolute top-0 left-0 h-11 w-44 font-bold uppercase'>
                            <AiOutlineFolderOpen size={30} />
                            Documents
                        </div>

                        {data.documents.length === 0 && "Aucun document"}
                        {data.documents.map(document =>
                            <MissionDocument key={document["@id"]} iri={document["@id"]} />
                        )}

                    </div>

                </div>

            </div>
        )
    }

    const MissionSchedules = () => {
        return (
            <h1>schedules</h1>
        )
    }

    const MissionInvoices = () => {
        return (
            <h1>invoices</h1>
        )
    }

    if (!data && !patient) return <Loader />
    else return (
        <>
            <Modal />
            <PageTitle title="Mission"
                icon={<IoPersonCircleOutline size={40} />}
                mainButton={_.isEmpty(previousPageState)
                    ?
                    <Button
                        onClick={() => navigate(-1)}
                    >
                        <MdArrowBack />
                    </Button>
                    :
                    <Button
                        onClick={() => navigate(-1, { state: previousPageState })}
                    >
                        <MdArrowBack />
                    </Button>
                }
            >
            </PageTitle>

            <div className='px-5 pb-5 md:px-0 md:pb-0'>
                <div className='bg-slate-200 flex border rounded-sm mb-5'>
                    <div className={`grow md:grow-0 md:px-8 py-3 text-center ${tab === "infos" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("infos")}>Informations</div>
                    <div className={`grow md:grow-0 md:px-8 py-3 text-center ${tab === "schedules" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("schedules")}>Planning</div>
                    <div className={`grow md:grow-0 md:px-8 py-3 text-center ${tab === "invoices" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("invoices")}>Facturation</div>
                </div>
                <div>
                    {tab === "infos" && <MissionInfos />}
                    {tab === "schedules" && <MissionSchedules />}
                    {tab === "invoices" && <MissionInvoices />}
                </div>
            </div>
        </>
    )

}

export default MandatePage