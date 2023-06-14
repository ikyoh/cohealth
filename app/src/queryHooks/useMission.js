import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom";
import { request, requestIRI } from '../utils/axios.utils'
import { API_MISSIONS as API, IRI, itemsPerPage } from '../config/api.config'
import _ from 'lodash'
import { useGetCurrentAccount } from './useAccount';
import dayjs from 'dayjs';

/* CONFIG */
const queryKey = 'missions'


/* API REQUESTS */
const fetchAllDatas = () => {
    return request({ url: API + "?pagination=false", method: 'get' })
}

const fetchFilteredDatas = (sortValue, sortDirection, searchValue) => {
    return request({ url: API + "?pagination=false" + "&order[" + sortValue + "]=" + sortDirection + "&" + searchValue, method: 'get' })
}

const fetchPaginatedDatas = (page, sortValue, sortDirection, searchValue, filters, userID) => {
    let options = "?page=" + page + "&itemsPerPage=" + itemsPerPage + "&order[" + sortValue + "]=" + sortDirection + "&user.id=" + userID
    if (searchValue) options += "&search=" + searchValue
    if (filters.status !== "all") options += "&status=" + filters.status
    return request({ url: API + options, method: 'get' })
}

const fetchCollaborationPaginatedDatas = (page, sortValue, sortDirection, searchValue, filters, userID) => {
    let options = "?page=" + page + "&itemsPerPage=" + itemsPerPage + "&order[" + sortValue + "]=" + sortDirection + "&notequal=" + userID
    if (searchValue) options += "&search=" + searchValue
    if (filters.status !== "all") options += "&status=" + filters.status
    return request({ url: API + options, method: 'get' })
}

const fetchOneData = ({ queryKey }) => {
    const id = queryKey[1]
    return request({ url: API + "/" + id, method: 'get' })
}

const fetchIRI = ({ queryKey }) => {
    const iri = queryKey[1]
    return requestIRI({ url: iri, method: 'get' })
}

const postData = form => {
    const datas = {...form}
    datas.beginAt = dayjs.utc(form.beginAt).local().format()
    datas.endAt = dayjs.utc(form.endAt).local().format()
    return request({ url: API, method: 'post', data: datas })
}

const putData = form => {
    const datas = {...form}
    datas.beginAt = dayjs.utc(form.beginAt).local().format()
    datas.endAt = dayjs.utc(form.endAt).local().format()
    return request({ url: API + "/" + form.id, method: 'put', data: datas })
}

/* HOOKS */
export const useGetAllDatas = (search = '', sortValue, sortDirection, enabled) => {
    return useQuery([queryKey], fetchAllDatas, {
        enabled: enabled ? true : false,
        staleTime: 60000,
        select: data => {
            if (search === '') return _.orderBy(data['hydra:member'], sortValue, sortDirection)
            else return _.orderBy(data['hydra:member'].filter(f =>
                f.title.toLowerCase().includes(search.toLowerCase())
            ), sortValue, sortDirection)
        }
    })
}

export const useGetFilteredDatas = (sortValue, sortDirection, searchValue) => {
    return useQuery({
        queryKey: [queryKey, sortValue, sortDirection, searchValue],
        queryFn: () => fetchFilteredDatas(sortValue, sortDirection, searchValue),
        keepPreviousData: true,
        staleTime: 60000,
        //select: data => {return data['hydra:member']}
    })
}

export const useGetPaginatedDatas = (page, sortValue, sortDirection, searchValue, filters) => {

    const { data: account } = useGetCurrentAccount()
    const userID = account?.id

    return useQuery({
        queryKey: [queryKey, page, sortValue, sortDirection, searchValue, filters],
        queryFn: () => fetchPaginatedDatas(page, sortValue, sortDirection, searchValue, filters, userID),
        keepPreviousData: true,
        cacheTime: 60000,
        staleTime: 60000,
        enabled: !!userID,
        //select: data => {return data['hydra:member']}
    })
}

export const useGetCollaborationPaginatedDatas = (page, sortValue, sortDirection, searchValue, filters) => {

    const { data: account } = useGetCurrentAccount()
    const userID = account?.id

    return useQuery({
        queryKey: ["collaboration" + queryKey, page, sortValue, sortDirection, searchValue, filters],
        queryFn: () => fetchCollaborationPaginatedDatas(page, sortValue, sortDirection, searchValue, filters, userID),
        keepPreviousData: true,
        cacheTime: 60000,
        staleTime: 60000,
        enabled: !!userID,
        //select: data => {return data['hydra:member']}
    })
}


export const useGetOneData = (id) => {
    return useQuery([queryKey, IRI + API + "/" + id], fetchIRI, {
        cacheTime: 60000,
        staleTime: 60000,
        enabled: id ? true : false
    })
}

export const useGetIRI = (iri) => {
    return useQuery([queryKey, iri], fetchIRI, {
        cacheTime: 60000,
        staleTime: 60000,
        enabled: iri ? true : false
    })
}

export const usePostData = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    return useMutation(postData, {
        onSuccess: (data) => {
            navigate(API + "/" + data.id)
        },
        onError: (error, _, context) => {
            console.log('error', error)
        },
        onSettled: () => {
            queryClient.invalidateQueries()
        }
    })
}

export const usePutData = () => {
    const queryClient = useQueryClient()
    return useMutation(putData, {
        onError: (error, _, context) => {
            console.log('error', error)
            queryClient.setQueryData([queryKey], context.previousDatas)
        },
        onSettled: () => {
            queryClient.invalidateQueries()
        }
    })
}