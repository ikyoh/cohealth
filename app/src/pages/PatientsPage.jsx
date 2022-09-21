import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getPatientsNavigate } from "../features/patients/patientsSlice"
import Layout from '../layouts/Layout'
import { AiFillPlusCircle } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { IoPersonCircleOutline}  from "react-icons/io5";
import PatientForm from '../forms/PatientForm';
import PatientsContainer from '../features/patients/PatientsContainer';
import SearchFilter from '../components/SearchFilter';
import ThTable from '../components/table/ThTable';
import PageTitle from '../layouts/PageTitle';
import { API_PATIENTS } from '../features/apiConfig'

const PatientsPage = () => {

    const navigate = useNavigate();

    const newPatientID = useSelector(getPatientsNavigate)
    
    useEffect(() => {
        if (newPatientID)
        navigate("/patients/" + newPatientID, { state: { patient: {} } })
    }, [newPatientID])

    const PageContent = ({ handleOpenModal, handleCloseModal }) => {

        const [search, setSearch] = useState('')
        const [filters, setFilters] = useState({
            isActive: true
        })
        const [sort, setSort] = useState({ by: 'id', direction: 'asc' })

        const Row = ({ item }) => {
            return (
                <tr onClick={() =>
                    navigate("/patients/" + item.id, { state: { patient: item } })
                }>
                {/* <tr onClick={() => handleOpenModal({ title: 'Edition patient', content: <PatientForm event={item} handleCloseModal={handleCloseModal} /> })}> */}
                    <td>{item.id}</td>
                    <td>{item.lastname.toUpperCase()} {item.firstname}</td>
                    <td>{item.doctor && item.doctor.fullname}</td>
                    <td>{item.assurance && item.assurance.company}</td>
                    <td>Status</td>
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
            
                <PageTitle title="Gestion des patients" icon={<IoPersonCircleOutline size={40} />}>
                    <SearchFilter value={search} handleSearch={({ currentTarget }) => setSearch(currentTarget.value)}>
                        <div onClick={() => setFilters({ ...filters, isActive: !filters.isActive })}>
                            <BsCheck2Circle size={30} className={`cursor-pointer ${filters.isActive ? "text-primary" : "text-error"}`} />
                        </div>
                    </SearchFilter>
                    <div onClick={() => handleOpenModal({ title: 'Nouveau patient', content: <PatientForm handleCloseModal={handleCloseModal} /> })}>
                        <AiFillPlusCircle size={52} className="text-action rounded-full hover:text-primary" />
                    </div>
                </PageTitle>

                <table className="responsive-table">
                    <thead>
                        <tr>
                            <ThTable handleSort={handleSort} title="#" sort={sort} sortBy='id' className='w-24' />
                            <ThTable handleSort={handleSort} title="Nom / Prénom" sort={sort} sortBy='company' />
                            <ThTable handleSort={handleSort} title="Médecin" sort={sort} sortBy='type' />
                            <ThTable handleSort={handleSort} title="Assurance" sort={sort} sortBy='type' />
                            <ThTable handleSort={handleSort} title="Status" sort={sort} sortBy='type' />
                        </tr>
                    </thead>
                    <tbody>
                        <PatientsContainer search={search} sort={sort} filters={filters}>
                            <Row />
                        </PatientsContainer>
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

export default PatientsPage