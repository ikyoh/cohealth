import React, { useState, useEffect } from 'react'
import { useParams   } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { fetchMission, selectAllMissions, setMissionsStatusIddle } from "../features/missions/missionsSlice"
import { fetchPrescription, selectAllPrescriptions, updatePrescriptionStatus } from '../features/prescriptions/prescriptionsSlice'
import { fetchPatient, selectAllPatients } from '../features/patients/patientsSlice'
import Layout from '../layouts/Layout'
import MissionTitle from '../layouts/MissionTitle'
import { AiOutlinePlusCircle, AiOutlineDownload } from "react-icons/ai"
import { VscCloud, VscFile } from "react-icons/vsc"
import { IoSettingsOutline } from "react-icons/io5"
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
        }, [])

        console.log('mission', mission)

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

        }, [mission])

        useEffect(() => {
            if (mission) {
                const index = missionsState.findIndex(obj => (obj.id === Number(id)))
                setMission(missionsState[index])
            }
        }, [missionsState])

        useEffect(() => {
            if (patient) {
                const index = patientsState.findIndex(obj => (Number(obj.id) === Number(mission.patient.id)))
                setPatient(patientsState[index])
            }
        }, [patientsState])

        useEffect(() => {
            if (prescriptions.length > 0) {
                const fPrescriptions = prescriptionsState.filter(f => (Number(mission.id) === Number(mission.id)))
                setPrescriptions(fPrescriptions)
            }
        }, [prescriptionsState])

        useEffect(() => {
            if (prescriptions.length > 0) {
                setOpas(prescriptions.find(item => item.type === "opas"))
            }
        }, [prescriptions])


        const MissionInfos = () => {
            if (!patient || !mission) return null
            else return (
                <div className="flex flex-row gap-5">

                    <div className="basis-9/12 relative bg-white border p-3 gap-5">


                        <div className="grid grid-cols-2 gap-5">

                            <div className='col-span-2 flex flex-col gap-2 p-3'>
                                <div className='font-semibold'>
                                    Synthèse de la mission
                                    <hr className='hr_separator inset-0' />
                                </div>
                                <div className='whitespace-pre-line'>

                                    {mission.description}

                                </div>
                            </div>

                            <div className='flex flex-col gap-2 p-3'>
                                <div className='font-semibold'>
                                    Infos assuré
                                    <hr className='hr_separator' />
                                </div>
                                <div>
                                    {patient.gender === "homme" ? "Mr " : "Mme "}
                                    {patient.firstname} {patient.lastname}
                                    {patient.birthdate &&
                                        <span className='ml-2'>
                                            ({dayjs().diff(patient.birthdate, 'years')} ans)
                                        </span>
                                    }
                                </div>

                                {patient.birthdate &&
                                    <div>
                                        {patient.gender === 'hommme' ? "Né le : " : "Née le : "}
                                        {dayjs(patient.birthdate).format('DD/MM/YYYY')}
                                    </div>
                                }
                                <div>
                                    Numéro d'assuré :  {patient.assuranceNumber}
                                </div>
                                <div>
                                    Numéro AVS :   {patient.avsNumber}
                                </div>
                            </div>

                            <div className='flex flex-col gap-2 p-3'>
                                <div className='font-semibold'>
                                    Coordonnées
                                    <hr className='hr_separator' />
                                </div>
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

                            {patient.furtherInfos &&
                                <div className='col-span-2 flex flex-col gap-2 p-3'>
                                    <div className='font-semibold'>
                                        Informations complémentaires patient
                                        <hr className='hr_separator' />
                                    </div>
                                    <div>
                                        {patient.furtherInfos}
                                    </div>
                                </div>
                            }

                        </div>
                    </div>

                    <div className="basis-3/12 flex flex-col gap-3">

                        {!isMyMission &&
                            <div className='bg-white border rounded-sm p-5'>
                                <div className='flex items-center justify-between'>
                                    <div className='font-semibold'>
                                        Infirmier référent
                                    </div>
                                </div>

                                <hr className='hr_separator' />
                                <div>

                                </div>
                                <div>
                                    {mission.user.firstname}  {mission.user.lastname}
                                </div>


                            </div>

                        }

                        <div className='bg-white border rounded-sm p-5'>
                            <div className='flex items-center justify-between'>
                                <div className='font-semibold'>
                                    Médecin mandataire
                                </div>
                                {isMyMission &&
                                    <div>
                                        <IoSettingsOutline size={28} className='text-action rounded-full hover:text-primary cursor-pointer'
                                            onClick={() => handleOpenModal({ title: 'Médecin mandataire', content: <MissionEditForm event={mission} modalAction="doctorIRI" handleCloseModal={handleCloseModal} /> })}
                                        />
                                    </div>
                                }
                            </div>

                            {mission.doctor &&
                                <>
                                    <hr className='hr_separator' />
                                    <div>
                                        {mission.doctor.fullname}
                                    </div>
                                    <div className='text-slate-400'>
                                        {mission.doctor.category}
                                    </div>
                                    {mission.doctor.rcc &&
                                        <div>
                                            RCC : {mission.doctor.rcc}
                                        </div>
                                    }
                                    <div>
                                        {mission.doctor.phone}
                                    </div>
                                    <div>
                                        {mission.doctor.email}
                                    </div>
                                </>
                            }
                        </div>
                        <div className='bg-white border rounded-sm p-5'>
                            <div className='flex items-center justify-between'>
                                <div className='font-semibold'>
                                    Assurance
                                </div>
                                {isMyMission &&
                                    <div>
                                        <IoSettingsOutline size={28} className='text-action rounded-full hover:text-primary cursor-pointer'
                                            onClick={() => handleOpenModal({ title: 'Assurance', content: <MissionEditForm event={mission} modalAction="assuranceIRI" handleCloseModal={handleCloseModal} /> })}
                                        />
                                    </div>
                                }
                            </div>

                            {mission.assurance &&
                                <>
                                    <hr className='hr_separator' />
                                    <div>
                                        {mission.assurance.company}
                                    </div>
                                    <div className='text-slate-400'>
                                        {mission.assurance.type}
                                    </div>
                                    <div>
                                        GLN : {mission.assurance.gln}
                                    </div>
                                </>
                            }
                        </div>


                        <div className='bg-white border rounded-sm p-5'>
                            <div className='flex items-center justify-between'>
                                <div className='font-semibold'>
                                    Partenaires
                                </div>
                                {isMyMission &&
                                    <div>
                                        <IoSettingsOutline size={28} className="text-action rounded-full hover:text-primary cursor-pointer"
                                            onClick={() => handleOpenModal({ title: 'Partenaires', content: <MissionEditForm event={mission} modalAction="selectPartners" handleCloseModal={handleCloseModal} /> })}
                                        />
                                    </div>
                                }
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


            const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(5);

            const handleUpdateOpasStatus = (e) => {
                dispatch(updatePrescriptionStatus({ id: opas['@id'], status: e.target.value }))
                setIsOpen(false)
            }


            const downloadFile = (url, name) => {
                axios({
                    url: URL + '/api' + url,
                    method: 'GET',
                    responseType: 'blob', // Important
                  }).then((response) => {
                      FileDownload(response.data, name);
                  });
              };


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

                                        {!mission.assurance || !mission.doctor || !patient.avsNumber
                                            ?
                                            <div className='flex items-center rounded-full p-1 space-x-1 bg-slate-400'>
                                                <AiOutlinePlusCircle size={36} className="text-white rounded-full" />
                                                <span className='text-white pr-3'>OPAS</span>
                                            </div>
                                            :
                                            mission.prescriptions.length < 1 ?
                                                <div className='flex items-center rounded-full p-1 space-x-1 cursor-pointer bg-error hover:bg-primary'
                                                    onClick={() => handleOpenModal({ title: 'Nouveau OPAS', content: <OpasForm event={false} mission={mission['@id']} beginAt={mission.beginAt} endAt={mission.endAt} handleCloseModal={handleCloseModal} /> })}
                                                >
                                                    <AiOutlinePlusCircle size={36} className="text-white rounded-full" />
                                                    <span className='text-white pr-3'>OPAS</span>
                                                </div>
                                                :
                                                <div className='flex items-center rounded-full p-1 space-x-1 cursor-pointer bg-action hover:bg-primary'
                                                    onClick={() => handleOpenModal({ title: 'Edition OPAS', content: <OpasForm event={prescriptions[0]} mission={mission['@id']} beginAt={mission.beginAt} endAt={mission.endAt} handleCloseModal={handleCloseModal} /> })}
                                                >
                                                    <IoSettingsOutline size={24} className="text-white ml-2" />
                                                    <span className='text-white pr-3'>OPAS</span>
                                                </div>
                                        }

                                        {mission.prescriptions.length > 0 &&
                                            <>
                                                <div className='relative'>
                                                    <button {...buttonProps}
                                                        className='h-[44px] flex items-center rounded-full p-2 space-x-1 cursor-pointer text-white bg-action hover:bg-primary'

                                                    >
                                                        <IoSettingsOutline size={24} className="text-white ml-2" />
                                                        <span className='text-white pr-3'>Status OPAS</span>
                                                    </button>
                                                    <div className={isOpen ? "absolute z-10 top-12 w-max  bg-white border rounded-sm p-3" : "hidden"} role="menu"
                                                        onMouseLeave={() => setIsOpen(false)}
                                                    >
                                                        <button
                                                            className='flex items-center gap-1 hover:text-action py-1'
                                                            {...itemProps[0]}
                                                            onClick={handleUpdateOpasStatus}
                                                            value="brouillon"
                                                        >
                                                            <FaCircle className="text-waiting" />
                                                            Brouillon
                                                        </button>
                                                        <button
                                                            className='flex items-center gap-1 hover:text-action py-1'
                                                            {...itemProps[1]}
                                                            onClick={handleUpdateOpasStatus}
                                                            value="envoyé au médecin"
                                                        >
                                                            <FaCircle className="text-mention" />
                                                            Envoyé au médecin
                                                        </button>
                                                        <button
                                                            className='flex items-center gap-1 hover:text-action py-1'
                                                            {...itemProps[2]}
                                                            onClick={handleUpdateOpasStatus}
                                                            value="validé par le médecin"
                                                        >
                                                            <FaCircle className="text-info" />
                                                            Validé par le médecin
                                                        </button>
                                                        <button
                                                            className='flex items-center gap-1 hover:text-action py-1'
                                                            {...itemProps[3]}
                                                            onClick={handleUpdateOpasStatus}
                                                            value="envoyé à l'assurance"
                                                        >
                                                            <FaCircle className="text-success" />
                                                            Envoyé à l'assurance
                                                        </button>
                                                        <button
                                                            className='flex items-center gap-1 hover:text-action py-1'
                                                            {...itemProps[4]}
                                                            onClick={handleUpdateOpasStatus}
                                                            value="contesté"
                                                        >
                                                            <FaCircle className="text-black" />
                                                            Contesté par l'assurance
                                                        </button>

                                                    </div>
                                                </div>

                                            </>
                                        }



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
                        {prescriptions?.map(p =>
                            <tr key={nanoid()}>
                                <td>
                                    <div className='flex items-center gap-3'>
                                        <VscCloud size={25} />
                                        {p.type.toUpperCase()}
                                    </div>
                                </td>
                                <td>{dayjs(p.createdAt).format('DD/MM/YYYY')}</td>
                                <td>{p.comment}</td>
                                <td className='float-right'>
                                    <OpasPrint datas={p} mission={mission} patient={patient} />
                                </td>
                            </tr>
                        )}
                        {mission.documents.map(d =>
                            <tr key={nanoid()}>
                                <td>
                                    <div className='flex items-center gap-3'>
                                        <VscFile size={25} />
                                        {d.type}
                                    </div>
                                </td>
                                <td>{dayjs(d.createdAt).format('DD/MM/YYYY')}</td>
                                <td>{d.comment}</td>
                                <td className='float-right'>
                                <div onClick={()=>downloadFile(d.contentUrl, d.filePath)}>
                                    <AiOutlineDownload size={30} />
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
                    <MissionTitle mission={mission} patient={patient}>

                        {!mission.doctor &&
                            <div className='text-white text-sm bg-error rounded-full p-2 flex items-center gap-2 hover:bg-primary cursor-pointer'
                                onClick={() => handleOpenModal({ title: 'Médecin mandataire', content: <MissionEditForm event={mission} modalAction="doctorIRI" handleCloseModal={handleCloseModal} /> })}
                            >
                                <IoSettingsOutline size={20} className="text-white rounded-full" />
                                <span className='text-white pr-3'>Médecin</span>
                            </div>
                        }
                        {!mission.assurance &&
                            <div className='text-white text-sm bg-error rounded-full p-2 flex items-center gap-2 hover:bg-primary cursor-pointer'
                                onClick={() => handleOpenModal({ title: 'Assurance', content: <MissionEditForm event={mission} modalAction="assuranceIRI" handleCloseModal={handleCloseModal} /> })}
                            >
                                <IoSettingsOutline size={20} className="text-white rounded-full" />
                                <span className='text-white pr-3'>Assurance</span>
                            </div>
                        }

                        {patient && isMyMission &&
                            <div className={`text-white text-sm rounded-full p-2 flex items-center gap-2 hover:bg-primary cursor-pointer ${patient.avsNumber ? 'bg-action' : 'bg-error'}`}
                                onClick={() => handleOpenModal({ title: 'Fiche patient', content: <PatientForm event={patient} modalAction="patient" handleCloseModal={handleCloseModal} /> })}
                            >
                                <IoSettingsOutline size={20} className="text-white rounded-full" />
                                <span className='text-white pr-3'>Patient</span>
                            </div>
                        }

                        {isMyMission &&
                            <div className='text-white text-sm bg-action rounded-full p-2 flex items-center gap-2 hover:bg-primary cursor-pointer'
                                onClick={() => handleOpenModal({ title: 'Edition mission', content: <MissionEditForm event={mission} modalAction="updateMission" handleCloseModal={handleCloseModal} /> })}
                            >
                                <IoSettingsOutline size={20} className="text-white rounded-full" />
                                <span className='text-white pr-3'>Mission</span>
                            </div>
                        }

                    </MissionTitle>
                    <div className='bg-white flex rounded-sm col-span-3 mb-5'>
                        <div className={`px-8 py-3 text-center ${tab === "infos" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("infos")}>Informations</div>
                        <div className={`px-8 py-3 text-center ${tab === "documents" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("documents")}>Documents</div>
                        <div className={`px-8 py-3 text-center ${tab === "schedules" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("schedules")}>Planning</div>
                        <div className={`px-8 py-3 text-center ${tab === "invoices" ? 'bg-action text-white rounded-sm' : 'cursor-pointer'}`} onClick={() => setTab("invoices")}>Facturation</div>
                        <div className="w-full flex items-center justify-end gap-1 px-8">


                            {opas ?
                                <>
                                    <div className={"px-2 rounded-full bg-" + opasStatus[opas.status]}>
                                        OPAS
                                    </div>
                                    <div>
                                        {opas.status}
                                    </div>
                                </>
                                :
                                <>
                                    <div className="px-2 rounded-full bg-error text-white">
                                        OPAS
                                    </div>
                                    <div>
                                        aucun OPAS
                                    </div>
                                </>

                            }


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