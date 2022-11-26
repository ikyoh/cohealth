import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
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
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import { BsThreeDotsVertical } from "react-icons/bs";
import OpasStatus from '../components/opas_status/OpasStatus'
import MissionStatus from '../components/mission_status/MissionsStatus'
import { updateMission } from "../features/missions/missionsSlice"
import { calcNumberOfDays } from '../utils/functions'

const MissionsPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const newMissionID = useSelector(getMissionsNavigate)
    const currentUser = useSelector(getAccount)

    useEffect(() => {
        if (newMissionID)
            navigate("/missions/" + newMissionID, { state: { mission: {} } })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newMissionID])


    const PageContent = ({ handleOpenModal, handleCloseModal }) => {

        const [search, setSearch] = useState('')
        const [filters, setFilters] = useState({
            isActive: true
        })
        const [sort, setSort] = useState({ by: 'id', direction: 'asc' })


        const Row = ({ item }) => {

            const DropDown = ({ item }) => {

                const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(3, { disableFocusFirstItemOnClick: true, })

                const handleChangeStatus = (event) => {
                    event.stopPropagation()
                    dispatch(updateMission({ values: { id: item.id, status: event.target.value } }))
                }

                return (

                    <div className='relative flex justify-end'>
                        <button {...buttonProps}
                            className='h-[44px] w-[44px] flex items-center rounded-full p-2 space-x-1 cursor-pointer text-primary hover:bg-slate-300'
                            onMouseEnter={() => setIsOpen(true)}
                        >
                            <BsThreeDotsVertical size={26} />
                        </button>
                        <div className={isOpen ? "absolute z-10 w-max bg-white border rounded-sm p-3 flex flex-col cursor-default" : "hidden"} role="menu"
                            onMouseLeave={() => setIsOpen(false)}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className='text-right border-b pb-2 mb-2'>
                                Action
                            </div>
                            {item.status !== 'current' &&
                                <button
                                    className='text-right hover:text-action py-1'
                                    {...itemProps[0]}
                                    onClick={handleChangeStatus}
                                    value='current'
                                >
                                    Réactiver la mission
                                </button>
                            }
                            {item.status !== 'annulée' &&
                                <button
                                    className='text-right hover:text-action py-1'
                                    {...itemProps[0]}
                                    onClick={handleChangeStatus}
                                    value='annulée'
                                >
                                    Annuler la mission
                                </button>
                            }
                            {item.status !== 'suspendue' && item.status === 'current' &&
                                <button
                                    className='text-right hover:text-action py-1'
                                    {...itemProps[1]}
                                    onClick={handleChangeStatus}
                                    value='suspendue'
                                >
                                    Suspendre la mission
                                </button>
                            }
                            {item.status !== 'archivée' &&
                                <button
                                    className='text-right hover:text-action py-1'
                                    {...itemProps[2]}
                                    onClick={handleChangeStatus}
                                    value='archivée'
                                >
                                    Archiver la mission
                                </button>
                            }
                        </div>
                    </div>

                )

            }

            return (

                <tr
                    className={`${item.user.id !== currentUser.id && 'bg-slate-200'}`}
                    onClick={() =>
                        navigate("/missions/" + item.id, { state: { mission: item } })
                    }
                >
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
                        {calcNumberOfDays(item.beginAt, item.endAt)} jours
                    </td>
                    <td>
                        <OpasStatus prescriptions={item.prescriptions} />
                    </td>
                    <td>
                        <div className="flex flex-wrap gap-2">
                            <MissionStatus mission={item} />
                        </div>
                    </td>
                    <td className='flex justify-end'>
                        <DropDown item={item} />
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
                            <ThTable handleSort={handleSort} title="OPAS" sort={sort} sortBy='email' />
                            <ThTable handleSort={handleSort} title="Statut" sort={sort} sortBy='email' />
                            <th></th>
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