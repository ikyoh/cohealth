import React, { useState } from 'react'
import Layout from '../layouts/Layout'
import { AiFillPlusCircle } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import ServiceForm from '../forms/ServiceForm';
import ServicesContainer from '../features/services/ServicesContainer';
import SearchFilter from '../components/SearchFilter';
import ThTable from '../components/table/ThTable';
import PageTitle from '../layouts/PageTitle';


const ServicesPage = () => {

    const PageContent = ({ handleOpenModal, handleCloseModal }) => {

        const [search, setSearch] = useState('')
        const [filters, setFilters] = useState({
            isActive: true
        })
        const [sort, setSort] = useState({ by: 'id', direction: 'asc' })

        const Row = ({ item }) => {
            return (
                <tr onClick={() => handleOpenModal({ title: 'Edition de la prestation', content: <ServiceForm event={item} handleCloseModal={handleCloseModal} /> })}>
                    <td>{item.id}</td>
                    <td>{item.family}</td>
                    <td>{item.category}</td>
                    <td>{item.title}</td>
                    <td>{item.act}</td>
                    <td>{item.opas}</td>
                    <td>{item.time}</td>
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
                <PageTitle title="Gestion des prestations">
                    <SearchFilter value={search} handleSearch={({ currentTarget }) => setSearch(currentTarget.value)}>
                        <div onClick={() => setFilters({ ...filters, isActive: !filters.isActive })}>
                            <BsCheck2Circle size={30} className={`cursor-pointer ${filters.isActive ? "text-primary" : "text-error"}`} />
                        </div>
                    </SearchFilter>

                    <div onClick={() => handleOpenModal({ title: 'Nouvelle prestation', content: <ServiceForm handleCloseModal={handleCloseModal} /> })}>
                        <AiFillPlusCircle size={52} className="text-action rounded-full hover:text-primary" />
                    </div>
                </PageTitle>

                <table className="responsive-table">
                    <thead>
                        <tr>
                            <ThTable handleSort={handleSort} title="#" sort={sort} sortBy='id' className='w-24' />
                            <ThTable handleSort={handleSort} title="Famille" sort={sort} sortBy='family' />
                            <ThTable handleSort={handleSort} title="Catégorie" sort={sort} sortBy='category' />
                            <ThTable handleSort={handleSort} title="Intitulé" sort={sort} sortBy='title' className='w-96' />
                            <ThTable handleSort={handleSort} title="N° Acte" sort={sort} sortBy='act' />
                            <ThTable handleSort={handleSort} title="OPAS" sort={sort} sortBy='opas' />
                            <ThTable handleSort={handleSort} title="Durée" sort={sort} sortBy='time' />
                        </tr>
                    </thead>
                    <tbody>
                        <ServicesContainer search={search} sort={sort} filters={filters}>
                            <Row />
                        </ServicesContainer>
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

export default ServicesPage