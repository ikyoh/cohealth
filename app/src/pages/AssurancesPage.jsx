import React, { useState } from 'react'
import Layout from '../layouts/Layout'
import { AiFillPlusCircle } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import AssuranceForm from '../forms/AssuranceForm';
import AssurancesContainer from '../features/assurances/AssurancesContainer';
import SearchFilter from '../components/SearchFilter';
import ThTable from '../components/table/ThTable';
import PageTitle from '../layouts/PageTitle';


const AssurancesPage= () => {

    const PageContent = ({ handleOpenModal, handleCloseModal }) => {

        const [search, setSearch] = useState('')
        const [filters, setFilters] = useState({
            isActive: true
        })
        const [sort, setSort] = useState({ by: 'id', direction: 'asc' })

        const Row = ({ item }) => {
            return (
                <tr onClick={() => handleOpenModal({ title: 'Edition assurance', content: <AssuranceForm event={item} handleCloseModal={handleCloseModal} /> })}>
                    <td>{item.id}</td>
                    <td>{item.company}</td>
                    <td>{item.organization}</td>
                    <td>{item.type}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.gln}</td>
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
            
                <PageTitle title="Gestion des assurances" icon={<MdOutlineHealthAndSafety size={40} />}>
                    <SearchFilter value={search} handleSearch={({ currentTarget }) => setSearch(currentTarget.value)}>
                        <div onClick={() => setFilters({ ...filters, isActive: !filters.isActive })}>
                            <BsCheck2Circle size={30} className={`cursor-pointer ${filters.isActive ? "text-primary" : "text-error"}`} />
                        </div>
                    </SearchFilter>
                    <div onClick={() => handleOpenModal({ title: 'Nouvelle assurance', content: <AssuranceForm handleCloseModal={handleCloseModal} /> })}>
                        <AiFillPlusCircle size={52} className="text-action rounded-full hover:text-primary" />
                    </div>
                </PageTitle>

                <table className="responsive-table">
                    <thead>
                        <tr>
                            <ThTable handleSort={handleSort} title="#" sort={sort} sortBy='id' className='w-24' />
                            <ThTable handleSort={handleSort} title="Assurance" sort={sort} sortBy='company' />
                            <ThTable handleSort={handleSort} title="Groupe" sort={sort} sortBy='organization' />
                            <ThTable handleSort={handleSort} title="Type" sort={sort} sortBy='type' />
                            <ThTable handleSort={handleSort} title="Téléphone" sort={sort} sortBy='phone' />
                            <ThTable handleSort={handleSort} title="Email" sort={sort} sortBy='email' />
                            <ThTable handleSort={handleSort} title="N° GLN" sort={sort} sortBy='gln' />
                        </tr>
                    </thead>
                    <tbody>
                        <AssurancesContainer search={search} sort={sort} filters={filters}>
                            <Row />
                        </AssurancesContainer>
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

export default AssurancesPage