import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { API_COMMENTS as API, itemsPerPage } from "../config/api.config";
import { request, requestIRI } from "../utils/axios.utils";

/* CONFIG */
const queryKey = "comments";

/* API REQUESTS */
const fetchAllDatas = () => {
    return request({ url: API + "?pagination=false", method: "get" });
};

const fetchFilteredDatas = (sortValue, sortDirection, searchValue) => {
    return request({
        url:
            API +
            "?pagination=false&order[" +
            sortValue +
            "]=" +
            sortDirection +
            "&" +
            searchValue,
        method: "get",
    });
};

const fetchPaginatedDatas = (page, sortValue, sortDirection, searchValue) => {
    return request({
        url:
            API +
            "?page=" +
            page +
            "&itemsPerPage=" +
            itemsPerPage +
            "&order[" +
            sortValue +
            "]=" +
            sortDirection +
            "&search[id,fullname,organization,email,rcc,gln]=" +
            searchValue,
        method: "get",
    });
};

const fetchOneData = ({ queryKey }) => {
    const id = queryKey[1];
    return request({ url: API + "/" + id, method: "get" });
};

const fetchIRI = ({ queryKey }) => {
    const iri = queryKey[1];
    return requestIRI({ url: iri, method: "get" });
};

const fetchDoctorComment = ({ queryKey }) => {
    const doctorID = queryKey[2];
    return request({
        url: API + "?exists[doctor]=true&doctor=" + doctorID,
        method: "get",
    });
};

const fetchAssuranceComment = ({ queryKey }) => {
    const assuranceID = queryKey[2];
    return request({
        url: API + "?exists[assurance]=true&assurance=" + assuranceID,
        method: "get",
    });
};

const postData = (form) => {
    return request({ url: API, method: "post", data: form });
};

const putData = (form) => {
    return request({ url: API + "/" + form.id, method: "put", data: form });
};

/* HOOKS */
export const useGetAllDatas = (
    search = "",
    sortValue,
    sortDirection,
    enabled
) => {
    return useQuery([queryKey], fetchAllDatas, {
        enabled: enabled ? true : false,
        staleTime: 60000,
        select: (data) => {
            if (search === "")
                return _.orderBy(
                    data["hydra:member"],
                    sortValue,
                    sortDirection
                );
            else
                return _.orderBy(
                    data["hydra:member"].filter(
                        (f) =>
                            f.fullname
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            f.rcc.toLowerCase().includes(search.toLowerCase())
                    ),
                    sortValue,
                    sortDirection
                );
        },
    });
};

export const useGetFilteredDatas = (sortValue, sortDirection, searchValue) => {
    return useQuery({
        queryKey: [queryKey, sortValue, sortDirection, searchValue],
        queryFn: () =>
            fetchFilteredDatas(sortValue, sortDirection, searchValue),
        keepPreviousData: true,
        staleTime: 60000,
        //select: data => {return data['hydra:member']}
    });
};

export const useGetPaginatedDatas = (
    page,
    sortValue,
    sortDirection,
    searchValue
) => {
    return useQuery({
        queryKey: [queryKey, page, sortValue, sortDirection, searchValue],
        queryFn: () =>
            fetchPaginatedDatas(page, sortValue, sortDirection, searchValue),
        keepPreviousData: true,
        staleTime: 60000,
        //select: data => {return data['hydra:member']}
    });
};

export const useGetOneData = (id) => {
    return useQuery([queryKey, id], fetchOneData, {
        cacheTime: 6000,
        staleTime: 60000,
        enabled: id ? true : false,
    });
};

export const useGetDoctorComment = (id) => {
    return useQuery([queryKey, "doctor", id], fetchDoctorComment, {
        cacheTime: 6000,
        staleTime: 60000,
        enabled: id ? true : false,
        select: (data) => {
            return data["hydra:member"][0];
        },
    });
};

export const useGetAssuranceComment = (id) => {
    return useQuery([queryKey, "doctor", id], fetchAssuranceComment, {
        cacheTime: 6000,
        staleTime: 60000,
        enabled: id ? true : false,
        select: (data) => {
            return data["hydra:member"][0];
        },
    });
};

export const useGetIRI = (iri) => {
    return useQuery([queryKey, iri], fetchIRI, {
        cacheTime: 6000,
        staleTime: 60000,
        enabled: iri ? true : false,
    });
};

export const usePostData = () => {
    const queryClient = useQueryClient();
    return useMutation(postData, {
        onError: (error, _, context) => {
            console.log("error", error);
        },
        onSettled: () => {
            queryClient.invalidateQueries();
        },
    });
};

export const usePutData = () => {
    const queryClient = useQueryClient();
    return useMutation(putData, {
        onError: (error, _, context) => {
            console.log("error", error);
            queryClient.setQueryData([queryKey], context.previousDatas);
        },
        onSettled: () => {
            queryClient.invalidateQueries();
        },
    });
};
