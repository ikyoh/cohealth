import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MdPendingActions } from "react-icons/md";
import MandateForm from '../forms/MandateForm'
import MandateAgentForm from '../forms/MandateAgentForm'
import MandateAcceptForm from '../forms/MandateAcceptForm'
import PageTitle from '../layouts/PageTitle'
import { useGetPaginatedDatas, usePutData, useGetIRI } from '../queryHooks/useMandate'
import { useFilterMandates } from '../hooks/useFilterMandates';
import { useGetCurrentAccount } from '../queryHooks/useAccount'
import { useSearch } from '../hooks/useSearch'
import { useSortBy } from '../hooks/useSortBy'
import { useModal } from '../hooks/useModal'
import * as Table from '../components/table/Table'
import Pagination from '../components/pagination/Pagination'
import AddButton from '../components/buttons/AddButton'
import Dropdown from '../components/dropdown/Dropdown'
import Loader from '../components/Loader'
import dayjs from 'dayjs';
import { mandateStatus } from '../utils/translations';

const MandatesPage = () => {

    const { state: initialPageState } = useLocation()
    const navigate = useNavigate()
    const { Modal, handleOpenModal, handleCloseModal } = useModal()
    const { searchValue, searchbar } = useSearch(initialPageState ? initialPageState.searchValue : "")
    const { filters, filter } = useFilterMandates()
    const [page, setPage] = useState(initialPageState ? initialPageState.page : 1)
    const { sortValue, sortDirection, handleSort } = useSortBy(initialPageState ? { value: initialPageState.sortValue, direction: initialPageState.sortDirection } : "")
    const { data, isLoading, error } = useGetPaginatedDatas(page, sortValue, sortDirection, searchValue, filters)
    const { mutate } = usePutData()


    const { data: account, isLoading: isLoadingAccount } = useGetCurrentAccount()

    useEffect(() => {
        if (searchValue && !initialPageState) {
            setPage(1)
        }
        if (sortValue && !initialPageState) {
            setPage(1)
        }
        if (sortDirection && !initialPageState) {
            setPage(1)
        }
    }, [searchValue, sortValue])

    const handleChangeStatus = ({ id, status }) => {
        mutate({ id: id, status: status })
    }


    const MandateDetails = ({ iri }) => {

        const { isLoading: isLoading, data } = useGetIRI(iri)

        return (
            isLoading ? <Loader /> :
                <div className='p-5 flex flex-col gap-3'>
                    <p>
                        <span className='font-bold'>Patient :</span> {data.content.patient.lastname} {data.content.patient.firstname}
                    </p>
                    <p>
                        <span className='font-bold'>Date de prise en charge :</span> {dayjs(data.content.service.beginAt).format('dddd LL')}
                    </p>
                    <p>
                        <span className='font-bold'> Detail du mandat :</span> {data.content.service.description}
                    </p>
                </div>
        )
    }


    if (isLoading || isLoadingAccount) return <Loader />
    return (
        <>
            <Modal />
            <PageTitle
                title={"Liste des mandats"}
                subtitle={data["hydra:totalItems"]}
                icon={<MdPendingActions size={40} />}
                mainButton={
                    account && account.roles.includes('ROLE_DOCTOR') &&
                    <AddButton onClick={() => handleOpenModal({ title: 'Nouveau mandat', content: <MandateForm handleCloseModal={handleCloseModal} /> })} />
                }
            >
                {searchbar}
                {filter}
            </PageTitle>

            <Table.Table>
                <Table.Thead>
                    <Table.Th
                        label="#"
                        sortBy='id'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Patient"
                        sortBy='patient.lastname'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    {!account.roles.includes('ROLE_DOCTOR') &&
                        <Table.Th
                            label="Mandant"
                            sortBy='doctor.fullname'
                            sortValue={sortValue}
                            sortDirection={sortDirection}
                            handleSort={handleSort}
                        />
                    }
                    {!account.roles.includes('ROLE_NURSE') &&
                        <Table.Th
                            label="Mandataire"
                            sortBy='doctor.fullname'
                            sortValue={sortValue}
                            sortDirection={sortDirection}
                            handleSort={handleSort}
                        />
                    }
                    <Table.Th
                        label="Prestation"
                        sortBy='doctor.fullname'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Créé le"
                        sortBy='doctor.fullname'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Statut"
                        sortBy='status'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th label="" style={{ width: 10 }} />
                </Table.Thead>
                <Table.Tbody>
                    {!isLoading && data['hydra:member'].map(data =>
                        <Table.Tr key={data.id}
                            onClick={() => {
                                if (account.roles.includes('ROLE_DOCTOR'))
                                    handleOpenModal({ title: 'Mandat', content: <MandateDetails iri={data['@id']} /> })
                                if (account.roles.includes('ROLE_NURSE')) {
                                    if (data.status === "attribué")
                                        handleOpenModal({ title: 'Mandat', content: <MandateAcceptForm iri={data['@id']} handleCloseModal={handleCloseModal} /> })
                                    else handleOpenModal({ title: 'Mandat', content: <MandateDetails iri={data['@id']} /> })
                                }


                            }}
                        >
                            <Table.Td text={data.id} />
                            <Table.Td label="Patient" text={data.patientFullname} />
                            {!account.roles.includes('ROLE_DOCTOR') &&
                                <Table.Td label="Mandant" text={data.user.lastname + ' ' + data.user.firstname} />
                            }
                            {!account.roles.includes('ROLE_NURSE') &&
                                <Table.Td label="Mandataire" text={data.mandateUser ? data.mandateUser.lastname + ' ' + data.mandateUser.firstname : "..."} />
                            }
                            <Table.Td label="Prestations" text={data.content.service.category} />
                            <Table.Td label="Créé le" text={dayjs(data.createdAt).format('L')} />
                            <Table.Td label="Statut">
                                {account.roles.includes('ROLE_DOCTOR') && mandateStatus["doctor"][data.status]}
                                {account.roles.includes('ROLE_NURSE') && mandateStatus["nurse"][data.status]}
                                {account.roles.includes('ROLE_COORDINATOR') && mandateStatus["coordinator"][data.status]}
                            </Table.Td>
                            <Table.Td label="" text="" >
                                {account.roles.includes('ROLE_DOCTOR') && data.status === "édité" &&
                                    <Dropdown>
                                        <button onClick={() => handleChangeStatus({ id: data.id, status: 'annulé' })}>
                                            Annuler le mandat
                                        </button>
                                    </Dropdown>
                                }
                                {account.roles.includes('ROLE_COORDINATOR') && data.status === "édité" &&
                                    <Dropdown>
                                        <button onClick={() => handleOpenModal({ title: 'Choix du mandataire', content: <MandateAgentForm iri={data['@id']} handleCloseModal={handleCloseModal} /> })}>
                                            Choisir le mandataire
                                        </button>
                                    </Dropdown>
                                }
                                {account.roles.includes('ROLE_NURSE') && data.status === "édité" &&
                                    <Dropdown>
                                        <button onClick={() => handleOpenModal({ title: 'Choix du mandataire', content: <MandateAgentForm iri={data['@id']} handleCloseModal={handleCloseModal} /> })}>
                                            Accepter le mandat
                                        </button>
                                        {account.roles.includes('ROLE_NURSE') && data.status === "édité" &&
                                            <button onClick={() => handleOpenModal({ title: 'Choix du mandataire', content: <MandateAgentForm iri={data['@id']} handleCloseModal={handleCloseModal} /> })}>
                                                Refuser le mandat
                                            </button>
                                        }
                                    </Dropdown>
                                }
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table.Table >
            <Pagination totalItems={data['hydra:totalItems']} page={page} setPage={setPage} />
        </>
    )
}

export default MandatesPage