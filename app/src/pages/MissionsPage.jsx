import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMissionsNavigate } from "../features/missions/missionsSlice"
import Layout from '../layouts/Layout'
import { AiFillPlusCircle } from "react-icons/ai"
import { BsCheck2Circle } from "react-icons/bs"
import { MdPendingActions } from 'react-icons/md'
import MissionForm from '../forms/MissionForm'
import MissionsContainer from '../features/missions/MissionsContainer'
import SearchFilter from '../components/SearchFilter'
import ThTable from '../components/table/ThTable'
import PageTitle from '../layouts/PageTitle'
import dayjs from 'dayjs'
import { getAccount } from '../features/account/accountSlice'
import { opasStatus } from '../utils/arrays'

const MissionsPage = () => {

    const navigate = useNavigate()

    const newMissionID = useSelector(getMissionsNavigate)
    const currentUser = useSelector(getAccount)

    console.log('newMissionID', newMissionID)

    useEffect(() => {
        if (newMissionID)
            navigate("/missions/" + newMissionID, { state: { mission: {} } })
    }, [newMissionID])


    const PageContent = ({ handleOpenModal, handleCloseModal }) => {

        const [search, setSearch] = useState('')
        const [filters, setFilters] = useState({
            isActive: true
        })
        const [sort, setSort] = useState({ by: 'id', direction: 'asc' })


        const OpasStatus = ({ prescriptions }) => {

            let opas = prescriptions.filter(p => p.type === "opas")

            if (opas.length === 0)
                return (
                    <div className='px-3 py-1 rounded-full bg-error text-white'>OPAS</div>
                )
            else 
                return (
                    <div className={"px-3 py-1 rounded-full text-white bg-" + opasStatus[opas[0].status]}>OPAS</div> || null
                )

        }

        const MissionStatus = ({ mission }) => {

            if (mission.status === "Annulée")
                return (
                    <div className='px-3 py-1 rounded-full bg-success text-white'>Annulée</div>
                )

            if (mission.status === "En attente")
                return (
                    <div className='px-3 py-1 rounded-full bg-success text-white'>En attente</div>
                )

         
            return (
                null
                // <div className='px-3 py-1 rounded-full bg-success text-white'>En cours</div>
            )
        }

        const Row = ({ item }) => {

            return (

                <tr
                    className={`${item.user['@id'] !== currentUser['@id'] && 'bg-slate-200'}`}
                    onClick={() =>
                        navigate("/missions/" + item.id, { state: { mission: item } })
                    }>
                    <td >{item.id}</td>
                    <td>
                        {item.patient.gender === 'homme' ? 'Mr ' : 'Mme '}
                        {item.patient.lastname.toUpperCase()} {item.patient.firstname}
                    </td>
                    <td>{dayjs(item.beginAt).format('DD/MM/YYYY')}</td>
                    <td>
                        {item.endAt ? dayjs(item.endAt).format('DD/MM/YYYY') : "...."}
                    </td>
                    <td>
                        {item.endAt
                            ? dayjs(item.endAt).diff(dayjs(item.beginAt), 'days') + " jours"
                            : "...."
                        }
                    </td>
                    <td>
                        <div className="flex flex-wrap gap-2">
                            <MissionStatus mission={item} />
                            <OpasStatus prescriptions={item.prescriptions} />
                            {/* <div className='px-3 py-1 rounded-full bg-success text-white'>OPAS</div>
                            <div className='px-3 py-1 rounded-full bg-waiting text-white'>OPAS</div> */}
                        </div>
                    </td>
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

                <PageTitle title="Mes missions" icon={<MdPendingActions size={40} />}>
                    <SearchFilter value={search} handleSearch={({ currentTarget }) => setSearch(currentTarget.value)}>
                        <div onClick={() => setFilters({ ...filters, isActive: !filters.isActive })}>
                            <BsCheck2Circle size={30} className={`cursor-pointer ${filters.isActive ? "text-primary" : "text-error"}`} />
                        </div>
                    </SearchFilter>
                    <div onClick={() => handleOpenModal({ title: 'Nouvelle mission', content: <MissionForm handleCloseModal={handleCloseModal} /> })}>
                        <AiFillPlusCircle size={52} className="text-action rounded-full hover:text-primary" />
                    </div>
                </PageTitle>


                <table className="responsive-table">
                    <thead>
                        <tr>
                            <ThTable handleSort={handleSort} title="#" sort={sort} sortBy='id' className="w-24" />
                            <ThTable handleSort={handleSort} title="Patient" sort={sort} sortBy='company' className="w-80" />
                            <ThTable handleSort={handleSort} title="Début" sort={sort} sortBy='organization' />
                            <ThTable handleSort={handleSort} title="Fin" sort={sort} sortBy='organization' />
                            <ThTable handleSort={handleSort} title="Durée" sort={sort} sortBy='type' />
                            <ThTable handleSort={handleSort} title="Statut" sort={sort} sortBy='email' />
                        </tr>
                    </thead>
                    <tbody>
                        <MissionsContainer search={search} sort={sort} filters={filters}>
                            <Row />
                        </MissionsContainer>
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

export default MissionsPage