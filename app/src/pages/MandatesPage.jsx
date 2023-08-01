import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MdPendingActions } from "react-icons/md";
import MandateForm from '../forms/MandateForm'
import PageTitle from '../layouts/PageTitle'
import { useGetPaginatedDatas, usePutData } from '../queryHooks/useMandate'
import { useFilterMission } from '../hooks/useFilterMissions';
import { useGetCurrentAccount } from '../queryHooks/useAccount'
import { useSearch } from '../hooks/useSearch'
import { useSortBy } from '../hooks/useSortBy'
import { useModal } from '../hooks/useModal'
import * as Table from '../components/table/Table'
import Pagination from '../components/pagination/Pagination'
import AddButton from '../components/buttons/AddButton'
import Dropdown from '../components/dropdown/Dropdown'
import { API_MISSIONS } from '../config/api.config'
import { missionStatus } from '../utils/arrays'
import Loader from '../components/Loader'
import dayjs from 'dayjs';

const MandatesPage = () => {

    const { state: initialPageState } = useLocation()
    const navigate = useNavigate()
    const { Modal, handleOpenModal, handleCloseModal } = useModal()
    const { searchValue, searchbar } = useSearch(initialPageState ? initialPageState.searchValue : "")
    const { filters, filter } = useFilterMission()
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

    const handleChangeStatus = (id, status) => {
        mutate({ id: id, status: status })
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
                    <Table.Th
                        label="Mandant"
                        sortBy='doctor.fullname'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Mandataire"
                        sortBy='doctor.fullname'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
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
                            onClick={() => navigate(API_MISSIONS + "/" + data.id, { state: { page: page, sortDirection: sortDirection, sortValue: sortValue, searchValue: searchValue } })}
                        >
                            <Table.Td text={data.id} />
                            <Table.Td label="Patient" text={data.patientFullname} />
                            <Table.Td label="Mandant" text={data.user.lastname + ' ' + data.user.firstname} />
                            <Table.Td label="Mandataire" text={data.mandateUser ? data.mandateUser.lastname + ' ' + data.mandateUser.firstname : "..."} />
                            <Table.Td label="Prestations" text={data.content.service.category} />
                            <Table.Td label="Créé le" text={dayjs(data.createdAt).format('L')} />
                            <Table.Td label="Statut" text={data.status} />
                            <Table.Td label="" text="" >
                                <Dropdown type='table'>
                                    <button
                                        onClick={() => navigate(API_MISSIONS + "/" + data.id, { state: { page: page, sortDirection: sortDirection, sortValue: sortValue, searchValue: searchValue, filter: filters } })}
                                    >
                                        Voir la fiche mission
                                    </button>
                                    <button
                                        onClick={() => handleOpenModal({ title: "Édition de la mission", content: <MandateForm iri={data['@id']} action='mission' handleCloseModal={handleCloseModal} /> })}>
                                        Modifier la mission
                                    </button>
                                    <span>
                                        Statut de la mission
                                    </span>
                                    <button
                                        className='flex items-center gap-2'
                                        onClick={() => handleChangeStatus(data.id, "en cours")}>
                                        <div className={`rounded-full w-4 h-4 ${missionStatus["en cours"]}`}>
                                        </div>
                                        En cours
                                    </button>
                                    <button
                                        className='flex items-center gap-2'
                                        onClick={() => handleChangeStatus(data.id, "annulé")}>
                                        <div className={`rounded-full w-4 h-4 ${missionStatus["annulé"]}`}>
                                        </div>
                                        Annulé
                                    </button>
                                    <button
                                        className='flex items-center gap-2'
                                        onClick={() => handleChangeStatus(data.id, "archivé")}>
                                        <div className={`rounded-full w-4 h-4 ${missionStatus["archivé"]}`}>
                                        </div>
                                        Archivé
                                    </button>
                                </Dropdown>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table.Table>
            <Pagination totalItems={data['hydra:totalItems']} page={page} setPage={setPage} />
        </>
    )
}

export default MandatesPage