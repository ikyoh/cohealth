import React from 'react'
import { useGetIRI, useDeleteIRI } from '../../queryHooks/useDocument'
import Loader from '../Loader'
import { downloadFile } from '../../utils/functions'
import { HiDownload } from 'react-icons/hi'
import { TiDelete } from 'react-icons/ti'
import { useQueryClient } from '@tanstack/react-query'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useModal } from '../../hooks/useModal'
import DocumentForm from '../../forms/DocumentForm'

const MissionDocument = ({ iri, isMine }) => {

    const { data, isLoading, error } = useGetIRI(iri)
    const { mutate: deleteDocument } = useDeleteIRI()

    const queryClient = useQueryClient()
    const account = queryClient.getQueryData(['account'])

    const handleDelete = () => {
        //event.preventDefault()
        deleteDocument(iri)
    }

    const { Modal, handleOpenModal, handleCloseModal } = useModal()

    return (
        isLoading ?
            <Loader isSmall={true} />
            :
            <>
                <Modal />
                <input type="checkbox" id="confirm-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <label htmlFor="confirm-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="font-bold text-lg">Suppression du document</h3>
                        <div className="py-4">
                            <button type="button" className='btn btn-error'
                                onClick={handleDelete}
                            >Confirmer la suppression</button>
                        </div>
                    </div>
                </div>

                <div className='border-l-2 border-base-300 bg-base-100 rounded mb-3 pl-3 py-2 flex justify-between'>
                    <div>
                        {data.type}
                        {
                            data.comment &&
                            <div className="text-sm">
                                {data.comment}
                            </div>
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        {account.id === data.user.id &&
                            <label htmlFor="confirm-modal" className="btn btn-sm btn-circle btn-error p-0">
                                <TiDelete size={20} />
                            </label>
                        }
                        <button className='btn btn-sm btn-circle btn-primary' onClick={() => downloadFile(data)}>
                            <HiDownload />
                        </button>
                        {isMine &&
                            <div className="dropdown dropdown-left">
                                <label
                                    tabIndex={0}
                                    className="btn btn-circle btn-sm bg-slate-200 border-none hover:bg-slate-400"
                                    onClick={(e) => { e.stopPropagation() }}
                                >
                                    <BsThreeDotsVertical className='text-primary text-1xl' />
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-1 border border-primary bg-slate-100 rounded">
                                    <li>
                                        <button
                                            className='hover:bg-action hover:text-white !rounded-sm h-10 p-2 w-full'
                                            onClick={() => handleOpenModal({ title: 'Modifier le document', content: <DocumentForm iri={iri} handleCloseModal={handleCloseModal} /> })}
                                        >
                                            Modifier
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className='hover:bg-error hover:text-white !rounded-sm h-10 p-2 w-full'
                                            onClick={() => handleDelete()}
                                        >
                                            Supprimer
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </>
    )

}

export default MissionDocument