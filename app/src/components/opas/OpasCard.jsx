import React from 'react'
import { useGetIRI, usePutData } from '../../queryHooks/usePrescription'
import OpasForm from '../../forms/OpasForm'
import Dropdown from '../dropdown/Dropdown'
import { useModal } from '../../hooks/useModal'
import { FaCircle } from 'react-icons/fa'
import { AiOutlineFile } from 'react-icons/ai'
import { opasStatus } from '../../utils/arrays'
import OpasPDF from './OpasPDF'
import Loader from '../Loader'


const OpasCard = ({ iri, missionIRI, isMine = false }) => {

    const { data, isLoading, error } = useGetIRI(iri)


    const { mutate: putData } = usePutData(iri)
    const { Modal, handleOpenModal, handleCloseModal } = useModal()

    const handleUpdateOpasStatus = (status) => {
        putData({ ...data, status: status })
    }

    return (
        <>
            <Modal />
            <div className='bg-white border rounded-sm p-5 pt-14 relative'>
                {isMine &&
                    <Dropdown type='card'>
                        <button
                            onClick={() => handleOpenModal({ size: "full", title: iri ? "Edition de l'OPAS" : "Nouveau OPAS", content: <OpasForm iri={iri} missionIRI={missionIRI} handleCloseModal={handleCloseModal} /> })}
                        >
                            {iri ? "Editer l'OPAS" : "Créer un OPAS"}
                        </button>
                        {data &&
                            <>
                                <span>
                                    Status de l'OPAS
                                </span>
                                <button
                                    onClick={() => handleUpdateOpasStatus("brouillon")}
                                >
                                    <FaCircle className="mr-1 text-waiting" />
                                    Brouillon
                                </button>
                                <button
                                    onClick={() => handleUpdateOpasStatus("envoyé au médecin")}
                                >
                                    <FaCircle className="mr-1 text-mention" />
                                    Envoyé au médecin
                                </button>
                                <button
                                    onClick={() => handleUpdateOpasStatus("validé par le médecin")}
                                >
                                    <FaCircle className="mr-1 text-info" />
                                    Validé par le médecin
                                </button>
                                <button
                                    onClick={() => handleUpdateOpasStatus("envoyé à l'assurance")}
                                >
                                    <FaCircle className="mr-1 text-success" />
                                    Envoyé à l'assurance
                                </button>
                                <button
                                    className='flex items-center gap-1 hover:text-action py-1'
                                    onClick={() => handleUpdateOpasStatus("contesté")}
                                >
                                    <FaCircle className="mr-1 text-black" />
                                    Contesté par l'assurance
                                </button>
                            </>
                        }
                    </Dropdown>
                }
                <div className='bg-slate-200 rounded-br-full px-3 flex items-center gap-1 absolute top-0 left-0 h-11 w-44 font-bold uppercase'>
                    <AiOutlineFile size={36} />
                    OPAS
                </div>

                {isLoading && iri
                    ?
                    <Loader />
                    :
                    <div className='mt-3 flex items-center justify-between'>
                        {
                            data &&
                            <>
                                <div className="flex flex-wrap items-center gap-3 text-black">
                                    <div className={`h-5 w-5 rounded-full ${!data.status ? 'bg-error' : opasStatus[data.status]}`}>
                                    </div>
                                    <div>
                                        {!data.status
                                            ? 'OPAS à créer'
                                            : data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                                    </div>
                                </div>
                                <OpasPDF data={data} />
                            </>
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default OpasCard