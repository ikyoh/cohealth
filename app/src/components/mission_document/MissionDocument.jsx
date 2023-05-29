import React from 'react'
import { useGetIRI, useDeleteIRI } from '../../queryHooks/useDocument'
import Loader from '../Loader'
import { downloadFile } from '../../utils/functions'
import { HiDownload } from 'react-icons/hi'
import { TiDelete } from 'react-icons/ti'
import { useQueryClient } from '@tanstack/react-query'

const MissionDocument = ({ iri }) => {

    const { data, isLoading, error } = useGetIRI(iri)
    const { mutate } = useDeleteIRI()

    const queryClient = useQueryClient()
    const account = queryClient.getQueryData(['account'])

    const handleDelete = (event) => {
        event.preventDefault()
        mutate(iri)
    }

    return (
        isLoading ?
            <Loader isSmall={true} />
            :
            <>
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
                    <div className='flex flex-row gap-2'>
                        {account.id === data.user.id &&
                            <label htmlFor="confirm-modal" className="btn btn-sm btn-circle btn-error p-0">
                                <TiDelete size={20} />
                            </label>
                        }
                        <button className='btn btn-sm btn-circle btn-primary' onClick={() => downloadFile(data)}>
                            <HiDownload />
                        </button>
                    </div>
                </div>
            </>
    )

}

export default MissionDocument