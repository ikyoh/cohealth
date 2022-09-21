
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { selectAllComments, getCommentsStatus, getCommentsError, fetchComments } from "./commentsSlice";
import _ from 'lodash'


const CommentsContainer = ({ children, search = null, filters = { isActive: false }, sort = { by: "id", direction: "asc" } }) => {

    const dispatch = useDispatch();
    const comments = useSelector(selectAllComments);
    const status = useSelector(getCommentsStatus);
    const error = useSelector(getCommentsError);

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
            dispatch(fetchComments())
        }
    }, [status, dispatch])

    useEffect(() => {
        if (status === 'succeeded') {
            setDatas(comments)
        }
    }, [comments, dispatch])




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


export default CommentsContainer