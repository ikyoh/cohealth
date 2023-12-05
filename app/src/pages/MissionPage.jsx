import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useGetOneData, usePutData } from '../queryHooks/useMission'
import { useGetIRI as mandate } from '../queryHooks/useMandate'
import { useGetIRI as Doctor } from '../queryHooks/useDoctor'
import { useGetIRI as Assurance } from '../queryHooks/useAssurance'
import { IoPersonCircleOutline } from "react-icons/io5"
import { MdPendingActions, MdArrowBack, MdOutlineHealthAndSafety } from "react-icons/md";
import { HiOutlinePaperClip, HiDownload } from "react-icons/hi"
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
import uuid from 'react-uuid'
import { downloadFile } from '../utils/functions'
import { RiStethoscopeFill } from 'react-icons/ri'

const MissionPage = () => {

    const navigate = useNavigate();
    const { state: previousPageState } = useLocation();
    const { id } = useParams()
    const { data } = useGetOneData(id)
    const { data: doctor } = Doctor(data && data.doctor ? data.doctor : null)
    const { data: assurance } = Assurance(data && data.assurance ? data.assurance : null)
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

                    {!account.roles.includes('ROLE_DOCTOR') &&
                        <div>
                            <div className='font-bold flex items-center gap-3 mb-2'>
                                Médecin mandant
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
                                        {doctor.phone &&
                                            <div>
                                                Téléphone: {doctor.phone}
                                            </div>
                                        }
                                        {doctor.email &&
                                            <div>
                                                Email: {doctor.email}
                                            </div>
                                        }
                                    </>
                                    : <span className="px-3 py-1 uppercase text-xs rounded-full text-white bg-error">
                                        A renseigner
                                    </span>
                                }
                            </div>
                        </div>}
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
                    <div className='bg-slate-200 rounded-br-full px-3 flex items-center gap-1 absolute top-0 left-0 h-11 w-44 font-bold uppercase'>
                        <IoPersonCircleOutline size={36} />
                        Patient
                    </div>


                    <div className='font-bold first-letter flex items-center gap-5'>
                        <div>
                            {data.patient.gender === "homme" ? " Mr " : " Mme "}
                            {data.patient.firstname + " " + data.patient.lastname + " "}
                            ({dayjs().diff(data.patient.birthdate, 'years')} ans)
                        </div>
                    </div>
                    <hr className='hr_info' />
                    <div>
                        <div className='font-bold flex items-center gap-3 mb-2'>
                        {data.patient.gender === 'homme' ? "Infos assuré" : "Infos assurée"}
                            <hr className='hr_separator' />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {data.patient.birthdate &&
                                <div>
                                    {data.patient.gender === 'homme' ? "Né le : " : "Née le : "}
                                    {dayjs(data.patient.birthdate).format('DD/MM/YYYY')}
                                </div>
                            }
                            <div>
                                Numéro d'assuré : {data.patient.assuranceNumber}
                            </div>
                            <div>
                                Numéro AVS : {data.patient.avsNumber}
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
                                Adresse : {data.patient.address1}
                            </div>
                            {data.patient.address2 &&
                                <div>
                                    Complèment d'adresse : {data.patient.address2}
                                </div>
                            }
                            <div>
                                Ville : {data.patient.city}
                            </div>
                            {data.patient.phone &&
                                <div>
                                    Téléphone : {data.patient.phone}
                                </div>
                            }
                            {data.patient.mobile &&
                                <div>
                                    Mobile : {data.patient.mobile}
                                </div>
                            }
                            {data.patient.email &&
                                <div>
                                    Email : {data.patient.email}
                                </div>
                            }
                        </div>
                    </div>

                    {data.patient.furtherInfos &&
                        <div className='col-span-2'>
                            <div className='font-bold flex items-center gap-3 mb-2'>
                                Informations complémentaires
                                <hr className='hr_separator' />
                            </div>
                            <div className='whitespace-pre-line'>
                                {data.patient.furtherInfos}
                            </div>
                        </div>

                    }

                </div>
                <div className="md:col-span-4 flex flex-col gap-3">

                    <div className='bg-white border rounded-sm p-5 pt-16 relative'>
                        <div className='bg-slate-200 rounded-br-full px-3 flex items-center gap-1 absolute top-0 left-0 h-11 w-44 font-bold uppercase'>
                            <HiOutlinePaperClip size={30} />
                            Statut
                        </div>
                        <MissionStatus mission={data} />
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

                    <div className='bg-white border rounded-sm p-5 pt-16 relative'>
                        <div className='bg-slate-200 rounded-br-full px-3 flex items-center gap-1 absolute top-0 left-0 h-11 w-44 font-bold uppercase'>
                            <FaHandshake size={30} />
                            Partenaires
                        </div>
                        <MissionPartner partners={data.coworkers} />
                    </div>

                    {!account.roles.includes('ROLE_DOCTOR') &&
                        <div className='bg-white border rounded-sm p-5 pt-16 relative'>
                            <div className='bg-slate-200 rounded-br-full pl-3 pr-4 flex items-center gap-1 absolute top-0 left-0 h-11 w-auto font-bold uppercase'>
                                <AiOutlineFolderOpen size={30} />
                                Documents {data.documents.length}
                            </div>

                            {data.documents.length === 0 ? "Aucun document" :
                                <div className='h-[240px] overflow-y-auto pr-3'>
                                    {data.documents.map(document =>
                                        <MissionDocument key={document["@id"]} iri={document["@id"]} isMine={isMine} />
                                    )}
                                </div>
                            }

                        </div>
                    }


                    {data.mandate &&
                        <MandateDocuments iri={data.mandate['@id']} />
                    }

                </div>

            </div>
        )
    }

    const MissionSchedules = () => {
        return (
            <h1>En cours de développement</h1>
        )
    }

    const MissionInvoices = () => {
        return (
            <h1>En cours de développement</h1>
        )
    }

    if (!data) return <Loader />
    else return (
        <>
            <Modal />
            <PageTitle title={!account.roles.includes('ROLE_DOCTOR') ? "Mission" : data.mandate.category}
                icon={<MdPendingActions size={40} />}
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
                {data.doctor && data.assurance &&
                    <OpasCard iri={data.opas || false} missionIRI={data['@id']} isMine={isMine} />
                }
                {account.roles.includes('ROLE_DOCTOR') &&
                    <Dropdown type='button'>
                        <button
                            onClick={() => handleOpenModal({ title: 'Nouveau document', content: <DocumentForm event={false} mandateID={data.mandate.id} handleCloseModal={handleCloseModal} /> })}
                        >
                            Ajouter un document
                        </button>
                    </Dropdown>
                }
                {isMine &&
                    <Dropdown type='button'>
                        <button type='button'
                            onClick={() => handleOpenModal({ title: "Edition de la mission", content: <MissionForm action="mission" iri={data['@id']} handleCloseModal={handleCloseModal} /> })}>
                            <MdPendingActions size={20} />
                            Éditer la mission
                        </button>
                        <button
                            type='button'
                            onClick={() => handleOpenModal({ title: "édition du patient", content: <PatientForm iri={data.patient['@id']} handleCloseModal={handleCloseModal} /> })}>
                            <IoPersonCircleOutline size={20} />
                            Éditer le patient
                        </button>
                        <button
                            type='button'
                            onClick={() => handleOpenModal({ title: "Edition du médecin", content: <MissionForm action="doctorIRI" iri={data['@id']} handleCloseModal={handleCloseModal} /> })}>
                            <RiStethoscopeFill size={20} />
                            Éditer le médecin mandant
                        </button>
                        <button
                            type='button'
                            onClick={() => handleOpenModal({ title: "Edition de l'assurance'", content: <MissionForm action="assuranceIRI" iri={data['@id']} handleCloseModal={handleCloseModal} /> })}>
                            <MdOutlineHealthAndSafety size={20} />
                            Éditer l'assurance
                        </button>
                        <button
                            type='button'
                            onClick={() => handleOpenModal({ title: 'Partenaires', content: <MissionPartnerForm iri={data["@id"]} partners={data.coworkers} handleCloseModal={handleCloseModal} /> })}
                        >
                            <FaHandshake size={20} />
                            Éditer les partenaires
                        </button>
                        <button
                            type='button'
                            onClick={() => handleOpenModal({ title: 'Nouveau document', content: <DocumentForm event={false} missionID={data.id} handleCloseModal={handleCloseModal} /> })}
                        >
                            <AiOutlineFolderOpen size={20} />
                            Ajouter un document
                        </button>
                        <p>
                            Statut de la mission
                        </p>
                        <button
                            type='button'
                            className='flex items-center gap-2'
                            onClick={() => handleChangeStatus("en cours")}>
                            <div className={`rounded-full w-4 h-4 ${missionStatus["en cours"]}`}>
                            </div>
                            En cours
                        </button>
                        <button
                            type='button'
                            className='flex items-center gap-2'
                            onClick={() => handleChangeStatus("annulé")}>
                            <div className={`rounded-full w-4 h-4 ${missionStatus["annulé"]}`}>
                            </div>
                            Annulé
                        </button>
                        <button
                            type='button'
                            className='flex items-center gap-2'
                            onClick={() => handleChangeStatus("archivé")}>
                            <div className={`rounded-full w-4 h-4 ${missionStatus["archivé"]}`}>
                            </div>
                            Archivé
                        </button>
                    </Dropdown>
                }
            </PageTitle>

            <div className='px-5 pb-5 md:px-0 md:pb-0'>
                {!account.roles.includes('ROLE_DOCTOR') &&
                    <div className='bg-slate-200 flex border rounded-sm mb-5'>
                        <div className={`grow md:grow-0 md:px-8 py-3 text-center ${tab === "infos" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("infos")}>Informations</div>
                        <div className={`grow md:grow-0 md:px-8 py-3 text-center ${tab === "schedules" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("schedules")}>Planning</div>
                        <div className={`grow md:grow-0 md:px-8 py-3 text-center ${tab === "invoices" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("invoices")}>Facturation</div>
                    </div>
                }
                <div>
                    {tab === "infos" && <MissionInfos />}
                    {tab === "schedules" && <MissionSchedules />}
                    {tab === "invoices" && <MissionInvoices />}
                </div>
            </div>
        </>
    )

}

export default MissionPage


const MandateDocuments = ({ iri }) => {

    const { data } = mandate(iri)
    const queryClient = useQueryClient()
    const account = queryClient.getQueryData(['account'])

    if (!data) return null
    if (data && data.documents.length === 0) return null
    return (

        <div className='bg-white border rounded-sm p-5 pt-16 relative'>

            <div className='bg-slate-200 rounded-br-full px-3 flex items-center gap-1 absolute top-0 left-0 h-11 w-44 font-bold uppercase'>
                <AiOutlineFolderOpen size={30} />
                {!account.roles.includes('ROLE_DOCTOR') ? "Mandat" : "Documents"}
            </div>

            {data.documents.map(document =>
                <div key={uuid()} className='flex justify-between items-center border-l-2 border-base-300 bg-gradient-to-r from-base-200 to-white rounded mb-3 pl-3 py-2'>
                    {document.type}
                    <button className='btn btn-sm btn-circle btn-primary' onClick={() => downloadFile(document)}>
                        <HiDownload />
                    </button>
                </div>
            )}

        </div>

    )

}