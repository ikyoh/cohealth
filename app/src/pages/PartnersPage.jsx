import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FaHandshake } from "react-icons/fa";
import PartnerForm from '../forms/PartnerForm'
import PageTitle from '../layouts/PageTitle'
import { useGetPaginatedDatas, useDeleteData } from '../queryHooks/usePartner'
import { useSearch } from '../hooks/useSearch'
import { useSortBy } from '../hooks/useSortBy'
import { useModal } from '../hooks/useModal'
import * as Table from '../components/table/Table'
import Pagination from '../components/pagination/Pagination'
import AddButton from '../components/buttons/AddButton'
import Loader from '../components/Loader'
import Dropdown from '../components/dropdown/Dropdown';
import { TiDelete } from "react-icons/ti";


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
                    <Table.Th label="" style={{ width: 10 }} />
                </Table.Thead>
                <Table.Tbody>
                    {!isLoading && data['hydra:member'].map(data =>
                        <Table.Tr key={data.partner.id}>
                            <Table.Td text={data.partner.id} />
                            <Table.Td label="Partenaire" text={data.partner.lastname + " " + data.partner.firstname}>
                                {data.partner.avatar
                                    ? <img src={URL + data.partner.avatar.contentUrl} className='rounded-full object-cover h-10 w-10 mr-20' alt="profil" />
                                    : <div className='rounded-full flex items-center h-10 justify-center w-10 bg-base-300 mr-2'>
                                        {data.partner.firstname && data.partner.firstname.charAt(0)}
                                        {data.partner.lastname && data.partner.lastname.charAt(0)}
                                        {data.partner.organization && data.partner.organization.charAt(0).toUpperCase()}
                                    </div>
                                }
                            </Table.Td>
                            <Table.Td label="Mobile" text={data.partner.mobile} />
                            <Table.Td label="Email" text={data.partner.email} />
                            <Table.Td label="Canton" text={data.partner.rcc} />
                            <Table.Td label="" text="">
                                <Dropdown type='table'>
                                    <button onClick={() => handleOpenModal({ title: 'Supprimer le partenaire', size: "small", content: <DeletePartner iri={data['@id']} handleCloseModal={handleCloseModal} /> })}>
                                        <TiDelete size={20}/>
                                        Supprimer le partenaire
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

export default PartnersPage



const DeletePartner = ({ iri, handleCloseModal }) => {

    const { mutate, isSuccess } = useDeleteData()

    useEffect(() => {
        if (isSuccess) handleCloseModal()
    }, [isSuccess])


    return (
        <div className='p-8'>
            <p>Attention cette opération est irréversible, voulez-vous confirmer la suppression ?</p>
            <div className="flex items-center gap-5 justify-center p-5">
                <button className='btn btn-outline'
                    onClick={() => handleCloseModal()}
                >Annuler</button>
                <button className='btn btn-error text-white'
                    onClick={() => mutate(iri)}
                >Confirmer</button>
            </div>
        </div>
    )

}