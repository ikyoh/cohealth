
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { selectAllUsers, getUsersStatus, getUsersError, fetchUsers } from "./usersSlice";
import _ from 'lodash'


const UsersContainer = ({ children, search = null, filters = { isActive: false, roles: null }, sort = { by: "id", direction: "asc" } }) => {

    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);
    const status = useSelector(getUsersStatus);
    const error = useSelector(getUsersError);

    const [datas, setDatas] = useState([])

    const filterDatas = () => {

        const filteringRoles = () => {
            if (filters.roles)
                return datas.filter(f => !f.roles.includes('ROLE_ADMIN') && f.roles.includes(filters.roles))
            else return datas.filter(f => !f.roles.includes('ROLE_ADMIN'))
        }


        return _.orderBy(filteringRoles().filter(f =>

            f.isActive === filters.isActive && (
                f.firstname.toLowerCase().includes(search.toLowerCase()) ||
                f.rcc.toLowerCase().includes(search.toLowerCase()) ||
                f.gln.toLowerCase().includes(search.toLowerCase())
            )
        ), sort.by, sort.direction)

    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers())
        }
    }, [status, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (status === 'succeeded') {
            setDatas(users)
        }
    }, [users, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps


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


export default UsersContainer