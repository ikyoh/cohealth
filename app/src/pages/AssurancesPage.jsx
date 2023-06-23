import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { MdOutlineHealthAndSafety } from "react-icons/md";
import AssuranceForm from '../forms/AssuranceForm'
import PageTitle from '../layouts/PageTitle'
import { useGetPaginatedDatas } from '../queryHooks/useAssurance'
import { useSearch } from '../hooks/useSearch'
import { useSortBy } from '../hooks/useSortBy'
import { useModal } from '../hooks/useModal'
import * as Table from '../components/table/Table'
import Pagination from '../components/pagination/Pagination'
import AddButton from '../components/buttons/AddButton'
import Loader from '../components/Loader'

const AssurancesPage = () => {

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
            <PageTitle
            title="Liste des assurances"
            icon={<MdOutlineHealthAndSafety size={40}/>}
            mainButton={<AddButton onClick={() => handleOpenModal({ title: 'Nouvelle assurance', content: <AssuranceForm handleCloseModal={handleCloseModal} /> })} />
        }
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
                        label="Assurance"
                        sortBy='company'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Groupe"
                        sortBy='organization'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Type"
                        sortBy='type'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Téléphone"
                        sortBy='phone'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Email"
                        sortBy='email'
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
                </Table.Thead>
                <Table.Tbody>
                    {!isLoading && data['hydra:member'].map(data =>
                        <Table.Tr key={data.id}
                            onClick={() => handleOpenModal({ title: data.company, content: <AssuranceForm iri={data['@id']} handleCloseModal={handleCloseModal} /> })}
                        >
                            <Table.Td text={data.id} />
                            <Table.Td label="Assurance" text={data.company} />
                            <Table.Td label="Groupe" text={data.organization} />
                            <Table.Td label="Type" text={data.type} />
                            <Table.Td label="Téléphone" text={data.phone} />
                            <Table.Td label="Email" text={data.email} />
                            <Table.Td label="N° GLN" text={data.gln} />
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table.Table>
            <Pagination totalItems={data['hydra:totalItems']} page={page} setPage={setPage} />
        </>
    )
}

export default AssurancesPage