import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { fetchMission, selectAllMissions, deleteDocument } from "../features/missions/missionsSlice"
import { fetchPrescription, selectAllPrescriptions, updatePrescriptionStatus } from '../features/prescriptions/prescriptionsSlice'
import { fetchPatient, selectAllPatients } from '../features/patients/patientsSlice'
import Layout from '../layouts/Layout'
import MissionTitle from '../layouts/MissionTitle'
import { AiOutlinePlusCircle, AiOutlineDownload } from "react-icons/ai"
import { VscCloud, VscFile } from "react-icons/vsc"
import { IoSettingsOutline } from "react-icons/io5"
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCircle } from "react-icons/fa"
import MissionEditForm from '../forms/MissionEditForm'
import ThTable from '../components/table/ThTable'
import OpasForm from '../forms/OpasForm'
import * as dayjs from 'dayjs'
import { nanoid } from '@reduxjs/toolkit'
import OpasPrint from '../components/print/OpasPrint'
import MissionMediaForm from '../forms/MissionMediaForm'
import Loader from '../components/Loader'
import PatientForm from '../forms/PatientForm'
import { getAccount } from '../features/account/accountSlice'
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import { opasStatus } from '../utils/arrays'
import axios from 'axios'
import { URL } from '../features/apiConfig'
import FileDownload from 'js-file-download'
import { calcNumberOfDays } from '../utils/functions'
import Dropdown from '../components/dropdown/Dropdown'



