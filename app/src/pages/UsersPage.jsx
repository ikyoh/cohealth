import React, { useState } from 'react'
import Layout from '../layouts/Layout'
import { AiFillPlusCircle } from "react-icons/ai"
import { BsCheck2Circle } from "react-icons/bs"
import UserForm from '../forms/UserForm'
import UsersContainer from '../features/users/UsersContainer'
import SearchFilter from '../components/SearchFilter'
import ThTable from '../components/table/ThTable'
import * as dayjs from 'dayjs'
import { VscOrganization, VscPersonAdd, VscPerson } from "react-icons/vsc"
import PageTitle from '../layouts/PageTitle'
import { API_URL } from '../features/apiConfig'

const UsersPage = () => {

    const PageContent = ({ handleOpenModal, handleCloseModal }) => {

        const [search, setSearch] = useState('')
        const [filters, setFilters] = useState({
            roles: null,
            isActive: true
        })
        const [sort, setSort] = useState({ by: 'id', direction: 'asc' })

        const Row = ({ item }) => {
            return (
                <tr onClick={() => handleOpenModal({ title: 'Edition utilisateur', content: <UserForm event={item} handleCloseModal={handleCloseModal} /> })}>
                    <td>{item.id}</td>
                    <td>
                        <div className='flex items-center gap-3'>
                            {item.avatar
                                ? <img src={API_URL + item.avatar.contentUrl} className='rounded-full object-cover h-10 w-10' alt="profil" />
                                : <div className='rounded-full flex items-center justify-center h-10 w-10 bg-info'>
                                    {item.firstname.charAt(0)}
                                    {item.lastname.charAt(0)}
                                </div>
                            }
                            <div>
                                {item.firstname} {item.lastname} {item.organization}
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className='flex items-center space-x-2'>
                            {item.roles.includes('ROLE_ORGANIZATION') && <>
                                <VscOrganization size={26} />
                                <div>Organisation</div>
                            </>}
                            {item.roles.includes('ROLE_NURSE') && <>
                                <VscPersonAdd size={26} />
                                <div>Libéral</div>
                            </>}
                            {item.roles.includes('ROLE_EMPLOYEE') && <>
                                <VscPerson size={26} />
                                <div>Collaborateur</div>
                            </>}
                        </div>
                    </td>

                    <td>{item.phone} / {item.mobile}</td>
                    <td>{item.email}</td>
                    <td>{item.gln}</td>
                    <td>{item.rcc}</td>
                    <td>{dayjs(item.createdAt).format('L')}</td>
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
                <PageTitle title="Gestion des utilisateurs">
                    <SearchFilter value={search} handleSearch={({ currentTarget }) => setSearch(currentTarget.value)}>
                        <div onClick={() => setFilters({ ...filters, isActive: !filters.isActive })}>
                            <BsCheck2Circle size={30} className={`cursor-pointer ${filters.isActive ? "text-primary" : "text-error"}`} />
                        </div>
                        <div onClick={() => filters.roles === 'ROLE_ORGANIZATION' ? setFilters({ ...filters, roles: '' }) : setFilters({ ...filters, roles: 'ROLE_ORGANIZATION' })}>
                            <VscOrganization size={30} className={`cursor-pointer ${filters.roles !== "ROLE_ORGANIZATION" ? "text-primary" : "text-error"}`} />
                        </div>
                        <div onClick={() => filters.roles === 'ROLE_NURSE' ? setFilters({ ...filters, roles: '' }) : setFilters({ ...filters, roles: 'ROLE_NURSE' })}>
                            <VscPersonAdd size={30} className={`cursor-pointer ${filters.roles !== "ROLE_NURSE" ? "text-primary" : "text-error"}`} />
                        </div>
                        <div onClick={() => filters.roles === 'ROLE_EMPLOYEE' ? setFilters({ ...filters, roles: '' }) : setFilters({ ...filters, roles: 'ROLE_EMPLOYEE' })}>
                            <VscPerson size={30} className={`cursor-pointer ${filters.roles !== "ROLE_EMPLOYEE" ? "text-primary" : "text-error"}`} />
                        </div>
                    </SearchFilter>
                    <div onClick={() => handleOpenModal({ title: 'Nouvel utilisateur', content: <UserForm handleCloseModal={handleCloseModal} /> })}>
                        <AiFillPlusCircle size={52} className="text-action rounded-full hover:text-primary" />
                    </div>
                </PageTitle>

                <table className="responsive-table">
                    <thead>
                        <tr>
                            <ThTable handleSort={handleSort} title="#" sort={sort} sortBy='id' className='w-24' />
                            <ThTable handleSort={handleSort} title="Nom" sort={sort} sortBy='fullname' className='w-80' />
                            <ThTable handleSort={handleSort} title="Catégorie" sort={sort} sortBy='fullname' />
                            <ThTable handleSort={handleSort} title="Téléphone" sort={sort} />
                            <ThTable handleSort={handleSort} title="Email" sort={sort} sortBy='email' />
                            <ThTable handleSort={handleSort} title="N° GLN" sort={sort} sortBy='gln' />
                            <ThTable handleSort={handleSort} title="N° RCC" sort={sort} sortBy='rcc' />
                            <ThTable handleSort={handleSort} title="Date de création" sort={sort} sortBy='rcc' />
                        </tr>
                    </thead>
                    <tbody>
                        <UsersContainer search={search} sort={sort} filters={filters}>
                            <Row />
                        </UsersContainer>
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

export default UsersPage