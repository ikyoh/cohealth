
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { selectAllAssurances, getAssurancesStatus, getAssurancesError, fetchAssurances } from "./assurancesSlice";
import { useEffect } from "react";
import _ from 'lodash'


const AssurancesContainer = ({ children, search = null, filters = { isActive: true }, sort = { by: "id", direction: "asc" } }) => {

    const dispatch = useDispatch();
    const assurances = useSelector(selectAllAssurances);
    const status = useSelector(getAssurancesStatus);
    const error = useSelector(getAssurancesError);

    const [datas, setDatas] = useState([])

    const filterDatas = () => {

        return _.orderBy(datas.filter(f =>
            f.isActive === filters.isActive
             && (
                f.company.toLowerCase().includes(search.toLowerCase()) ||
                f.type.toLowerCase().includes(search.toLowerCase()) ||
                f.gln.toLowerCase().includes(search.toLowerCase())
            )
        ), sort.by, sort.direction)

    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAssurances())
        }
    }, [status, dispatch])

    useEffect(() => {
        if (status === 'succeeded') {
            setDatas(assurances)
        }
    }, [assurances, dispatch])




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


export default AssurancesContainer