const MissionPage = () => {

    const PageContent = ({ handleOpenModal, handleCloseModal }) => {

        const { id } = useParams()

        const dispatch = useDispatch()
        const missionsState = useSelector(selectAllMissions)
        const patientsState = useSelector(selectAllPatients)
        const prescriptionsState = useSelector(selectAllPrescriptions)

        const me = useSelector(getAccount)

        const [mission, setMission] = useState(false)

        const [patient, setPatient] = useState(false)

        const [prescriptions, setPrescriptions] = useState([])

        const [opas, setOpas] = useState(false)

        const [isMyMission, setIsMyMission] = useState(false)

        // infos // documents // schedules // invoices
        const [tab, setTab] = useState("infos")

        useEffect(() => {
            dispatch(fetchMission(id))
                .then(response => setMission(response.payload))
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        useEffect(() => {

            if (mission && mission.user.id === me.id) setIsMyMission(true)

            if (mission && mission.user.id && mission.user.id !== me.id) {
                setPatient(mission.patient)
                setPrescriptions(mission.prescriptions)
            }
            else {
                if (mission)
                    dispatch(fetchPatient(mission.patient.id))
                        .then(response => setPatient(response.payload))
                if (mission && prescriptions.length === 0) {
                    mission.prescriptions.forEach(p =>
                        dispatch(fetchPrescription(p.id))
                            .then(response => { setPrescriptions([...prescriptions, response.payload]) }))
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [mission])

        useEffect(() => {
            if (mission) {
                const index = missionsState.findIndex(obj => (obj.id === Number(id)))
                setMission(missionsState[index])
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [missionsState])

        useEffect(() => {
            if (patient) {
                const index = patientsState.findIndex(obj => (Number(obj.id) === Number(mission.patient.id)))
                setPatient(patientsState[index])
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [patientsState])

        useEffect(() => {
            if (prescriptions.length > 0) {
                const fPrescriptions = prescriptionsState.filter(f => (Number(mission.id) === Number(mission.id)))
                setPrescriptions(fPrescriptions)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [prescriptionsState])

        useEffect(() => {
            if (prescriptions.length > 0) {
                setOpas(prescriptions.find(item => item.type === "opas"))
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [prescriptions])


        const MissionInfos = () => {

            const handleUpdateOpasStatus = (e) => {
                dispatch(updatePrescriptionStatus({ id: opas['@id'], status: e.target.value }))
            }

            if (!patient || !mission) return null
            else return (
                <div className="flex flex-row gap-3">
                    <div className="basis-5/12 relative bg-white border p-5 flex flex-col gap-5">
                        {isMyMission &&
                            <div className="absolute top-3 right-2">
                                <Dropdown>
                                    <button
                                        onClick={() => handleOpenModal({ title: 'Edition mission', content: <MissionEditForm event={mission} modalAction="updateMission" handleCloseModal={handleCloseModal} /> })}
                                    >
                                        Editer la mission
                                    </button>
                                    <button
                                        onClick={() => handleOpenModal({ title: 'Médecin mandataire', content: <MissionEditForm event={mission} modalAction="doctorIRI" handleCloseModal={handleCloseModal} /> })}
                                    >
                                        Editer le médecin mandataire
                                    </button>
                                    <button
                                        onClick={() => handleOpenModal({ title: 'Assurance', content: <MissionEditForm event={mission} modalAction="assuranceIRI" handleCloseModal={handleCloseModal} /> })}
                                    >
                                        Editer l'assurance
                                    </button>
                                </Dropdown>
                            </div>
                        }
                        <div className='font-semibold uppercase'>
                            Mission :
                            {mission.beginAt &&
                                " du " + dayjs(mission.beginAt).format('DD/MM/YYYY')
                            }
                            {mission.endAt &&
                                " au " + dayjs(mission.endAt).format('DD/MM/YYYY')
                            }
                            {mission.beginAt && mission.endAt ?
                                " (" + calcNumberOfDays(mission.beginAt, mission.endAt) + " jours)"
                                : null
                            }
                            <hr className='hr_separator' />
                        </div>
                        <div>
                            <div className='font-semibold'>
                                Synthèse de la mission
                                <hr className='hr_separator inset-0' />
                            </div>
                            <div className='whitespace-pre-line'>
                                {mission.description}
                            </div>
                        </div>
                        <div>
                            <div className='font-semibold'>
                                Médecin mandataire
                                <hr className='hr_separator inset-0' />
                            </div>
                            <div className='whitespace-pre-line'>
                                {mission.doctor &&
                                    <>
                                        <div>
                                            {mission.doctor.fullname}
                                        </div>
                                        <div className='text-slate-400'>
                                            {mission.doctor.category}
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div>
                                                {mission.doctor.phone &&
                                                    "Téléphone: " + mission.doctor.phone}
                                            </div>
                                            <div>
                                                {mission.doctor.email &&
                                                    "Email: " + mission.doctor.email}
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                        <div>
                            <div className='font-semibold'>
                                Assurance
                                <hr className='hr_separator inset-0' />
                            </div>
                            <div className='whitespace-pre-line'>
                                {mission.assurance &&
                                    <>
                                        <div>
                                            {mission.assurance.company}
                                        </div>
                                        <div className='text-slate-400'>
                                            {mission.assurance.type}
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>


                    <div className="basis-5/12 relative bg-white border p-5 flex flex-col gap-5">
                        {isMyMission &&
                            <div className="absolute top-3 right-2">
                                <Dropdown>
                                    <button
                                        onClick={() => handleOpenModal({ title: 'Fiche patient', content: <PatientForm event={patient} modalAction="patient" handleCloseModal={handleCloseModal} /> })}
                                    >
                                        Editer le patient
                                    </button>
                                </Dropdown>
                            </div>
                        }
                        <div className='font-semibold uppercase'>
                            Patient :
                            {patient.gender === "homme" ? " Mr " : " Mme "}
                            {patient.firstname + " " + patient.lastname + " "}
                            ({dayjs().diff(patient.birthdate, 'years')} ans)
                            <hr className='hr_separator' />
                        </div>
                        <div>
                            <div className='font-semibold'>
                                Infos assuré
                                <hr className='hr_separator' />
                            </div>
                            <div className="grid grid-cols-2">
                                <div>
                                    Numéro d'assuré :  {patient.assuranceNumber}
                                </div>
                                <div>
                                    Numéro AVS :   {patient.avsNumber}
                                </div>
                                {patient.birthdate &&
                                    <div>
                                        {patient.gender === 'hommme' ? "Né le : " : "Née le : "}
                                        {dayjs(patient.birthdate).format('DD/MM/YYYY')}
                                    </div>
                                }
                            </div>
                        </div>
                        <div>
                            <div className='font-semibold'>
                                Coordonnées
                                <hr className='hr_separator' />
                            </div>
                            <div className="grid grid-cols-2">
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
                                <div>
                                    Téléphone : {patient.phone}
                                </div>
                                <div>
                                    Mobile : {patient.mobile}
                                </div>
                            </div>
                        </div>

                        {patient.furtherInfos &&
                            <div className='col-span-2'>
                                <div className='font-semibold'>
                                    Informations complémentaires
                                    <hr className='hr_separator' />
                                </div>
                                <div>
                                    {patient.furtherInfos}
                                </div>
                            </div>
                        }
                    </div>
                    <div className="basis-3/12 flex flex-col gap-3">
                        <div className='bg-white border rounded-sm p-5 relative'>
                            <div className="absolute top-3 right-2">
                                <Dropdown>
                                    {mission.prescriptions.length < 1 ?

                                        <>
                                            {isMyMission &&
                                                <button
                                                    onClick={() => handleOpenModal({ title: 'Nouveau OPAS', content: <OpasForm event={false} mission={mission['@id']} beginAt={mission.beginAt} endAt={mission.endAt} handleCloseModal={handleCloseModal} /> })}
                                                >
                                                    Créer un OPAS
                                                </button>
                                            }
                                        </>
                                        :
                                        <>
                                            {isMyMission &&
                                                <button
                                                    onClick={() => handleOpenModal({ title: 'Edition OPAS', content: <OpasForm event={prescriptions[0]} mission={mission['@id']} beginAt={mission.beginAt} endAt={mission.endAt} handleCloseModal={handleCloseModal} /> })}
                                                >
                                                    Editer l'OPAS
                                                </button>
                                            }

                                            {prescriptions?.map(p =>
                                                <div key={nanoid()} className="p-2">
                                                    <OpasPrint datas={p} mission={mission} patient={patient} />
                                                </div>
                                            )}
                                            {isMyMission &&
                                                <>
                                                    <div className='border-b text-zinc-400 p-2 font-light'>
                                                        Status de l'OPAS
                                                    </div>
                                                    <button
                                                        onClick={handleUpdateOpasStatus}
                                                        value="brouillon"
                                                    >
                                                        <FaCircle className="text-waiting" />
                                                        Brouillon
                                                    </button>
                                                    <button
                                                        onClick={handleUpdateOpasStatus}
                                                        value="envoyé au médecin"
                                                    >
                                                        <FaCircle className="text-mention" />
                                                        Envoyé au médecin
                                                    </button>
                                                    <button
                                                        onClick={handleUpdateOpasStatus}
                                                        value="validé par le médecin"
                                                    >
                                                        <FaCircle className="text-info" />
                                                        Validé par le médecin
                                                    </button>
                                                    <button
                                                        onClick={handleUpdateOpasStatus}
                                                        value="envoyé à l'assurance"
                                                    >
                                                        <FaCircle className="text-success" />
                                                        Envoyé à l'assurance
                                                    </button>
                                                    <button
                                                        className='flex items-center gap-1 hover:text-action py-1'
                                                        onClick={handleUpdateOpasStatus}
                                                        value="contesté"
                                                    >
                                                        <FaCircle className="text-black" />
                                                        Contesté par l'assurance
                                                    </button>
                                                </>
                                            }
                                        </>
                                    }
                                </Dropdown>
                            </div>
                            <div className='font-semibold'>
                                OPAS
                                <span className='font-normal ml-2'>
                                    {opas && opas.content && "(A:" + opas.content.totalA + " - B:" + opas.content.totalB + " - C:" + opas.content.totalC + ")"}
                                </span>
                                <hr className='hr_separator' />
                            </div>
                            <div className='mt-3'>
                                {opas ?
                                    <>
                                        <span className={`px-3 py-1 uppercase text-xs rounded-full text-white ${opasStatus[opas.status]}`}>
                                            {opas.status}
                                        </span>
                                    </>
                                    :
                                    <>
                                        <span className="px-3 py-1 uppercase text-xs rounded-full text-white bg-error">
                                            aucun OPAS
                                        </span>
                                    </>
                                }
                            </div>
                        </div>

                        {!isMyMission &&
                            <div className='bg-white border rounded-sm p-5'>
                                <div className='flex items-center justify-between'>
                                    <div className='font-semibold'>
                                        Infirmier référent
                                    </div>
                                </div>
                                <hr className='hr_separator' />
                                <div>
                                    {mission.user.firstname}  {mission.user.lastname}
                                </div>
                            </div>

                        }

                        <div className='bg-white border rounded-sm p-5 relative'>
                            {isMyMission &&
                                <div className="absolute top-3 right-2">
                                    <Dropdown>
                                        <button
                                            onClick={() => handleOpenModal({ title: 'Partenaires', content: <MissionEditForm event={mission} modalAction="selectPartners" handleCloseModal={handleCloseModal} /> })}
                                        >
                                            Editer les partenaires
                                        </button>
                                    </Dropdown>
                                </div>
                            }
                            <div className='font-semibold'>
                                Partenaires
                            </div>
                            {mission.coworkersDetailed.length !== 0 &&
                                <hr className='hr_separator' />
                            }
                            {mission.coworkersDetailed.map(cw =>
                                cw.id !== me.id &&
                                <div key={nanoid()}>
                                    {cw.firstname}  {cw.lastname}
                                </div>
                            )
                            }
                        </div>
                    </div>

                </div>
            )
        }

        const MissionDocuments = () => {

            const [search, setSearch] = useState('')
            const [filters, setFilters] = useState({
                isActive: true
            })
            const [sort, setSort] = useState({ by: 'id', direction: 'asc' })

            const handleSort = (event) => {
                const checkDirection = () => {
                    if (sort.direction === "asc") return "desc"
                    if (sort.direction === "desc") return "asc"
                }
                if (event === sort.by) setSort({ by: event, direction: checkDirection() })
                else setSort({ by: event, direction: "asc" })
            }


            const FileDropDown = ({ item }) => {

                const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(5);

                const downloadFile = () => {
                    axios({
                        url: URL + item.contentUrl,
                        method: 'GET',
                        responseType: 'blob', // Important
                    }).then((response) => {
                        FileDownload(response.data, item.filePath);
                    });
                };

                return (

                    <div className='relative'>
                        <button {...buttonProps}
                            className='h-[44px] w-[44px] flex items-center rounded-full p-2 space-x-1 cursor-pointer text-primary hover:bg-slate-300'
                        >
                            <BsThreeDotsVertical size={26} />
                        </button>
                        <div className={isOpen ? "absolute right-0 z-10 top-12 w-max  bg-white border rounded-sm  flex flex-col" : "hidden"} role="menu"
                            onMouseLeave={() => setIsOpen(false)}
                        >
                            <button
                                className='text-center hover:text-action py-1'
                                {...itemProps[0]}
                                onClick={downloadFile}
                            >
                                Télécharger
                            </button>
                            {isMyMission &&
                                <>
                                    <button
                                        className='text-center hover:text-action py-1'
                                        {...itemProps[1]}
                                        onClick={() => window.alert("Fonction à développer")}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        className='text-center hover:text-action py-1'
                                        {...itemProps[2]}
                                        onClick={() => {
                                            dispatch(deleteDocument({ documentId: item.id, missionId: mission.id }))
                                        }
                                        }
                                    >
                                        Supprimer
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                )
            }
            return (

                <table className="responsive-table">
                    <thead>
                        <tr>
                            <ThTable handleSort={handleSort} title="Type" sort={sort} sortBy='fullname' />
                            <ThTable handleSort={handleSort} title="Date" sort={sort} sortBy='phone' />
                            <ThTable handleSort={handleSort} title="Commentaire" sort={sort} sortBy='email' />
                            <th>

                                {isMyMission &&
                                    <div className="flex space-x-5 justify-end">

                                        <div className='bg-action rounded-full p-1 cursor-pointer hover:bg-primary'
                                            onClick={() => handleOpenModal({ title: 'Ajouter un document', content: <MissionMediaForm handleCloseModal={handleCloseModal} mission={mission['@id']} /> })}>
                                            <AiOutlinePlusCircle size={36} className="text-white rounded-full" />
                                        </div>
                                    </div>
                                }
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {mission.documents.map(d =>
                            <tr className='!cursor-auto' key={nanoid()}>
                                <td>
                                    <div className='flex items-center gap-3'>
                                        <VscFile size={25} />
                                        {d.type}
                                    </div>
                                </td>
                                <td>{dayjs(d.createdAt).format('DD/MM/YYYY')}</td>
                                <td>{d.comment}</td>
                                <td className='float-right'>
                                    <div className='flex'>
                                        <FileDropDown item={d} />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
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

        if (!mission && !patient) return <Loader />
        else return (
            <>
                <div className=''>
                    <MissionTitle mission={mission} patient={patient} />
                    <div className='bg-white flex rounded-sm col-span-3 mb-5'>
                        <div className={`px-8 py-3 text-center ${tab === "infos" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("infos")}>Informations</div>
                        <div className={`px-8 py-3 text-center ${tab === "documents" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("documents")}>Documents</div>
                        <div className={`px-8 py-3 text-center ${tab === "schedules" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("schedules")}>Planning</div>
                        <div className={`px-8 py-3 text-center ${tab === "invoices" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("invoices")}>Facturation</div>
                        <div className="w-full">
                        </div>
                    </div>
                    <div>
                        {tab === "infos" && <MissionInfos />}
                        {tab === "documents" && <MissionDocuments />}
                        {tab === "schedules" && <MissionSchedules />}
                        {tab === "invoices" && <MissionInvoices />}
                    </div>
                </div>
            </>
        )

    }


    return (
        <Layout>
            <PageContent />
        </Layout>
    )
}

export default MissionPage