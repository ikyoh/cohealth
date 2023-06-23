import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MdPendingActions } from "react-icons/md";
import MissionForm from '../forms/MissionForm'
import PageTitle from '../layouts/PageTitle'
import { useGetPaginatedDatas } from '../queryHooks/useMission'
import { useSearch } from '../hooks/useSearch'
import { useSortBy } from '../hooks/useSortBy'
import { useModal } from '../hooks/useModal'
import * as Table from '../components/table/Table'
import Pagination from '../components/pagination/Pagination'
import AddButton from '../components/buttons/AddButton'
import Dropdown from '../components/dropdown/Dropdown'
import { API_PATIENTS, API_MISSIONS } from '../config/api.config'
import { calcNumberOfDays } from '../utils/functions'
import dayjs from 'dayjs'
import OpasStatus from '../components/opas/OpasStatus'
import MissionStatus from '../components/mission_status/MissionsStatus'
import Loader from '../components/Loader'
import { useFilterMission } from '../hooks/useFilterMissions';
import { useQueryClient } from '@tanstack/react-query'


const MissionsPage = () => {





    const { state: initialPageState } = useLocation()
    const navigate = useNavigate()
    const { Modal, handleOpenModal, handleCloseModal } = useModal()
    const { searchValue, searchbar } = useSearch(initialPageState ? initialPageState.searchValue : "")
    const { filters, filter } = useFilterMission()
    const [page, setPage] = useState(initialPageState ? initialPageState.page : 1)
    const { sortValue, sortDirection, handleSort } = useSortBy(initialPageState ? { value: initialPageState.sortValue, direction: initialPageState.sortDirection } : "")
    const { data, isLoading, error } = useGetPaginatedDatas(page, sortValue, sortDirection, searchValue, filters)

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

    if (isLoading) return <Loader />
    return (
        <>
            <Modal />
            <PageTitle
                title={"Liste des missions"}
                subtitle={data["hydra:totalItems"]}
                icon={<MdPendingActions size={40} />}
                mainButton={<AddButton onClick={() => handleOpenModal({ title: 'Nouvelle mission', content: <MissionForm handleCloseModal={handleCloseModal} /> })} />}
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
                        label="Début"
                        sortBy='doctor.fullname'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Fin"
                        sortBy='assurance.company'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Durée"
                    />
                    <Table.Th
                        label="OPAS"
                        sortBy='prescriptions.status'
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
                            <Table.Td label="Patient" text={data.patient.lastname + " " + data.patient.firstname} />
                            <Table.Td label="Début" text={dayjs(data.beginAt).format('DD/MM/YYYY')} />
                            <Table.Td label="Fin" text={dayjs(data.endAt).format('DD/MM/YYYY')} />
                            <Table.Td label="Durée" text={calcNumberOfDays(data.beginAt, data.endAt) + " jours"} />
                            <Table.Td label="Opas" children={<OpasStatus prescriptions={data.prescriptions} />} />
                            <Table.Td label="Statut" children={<MissionStatus mission={data} />} />
                            <Table.Td label="" text="" >
                                <Dropdown type='table'>
                                    <button
                                        onClick={() => navigate(API_MISSIONS + "/" + data.id, { state: { page: page, sortDirection: sortDirection, sortValue: sortValue, searchValue: searchValue, filter: filters } })}
                                    >
                                        Voir la fiche mission
                                    </button>
                                    <button
                                        onClick={() => handleOpenModal({ title: "Édition de la mission", content: <MissionForm iri={data['@id']} action='mission' handleCloseModal={handleCloseModal} /> })}>
                                        Modifier la mission
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

export default MissionsPage