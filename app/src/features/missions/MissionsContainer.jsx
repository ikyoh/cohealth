
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { selectAllMissions, getMissionsStatus, getMissionsError, fetchMissions } from "./missionsSlice";
import _ from 'lodash'


const MissionsContainer = ({ children, search = null, filters = { isActive: false }, sort = { by: "id", direction: "asc" } }) => {

    const dispatch = useDispatch();
    const missions = useSelector(selectAllMissions);
    const status = useSelector(getMissionsStatus);
    const error = useSelector(getMissionsError);

    const [datas, setDatas] = useState([])

    const filterDatas = () => {

        // return _.orderBy(datas.filter(f =>
        //     f.isActive === filters.isActive
        //      && (
        //         f.company.toLowerCase().includes(search.toLowerCase()) ||
        //         f.type.toLowerCase().includes(search.toLowerCase()) ||
        //         f.gln.toLowerCase().includes(search.toLowerCase())
        //     )
        // ), sort.by, sort.direction)

        return datas

    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMissions())
        }
    }, [status, dispatch])

    useEffect(() => {
        if (status === 'succeeded') {
            setDatas(missions)
        }
    }, [missions, dispatch])




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


export default MissionsContainer