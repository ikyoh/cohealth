import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FaHandshake } from "react-icons/fa";
import PartnerForm from '../forms/PartnerForm'
import PageTitle from '../layouts/PageTitle'
import { useGetPaginatedDatas } from '../queryHooks/usePartner'
import { useSearch } from '../hooks/useSearch'
import { useSortBy } from '../hooks/useSortBy'
import { useModal } from '../hooks/useModal'
import * as Table from '../components/table/Table'
import Pagination from '../components/pagination/Pagination'
import AddButton from '../components/buttons/AddButton'
import Loader from '../components/Loader'

const PartnersPage = () => {

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
            title="Liste des partenaires"
            subtitle={data["hydra:totalItems"]}
            icon={<FaHandshake size={40} />}
            mainButton={<AddButton onClick={() => handleOpenModal({ title: 'Nouveau partenaire', content: <PartnerForm handleCloseModal={handleCloseModal} /> })} />
        }
            >
                {searchbar}
            </PageTitle>
            <Modal />
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
                        label="Partenaire"
                        sortBy='lastname'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Mobile"
                        sortBy='mobile'
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
                        label="N° RCC"
                        sortBy='rcc'
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                </Table.Thead>
                <Table.Tbody>
                    {!isLoading && data['hydra:member'].map(data =>
                        <Table.Tr key={data.partner.id}>
                            <Table.Td text={data.partner.id} />
                            <Table.Td label="Partenaire" text={data.partner.lastname + " " + data.partner.firstname}>
                                {data.partner.avatar
                                    ? <img src={URL + data.partner.avatar.contentUrl} className='rounded-full object-cover h-10 w-10 mr-20' alt="profil" />
                                    : <div className='rounded-full flex items-center h-10 justify-center w-10 bg-info mr-2'>
                                        {data.partner.firstname && data.partner.firstname.charAt(0)}
                                        {data.partner.lastname && data.partner.lastname.charAt(0)}
                                        {data.partner.organization && data.partner.organization.charAt(0).toUpperCase()}
                                    </div>
                                }
                            </Table.Td>
                            <Table.Td label="Mobile" text={data.partner.mobile} />
                            <Table.Td label="Email" text={data.partner.email} />
                            <Table.Td label="Canton" text={data.partner.rcc} />
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table.Table>
            <Pagination totalItems={data['hydra:totalItems']} page={page} setPage={setPage} />
        </>
    )
}

export default PartnersPage