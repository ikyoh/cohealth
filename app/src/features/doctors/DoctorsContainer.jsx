
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { selectAllDoctors, getDoctorsStatus, getDoctorsError, fetchDoctors } from "./doctorsSlice";
import _ from 'lodash'


const DoctorsContainer = ({ children, search = null, filters = { isActive: true }, sort = { by: "id", direction: "asc" } }) => {

    const dispatch = useDispatch();
    const doctors = useSelector(selectAllDoctors);
    const status = useSelector(getDoctorsStatus);
    const error = useSelector(getDoctorsError);

    const [datas, setDatas] = useState([])

    const filterDatas = () => {

        return _.orderBy(datas.filter(f =>
            f.isActive === filters.isActive && (
                f.fullname.toLowerCase().includes(search.toLowerCase()) ||
                f.rcc.toLowerCase().includes(search.toLowerCase()) ||
                f.gln.toLowerCase().includes(search.toLowerCase())
            )
        ), sort.by, sort.direction)

    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchDoctors())
        }
    }, [status, dispatch])

    useEffect(() => {
        if (status === 'succeeded') {
            setDatas(doctors)
        }
    }, [doctors, dispatch])

    
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


export default DoctorsContainer