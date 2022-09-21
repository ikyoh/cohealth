
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { selectAllServices, getServicesStatus, getServicesError, fetchServices, getServicesSaved } from "./servicesSlice";
import { useEffect } from "react";
import _ from 'lodash'


const ServicesContainer = ({ children, search = null, filters = { isActive: true }, sort = { by: "id", direction: "asc" } }) => {

    const dispatch = useDispatch();
    const services = useSelector(selectAllServices);
    const status = useSelector(getServicesStatus);
    const error = useSelector(getServicesError);

    const [datas, setDatas] = useState([])

    const filterDatas = () => {

        return _.orderBy(datas.filter(f =>
            f.isActive === filters.isActive &&
            (f.title.toLowerCase().includes(search.toLowerCase()) ||
                f.family.toLowerCase().includes(search.toLowerCase()) ||
                f.act.toString().includes(search) ||
                f.category.toLowerCase().includes(search.toLowerCase()))
        ), sort.by, sort.direction)

    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchServices())
        }
    }, [status, dispatch])

    useEffect(() => {
        if (status === 'succeeded') {
            setDatas(services)
        }
    }, [services, dispatch])




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


export default ServicesContainer