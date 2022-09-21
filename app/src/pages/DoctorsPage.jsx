import React, { useState } from 'react'
import Layout from '../layouts/Layout'
import { AiFillPlusCircle } from "react-icons/ai"
import { BsCheck2Circle } from "react-icons/bs"
import { RiStethoscopeFill } from "react-icons/ri"
import DoctorForm from '../forms/DoctorForm'
import DoctorsContainer from '../features/doctors/DoctorsContainer'
import SearchFilter from '../components/SearchFilter'
import ThTable from '../components/table/ThTable'
import PageTitle from '../layouts/PageTitle'


const DoctorsPage = () => {

    const PageContent = ({ handleOpenModal, handleCloseModal }) => {

        const [search, setSearch] = useState('')
        const [filters, setFilters] = useState({
            isActive: true
        })
        const [sort, setSort] = useState({ by: 'id', direction: 'asc' })

        const Row = ({ item }) => {
            return (
                <tr onClick={() => handleOpenModal({ title: item.fullname + ' - ' + item.category, content: <DoctorForm event={item} handleCloseModal={handleCloseModal} /> })}>
                    <td>{item.id}</td>
                    <td>{item.fullname}</td>
                    <td>{item.category}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.canton}</td>
                    <td>{item.gln}</td>
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
                <PageTitle title="Gestion des médecins" icon={<RiStethoscopeFill size={40} />}>
                    <SearchFilter value={search} handleSearch={({ currentTarget }) => setSearch(currentTarget.value)}>
                        <div onClick={() => setFilters({ ...filters, isActive: !filters.isActive })}>
                            <BsCheck2Circle size={30} className={`cursor-pointer ${filters.isActive ? "text-primary" : "text-error"}`} />
                        </div>
                    </SearchFilter>
                    <div onClick={() => handleOpenModal({ title: 'Nouveau médecin', content: <DoctorForm handleCloseModal={handleCloseModal} /> })}>
                        <AiFillPlusCircle size={52} className="text-action rounded-full hover:text-primary" />
                    </div>
                </PageTitle>

                <table className="responsive-table">
                    <thead>
                        <tr>
                            <ThTable handleSort={handleSort} title="#" sort={sort} sortBy='id' className='w-24' />
                            <ThTable handleSort={handleSort} title="Nom / Prénom" sort={sort} sortBy='fullname' />
                            <ThTable handleSort={handleSort} title="Spécialité" sort={sort} sortBy='category' />
                            <ThTable handleSort={handleSort} title="Téléphone" sort={sort} sortBy='phone' />
                            <ThTable handleSort={handleSort} title="Email" sort={sort} sortBy='email' />
                            <ThTable handleSort={handleSort} title="Canton" sort={sort} sortBy='canton' />
                            <ThTable handleSort={handleSort} title="N° GLN" sort={sort} sortBy='gln' />
                            <ThTable handleSort={handleSort} title="N° RCC" sort={sort} sortBy='rcc' />
                        </tr>
                    </thead>
                    <tbody>
                        <DoctorsContainer search={search} sort={sort} filters={filters}>
                            <Row />
                        </DoctorsContainer>
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

export default DoctorsPage