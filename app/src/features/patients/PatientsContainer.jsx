
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { selectAllPatients, getPatientsStatus, getPatientsError, fetchPatients } from "./patientsSlice";
import { useEffect } from "react";
import _ from 'lodash'


const PatientsContainer = ({ children, search = null, filters = { isActive: false }, sort = { by: "id", direction: "asc" } }) => {

    const dispatch = useDispatch();
    const patients = useSelector(selectAllPatients);
    const status = useSelector(getPatientsStatus);
    const error = useSelector(getPatientsError);


    const [datas, setDatas] = useState([])

    const filterDatas = () => {

        return _.orderBy(datas.filter(f =>
            f.firstname.toLowerCase().includes(search.toLowerCase()) ||
            f.lastname.toLowerCase().includes(search.toLowerCase())
        ), sort.by, sort.direction)

    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPatients())
        }
    }, [status, dispatch])

    useEffect(() => {
        if (status === 'succeeded') {
            setDatas(patients)
        }
    }, [patients, dispatch])




    if (error) return null
    else return (
        <>
            {filterDatas().map(item => {
                return (
                    <React.Fragment key={item.id}>
                        {React.cloneElement(children, { item })}
                    </React.Fragment>
                )
            })}
        </>
    )
}


export default PatientsContainer