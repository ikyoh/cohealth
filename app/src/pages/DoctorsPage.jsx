import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { RiStethoscopeFill } from "react-icons/ri"
import DoctorForm from '../forms/DoctorForm'
import PageTitle from '../layouts/PageTitle'
import { useGetPaginatedDatas } from '../queryHooks/useDoctor'
import { useSearch } from '../hooks/useSearch'
import { useSortBy } from '../hooks/useSortBy'
import { useModal } from '../hooks/useModal'
import * as Table from '../components/table/Table'
import Pagination from '../components/pagination/Pagination'
import AddButton from '../components/buttons/AddButton'
import Loader from '../components/Loader'

const DoctorsPage = () => {

    const { state: initialPageState } = useLocation()
    const { Modal, handleOpenModal, handleCloseModal } = useModal()

    const { searchValue, searchbar } = useSearch(initialPageState ? initialPageState.searchValue : "")
    const [page, setPage] = useState(initialPageState ? initialPageState.page : 1)
    const { sortValue, sortDirection, handleSort } = useSortBy(initialPageState ? { value: initialPageState.sortValue, direction: initialPageState.sortDirection } : "")
    const { data, isLoading, error } = useGetPaginatedDatas(page, sortValue, sortDirection, searchValue)

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
    else return (
        <>
            <Modal />
            <PageTitle title="Liste des médecins" icon={<RiStethoscopeFill size={40} />}>
                {searchbar}
                <AddButton onClick={() => handleOpenModal({ title: 'Nouveau médecin', content: <DoctorForm handleCloseModal={handleCloseModal} /> })} />
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
                        label="Nom / Prénom"
                        sortBy='fullname'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Spécialité"
                        sortBy='category'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Organisation"
                        sortBy='organization'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Canton"
                        sortBy='canton'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="N° GLN"
                        sortBy='gln'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="N° RCC"
                        sortBy='rcc'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                </Table.Thead>
                <Table.Tbody>
                    {!isLoading && data['hydra:member'].map(data =>
                        <Table.Tr key={data.id}
                            onClick={() => handleOpenModal({
                                title: data.fullname,
                                content: <DoctorForm iri={data['@id']} handleCloseModal={handleCloseModal} />
                            })}
                        >
                            <Table.Td text={data.id} />
                            <Table.Td label="Nom" text={data.fullname} />
                            <Table.Td label="Category" text={data.category} />
                            <Table.Td label="Organisation" text={data.organization} />
                            <Table.Td label="Canton" text={data.canton} />
                            <Table.Td label="GLN" text={data.gln} />
                            <Table.Td label="RCC" text={data.rcc} />
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table.Table>
            <Pagination totalItems={data['hydra:totalItems']} page={page} setPage={setPage} />
        </>
    )
}

export default DoctorsPage