import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useGetOneData } from '../queryHooks/useMandate'
import { useModal } from '../hooks/useModal'
import dayjs from 'dayjs'
import Loader from '../components/Loader'
import Dropdown from '../components/dropdown/Dropdown'
import { MdContentCopy, MdEventNote } from "react-icons/md"
import PageTitle from '../layouts/PageTitle'
import { MdArrowBack } from "react-icons/md"
import MissionDocument from '../components/mission_document/MissionDocument'
import DocumentForm from '../forms/DocumentForm'
import MandateEditForm from '../forms/MandateEditForm'
import { mandateStatus } from '../utils/translations'
import MandateAgentForm from '../forms/MandateAgentForm'
import MandateAcceptForm from '../forms/MandateAcceptForm'
import Button from '../components/buttons/Button'
import _ from 'lodash'
import { useQueryClient } from '@tanstack/react-query'

import { AiOutlineFolderOpen } from "react-icons/ai"
import { HiOutlinePaperClip } from 'react-icons/hi'

const PatientPage = () => {

    const navigate = useNavigate();
    const { state: previousPageState } = useLocation();
    const { id } = useParams()
    const { data } = useGetOneData(id)
    const { Modal, handleOpenModal, handleCloseModal } = useModal()

    const queryClient = useQueryClient()
    const account = queryClient.getQueryData(['account'])

    const [isMine, setIsMine] = useState(false)


    useEffect(() => {
        if (data) {
            if (account.id === data.user.id) setIsMine(true)
        }
    }, [data])


    if (!data) return <Loader />
    else
        return (
            <>
                <Modal />
                <PageTitle
                    title={data.content.service.category}
                    icon={<MdEventNote size={40} />}
                    mainButton={_.isEmpty(previousPageState)
                        ?
                        <Button
                            onClick={() => navigate(-1)}
                        >
                            <MdArrowBack />
                        </Button>
                        :
                        <Button
                            onClick={() => navigate("/mandates", { state: previousPageState })}
                        >
                            <MdArrowBack />
                        </Button>
                    }
                >
                    <Dropdown type='button'>

                        {account.roles.includes('ROLE_NURSE') && data.status === "attribué" &&
                            <button onClick={() => handleOpenModal({ title: 'Accepter le mandat', content: <MandateAcceptForm iri={data['@id']} handleCloseModal={handleCloseModal} /> })}>
                                Accepter le mandat
                            </button>
                        }

                        {(account.roles.includes('ROLE_COORDINATOR') && data.status === "édité") &&
                            <button onClick={() => handleOpenModal({ title: 'Choix du mandataire', content: <MandateAgentForm iri={data['@id']} handleCloseModal={handleCloseModal} /> })}>
                                Choisir le mandataire
                            </button>
                        }
                        {(account.roles.includes('ROLE_DOCTOR') || account.roles.includes('ROLE_COORDINATOR') && data.status === "édité") &&
                            <>
                                <button onClick={() => handleOpenModal({ title: 'Édition du mandat', content: <MandateEditForm iri={data['@id']} handleCloseModal={handleCloseModal} /> })}>
                                    Éditer le mandat
                                </button>
                                <button
                                    onClick={() => handleOpenModal({ title: 'Nouveau document', content: <DocumentForm event={false} mandateID={data.id} handleCloseModal={handleCloseModal} /> })}
                                >
                                    Ajouter un document
                                </button>
                            </>
                        }

                    </Dropdown>




                </PageTitle>

                <div className='grid grid-cols-12 gap-5'>

                    <div className='col-span-8 row-span-2 bg-white border rounded-sm p-5 pt-16 relative'>
                        <div className='bg-slate-200 rounded-br-full px-3 flex items-center gap-1 absolute top-0 left-0 h-11 w-44 font-bold uppercase'>
                            <MdContentCopy size={30} />
                            Détails
                        </div>
                        <div className='font-bold flex items-center gap-3 mb-2'>
                            {data.content.patient.gender === 'homme' ? "Patient " : "Patiente"}
                            <hr className='hr_separator' />
                        </div>
                        <p>
                            {data.content.patient.gender === "homme" ? "Mr " : "Mme "} {data.patientFullname}
                        </p>
                        <p>
                            {data.content.patient.gender === 'homme' ? "Né le : " : "Née le : "}
                            {dayjs(data.content.patient.birthdate).format('DD/MM/YYYY') + " "}
                            ({dayjs().diff(data.content.patient.birthdate, 'years')} ans)
                        </p>
                        <p>
                            AVS : {data.content.patient.avsNumber}
                        </p>
                        <div className='font-bold flex items-center gap-3 my-2'>
                            Date de prise en charge
                            <hr className='hr_separator' />
                        </div>
                        <p>
                            {dayjs(data.content.service.beginAt).format('DD/MM/YYYY')}
                        </p>
                        <div className='font-bold flex items-center gap-3 my-2'>
                            Motif du mandat
                            <hr className='hr_separator' />
                        </div>
                        <div className='whitespace-pre-line'>
                            {data.content.service.description}
                        </div>

                    </div>

                    <div className='col-span-4 bg-white border rounded-sm p-5 pt-16 relative'>
                        <div className='bg-slate-200 rounded-br-full px-3 flex items-center gap-1 absolute top-0 left-0 h-11 w-44 font-bold uppercase'>
                            <HiOutlinePaperClip size={30} />
                            Statut
                        </div>
                        {account.roles.includes('ROLE_DOCTOR') && mandateStatus["doctor"][data.status]}
                        {account.roles.includes('ROLE_NURSE') && mandateStatus["nurse"][data.status]}
                        {account.roles.includes('ROLE_COORDINATOR') && mandateStatus["coordinator"][data.status]}
                    </div>

                    <div className='col-span-4 bg-white border rounded-sm p-5 pt-16 relative'>
                        {isMine &&
                            <Dropdown type="card">
                                <button
                                    onClick={() => handleOpenModal({ title: 'Nouveau document', content: <DocumentForm event={false} mandateID={data.id} handleCloseModal={handleCloseModal} /> })}
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
                            <MissionDocument key={document["@id"]} iri={document["@id"]} isMine={isMine} />
                        )}

                    </div>


                </div>
            </>
        )

}

export default PatientPage