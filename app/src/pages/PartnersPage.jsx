import React, { useState } from 'react'
import Layout from '../layouts/Layout'
import { AiFillPlusCircle } from "react-icons/ai"
import { FaHandshake } from "react-icons/fa"
import PartnerForm from '../forms/PartnerForm'
import PartnersContainer from '../features/partners/PartnersContainer'
import SearchFilter from '../components/SearchFilter'
import ThTable from '../components/table/ThTable'
import PageTitle from '../layouts/PageTitle'


const PartnersPage = () => {

    const PageContent = ({ handleOpenModal, handleCloseModal }) => {

        const [search, setSearch] = useState('')
        const [filters, setFilters] = useState({
            isActive: true
        })
        const [sort, setSort] = useState({ by: 'lastname', direction: 'desc' })

        const Row = ({ item }) => {
            return (
                <tr className='pointer-events-none'>
                    <td>{item.lastname.toUpperCase()} {item.firstname}</td>
                    <td>{item.mobile}</td>
                    <td>{item.email}</td>
                    <td>{item.rcc}</td>
                </tr>
            )
        }

        const handleSort = (event) => {
            const checkDirection = () => {
                if (sort.direction === "asc") return "desc"
                if (sort.direction === "desc") return "asc"
            }
            if (event === sort.by) setSort({ by: event, direction: checkDirection() })
            else setSort({ by: event, direction: "asc" })
        }



        return (
            <>
                <PageTitle title="Gestion des partenaires" icon={<FaHandshake size={40} />}>
                    <SearchFilter value={search} handleSearch={({ currentTarget }) => setSearch(currentTarget.value)}>
                    </SearchFilter>
                    <div onClick={() => handleOpenModal({ title: 'Ajouter un partenaire', content: <PartnerForm handleCloseModal={handleCloseModal} /> })}>
                        <AiFillPlusCircle size={52} className="text-action rounded-full hover:text-primary" />
                    </div>
                </PageTitle>

                <table className="responsive-table">
                    <thead>
                        <tr>
                            <ThTable handleSort={handleSort} title="Nom" sort={sort} sortBy='lastname' />
                            <ThTable handleSort={handleSort} title="Mobile" sort={sort} sortBy='mobile' />
                            <ThTable handleSort={handleSort} title="Email" sort={sort} sortBy='email' />
                            <ThTable handleSort={handleSort} title="N° RCC" sort={sort} sortBy='rcc' />
                        </tr>
                    </thead>
                    <tbody>
                        <PartnersContainer search={search} sort={sort} filters={filters}>
                            <Row />
                        </PartnersContainer>
                    </tbody>
                </table>

            </>
        )
    }

    return (
        <Layout>
            <PageContent />
        </Layout>
    )
}

export default PartnersPage