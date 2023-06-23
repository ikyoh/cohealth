import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoPersonCircleOutline } from "react-icons/io5"
import PatientForm from '../forms/PatientForm'
import PageTitle from '../layouts/PageTitle'
import { useGetPaginatedDatas } from '../queryHooks/usePatient'
import { useSearch } from '../hooks/useSearch'
import { useSortBy } from '../hooks/useSortBy'
import { useModal } from '../hooks/useModal'
import * as Table from '../components/table/Table'
import Pagination from '../components/pagination/Pagination'
import AddButton from '../components/buttons/AddButton'
import Dropdown from '../components/dropdown/Dropdown'
import { API_PATIENTS } from '../config/api.config'
import Loader from '../components/Loader'
import dayjs from 'dayjs'

const PatientsPage = () => {

    const { state: initialPageState } = useLocation()
    const navigate = useNavigate()
    const { Modal, handleOpenModal, handleCloseModal } = useModal()

    const { searchValue, searchbar } = useSearch(initialPageState ? initialPageState.searchValue : "")
    const [page, setPage] = useState(initialPageState ? initialPageState.page : 1)
    const { sortValue, sortDirection, handleSort } = useSortBy(initialPageState ? { value: initialPageState.sortValue, direction: initialPageState.sortDirection } : "")
    const { data = [], isLoading, error } = useGetPaginatedDatas(page, sortValue, sortDirection, searchValue)

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
            title="Liste des patients"
            subtitle={data["hydra:totalItems"]}
            icon={<IoPersonCircleOutline size={40} />}
            mainButton={ <AddButton onClick={() => handleOpenModal({ title: 'Nouveau patient', content: <PatientForm handleCloseModal={handleCloseModal} /> })} />}
            >
                {searchbar}
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
                        sortBy='lastname'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Médecin"
                        sortBy='doctor.fullname'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Assurance"
                        sortBy='assurance.company'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Statut"
                        sortBy='lastMissionEndAt'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th label="" style={{ width: 10 }} />
                </Table.Thead>
                <Table.Tbody>
                    {!isLoading && data['hydra:member'].map(data =>
                        <Table.Tr key={data.id}
                            onClick={() => navigate(API_PATIENTS + "/" + data.id, { state: { page: page, sortDirection: sortDirection, sortValue: sortValue, searchValue: searchValue } })}
                        >
                            <Table.Td text={data.id} />
                            <Table.Td label="Patient" text={data.lastname + " " + data.firstname} />
                            <Table.Td label="Médecin" text={data.doctor ? data.doctor.fullname : ''} />
                            <Table.Td label="Assurance" text={data.assurance ? data.assurance.company : ''} />
                            <Table.Td label="Statut">
                                {data.lastMissionEndAt && (dayjs(data.lastMissionEndAt) > dayjs())
                                    ? <span className="px-3 py-1 uppercase text-xs rounded-full text-white bg-info">Situation en cours</span>
                                    : <span className="px-3 py-1 uppercase text-xs rounded-full text-white bg-neutral">Aucune situation</span>
                                }
                            </Table.Td>
                            <Table.Td label="" text="" >
                                <Dropdown type='table'>
                                    <button
                                        onClick={() => navigate(API_PATIENTS + "/" + data.id, { state: { page: page, sortDirection: sortDirection, sortValue: sortValue, searchValue: searchValue } })}
                                    >
                                        Voir la fiche patient
                                    </button>
                                    <button
                                        onClick={() => handleOpenModal({ title: "édition du patient", content: <PatientForm iri={data['@id']} /> })}>
                                        Modifier la patient
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

export default PatientsPage