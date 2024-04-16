import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_MANDATE_GROUPS as API, itemsPerPage } from "../config/api.config";
import { request, requestIRI } from "../utils/axios.utils";

/* CONFIG */
const queryKey = "mandateGroups";

/* API REQUESTS */
const fetchAllDatas = () => {
    return request({ url: API + "?pagination=false", method: "get" });
};

const fetchFilteredDatas = (sortValue, sortDirection, searchValue, filters) => {
    return request({
        url:
            API +
            "?pagination=false" +
            "&order[" +
            sortValue +
            "]=" +
            sortDirection +
            "&" +
            searchValue,
        method: "get",
    });
};

const fetchPaginatedDatas = (
    page,
    sortValue,
    sortDirection,
    searchValue,
    filters
) => {
    let options =
        "?page=" +
        page +
        "&itemsPerPage=" +
        itemsPerPage +
        "&order[" +
        sortValue +
        "]=" +
        sortDirection;
    if (searchValue) options += "&search=" + searchValue;
    if (filters.status !== "all") options += "&status=" + filters.status;
    return request({ url: API + options, method: "get" });
};

const fetchOneData = ({ queryKey }) => {
    const id = queryKey[1];
    return request({ url: API + "/" + id, method: "get" });
};

const fetchIRI = ({ queryKey }) => {
    const iri = queryKey[1];
    return requestIRI({ url: iri, method: "get" });
};

const deleteIRI = (iri) => {
    return requestIRI({ url: iri, method: "delete" });
};

const postData = (form) => {
    const _form = { ...form };
    return request({ url: API, method: "post", data: _form });
};

const putData = (form) => {
    const _form = { ...form };
    //if (form.content) form.patientFullname = form.content.patient.lastname + " " + form.content.patient.firstname
    delete _form.createdAt;
    delete _form.documents;
    delete _form.mission;
    delete _form.user;
    return request({ url: API + "/" + form.id, method: "put", data: _form });
};

/* HOOKS */
export const useGetAllDatas = (enabled = true) => {
    return useQuery([queryKey], fetchAllDatas, {
        enabled: enabled ? true : false,
        staleTime: 60000,
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
    searchValue,
    filters
) => {
    return useQuery({
        queryKey: [
            queryKey,
            page,
            sortValue,
            sortDirection,
            searchValue,
            filters,
        ],
        queryFn: () =>
            fetchPaginatedDatas(
                page,
                sortValue,
                sortDirection,
                searchValue,
                filters
            ),
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

export const useDeleteIRI = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteIRI, {
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
            //queryClient.invalidateQueries()
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
    });
};
