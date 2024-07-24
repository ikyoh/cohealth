import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { API_USERS as API, itemsPerPage } from "../config/api.config";
import { request, requestIRI } from "../utils/axios.utils";

/* CONFIG */
const queryKey = "users";

/* API REQUESTS */
const fetchAllDatas = () => {
    return request({ url: API + "?pagination=false", method: "get" });
};

const fetchFilteredDatas = (sortValue, sortDirection, searchValue) => {
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
    filters = false
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
    if (filters.rcc) options += "&rcc=" + filters.rcc;
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

// const postData = (form) => {
//     return request({ url: API, method: "post", data: form });
// };

const putData = (form) => {
    return request({ url: API + "/" + form.id, method: "put", data: form });
};

/* HOOKS */
export const useGetAllDatas = (
    search = "",
    sortValue = "id",
    sortDirection = "ASC",
    enabled = true
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
                    data["hydra:member"].filter((f) =>
                        f.title.toLowerCase().includes(search.toLowerCase())
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
    searchValue,
    filters,
    enabled = true
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
        enabled: enabled,
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

export const usePutData = (iri) => {
    const queryClient = useQueryClient();
    return useMutation(putData, {
        onMutate: async (updateData) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries([queryKey, iri]);

            // Snapshot the previous value
            const previousData = queryClient.getQueryData([queryKey, iri]);

            // Optimistically update to the new value
            queryClient.setQueryData([queryKey, iri], {
                ...previousData,
                ...updateData,
            });

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
            queryClient.invalidateQueries([queryKey]);
        },
    });
};
