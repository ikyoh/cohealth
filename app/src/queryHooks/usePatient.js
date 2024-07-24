import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { API_PATIENTS as API, IRI, itemsPerPage } from "../config/api.config";
import { request, requestIRI } from "../utils/axios.utils";

/* CONFIG */
const queryKey = "patients";

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
    return request({ url: API + options, method: "get" });
};

const fetchDatasByAvsNumber = (avsNumber) => {
    let options = "?avsNumber=" + avsNumber;
    return request({ url: API + options, method: "get" });
};

// const fetchOneData = ({ queryKey }) => {
//     const id = queryKey[1];
//     return request({ url: API + "/" + id, method: "get" });
// };

const fetchIRI = ({ queryKey }) => {
    const iri = queryKey[1];
    return requestIRI({ url: iri, method: "get" });
};

const postData = (form) => {
    const _form = {
        ...form,
        birthdate: dayjs.utc(form.birthdate).local().format(),
    };
    return request({ url: API, method: "post", data: _form });
};

const putData = (form) => {
    const _form = {
        ...form,
        birthdate: dayjs.utc(form.birthdate).local().format(),
    };
    return request({ url: API + "/" + form.id, method: "put", data: _form });
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
                            f.lastname
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            f.firstname
                                .toLowerCase()
                                .includes(search.toLowerCase())
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

export const useGetDatasByAvsNumber = (avsNumber) => {
    return useQuery({
        queryKey: [queryKey, avsNumber],
        queryFn: () => fetchDatasByAvsNumber(avsNumber),
        keepPreviousData: true,
        staleTime: 60000,
        enabled: avsNumber ? true : false,
        //select: data => {return data['hydra:member']}
    });
};

export const useGetOneData = (id) => {
    return useQuery([queryKey, IRI + API + "/" + id], fetchIRI, {
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
    const navigate = useNavigate();
    return useMutation(postData, {
        onSuccess: (data) => {
            navigate(API + "/" + data.id);
        },
        onError: (error, _, context) => {
            console.log("error", error);
        },
        onSettled: () => {
            queryClient.invalidateQueries();
        },
    });
};

export const usePutData = (iri) => {
    const queryClient = useQueryClient();
    return useMutation(putData, {
        onMutate: async (updateData) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries([queryKey, iri]);

            // Snapshot the previous value
            const previousData = queryClient.getQueryData([queryKey, iri]);

            // Optimistically update to the new value
            queryClient.setQueryData([queryKey, iri], updateData);

            // Return a context object with the snapshotted value
            return { previousData, updateData };
        },
        onError: (err, updateData, context) => {
            queryClient.setQueryData(
                [[queryKey, iri], context.iri],
                context.previousData
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries();
        },
    });
};
