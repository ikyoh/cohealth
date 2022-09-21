
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { selectAllPartners, getPartnersStatus, getPartnersError, fetchPartners } from "./partnersSlice";
import { useEffect } from "react";
import _ from 'lodash'


const PartnersContainer = ({ children, search = null, filters = { isActive: false }, sort = { by: "lastname", direction: "asc" } }) => {

    const dispatch = useDispatch();
    const Partners = useSelector(selectAllPartners);
    const status = useSelector(getPartnersStatus);
    const error = useSelector(getPartnersError);

    const [datas, setDatas] = useState([])

    const filterDatas = () => {

        if (search)
            return _.orderBy(datas.filter(f =>
                f.firstname.toLowerCase().includes(search.toLowerCase()) ||
                f.lastname.toLowerCase().includes(search.toLowerCase()) ||
                f.mobile.toLowerCase().includes(search.toLowerCase()) ||
                f.rcc.toLowerCase().includes(search.toLowerCase()) ||
                f.email.toLowerCase().includes(search.toLowerCase())
            ), sort.by, sort.direction)
        else
            return _.orderBy(datas, sort.by, sort.direction)

    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPartners())
        }
    }, [status, dispatch])

    useEffect(() => {
        if (status === 'succeeded') {
            let partners = Partners.reduce(function (acc, curr) {
                return [...acc, curr.partner];
            }, []);

            setDatas(partners)
        }
    }, [Partners, dispatch])


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


export default PartnersContainer