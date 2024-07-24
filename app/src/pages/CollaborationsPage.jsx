import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { MdPendingActions } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import MissionStatus from "../components/mission_status/MissionsStatus";
import OpasStatus from "../components/opas/OpasStatus";
import Pagination from "../components/pagination/Pagination";
import * as Table from "../components/table/Table";
import { API_MISSIONS, URL } from "../config/api.config";
import { useFilterMissions } from "../hooks/useFilterMissions";
import { useSearch } from "../hooks/useSearch";
import { useSortBy } from "../hooks/useSortBy";
import PageTitle from "../layouts/PageTitle";
import { useGetCollaborationPaginatedDatas } from "../queryHooks/useMission";
import { calcNumberOfDays } from "../utils/functions";

const CollaborationsPage = () => {
    const { state: initialPageState } = useLocation();
    const navigate = useNavigate();
    const { searchValue, searchbar } = useSearch(
        initialPageState ? initialPageState.searchValue : ""
    );
    const { filters, filter } = useFilterMissions();
    const [page, setPage] = useState(
        initialPageState ? initialPageState.page : 1
    );
    const { sortValue, sortDirection, handleSort } = useSortBy(
        initialPageState
            ? {
                  value: initialPageState.sortValue,
                  direction: initialPageState.sortDirection,
              }
            : ""
    );
    const { data, isLoading } = useGetCollaborationPaginatedDatas(
        page,
        sortValue,
        sortDirection,
        searchValue,
        filters
    );

    useEffect(() => {
        if (searchValue && !initialPageState) {
            setPage(1);
        }
        if (sortValue && !initialPageState) {
            setPage(1);
        }
        if (sortDirection && !initialPageState) {
            setPage(1);
        }
        // eslint-disable-next-line
    }, [searchValue, sortValue]);

    if (isLoading) return <Loader />;
    return (
        <>
            <PageTitle
                title={"Liste des collaborations"}
                subtitle={data["hydra:totalItems"]}
                icon={<MdPendingActions size={40} />}
            >
                {searchbar}
                {filter}
            </PageTitle>

            <Table.Table>
                <Table.Thead>
                    <Table.Th
                        label="#"
                        sortBy="id"
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Référent"
                        sortBy="user.id"
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Patient"
                        sortBy="patient.lastname"
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Début"
                        sortBy="beginAt"
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Fin"
                        sortBy="endAt"
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th label="Durée" />
                    <Table.Th
                        label="OPAS"
                        sortBy="opas.status"
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Statut"
                        sortBy="status"
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                </Table.Thead>
                <Table.Tbody>
                    {!isLoading &&
                        data["hydra:member"].map((data) => (
                            <Table.Tr
                                key={data.id}
                                onClick={() =>
                                    navigate(API_MISSIONS + "/" + data.id, {
                                        state: {
                                            page: page,
                                            sortDirection: sortDirection,
                                            sortValue: sortValue,
                                            searchValue: searchValue,
                                        },
                                    })
                                }
                            >
                                <Table.Td text={data.id} />
                                <Table.Td
                                    label="Référent"
                                    text={
                                        data.user.lastname +
                                        " " +
                                        data.user.firstname
                                    }
                                >
                                    {data.user.avatar ? (
                                        <img
                                            src={
                                                URL +
                                                data.user.avatar.contentUrl
                                            }
                                            className="rounded-full object-cover h-10 w-10 mr-20"
                                            alt="profil"
                                        />
                                    ) : (
                                        <div className="rounded-full flex items-center h-10 justify-center w-10 bg-info mr-2">
                                            {data.user.firstname &&
                                                data.user.firstname.charAt(0)}
                                            {data.user.lastname &&
                                                data.user.lastname.charAt(0)}
                                            {data.user.organization &&
                                                data.user.organization
                                                    .charAt(0)
                                                    .toUpperCase()}
                                        </div>
                                    )}
                                </Table.Td>
                                <Table.Td
                                    label="Patient"
                                    text={
                                        data.patient.lastname +
                                        " " +
                                        data.patient.firstname
                                    }
                                />
                                <Table.Td
                                    label="Début"
                                    text={dayjs(data.beginAt).format(
                                        "DD/MM/YYYY"
                                    )}
                                />
                                <Table.Td
                                    label="Fin"
                                    text={dayjs(data.endAt).format(
                                        "DD/MM/YYYY"
                                    )}
                                />
                                <Table.Td
                                    label="Durée"
                                    text={
                                        calcNumberOfDays(
                                            data.beginAt,
                                            data.endAt
                                        ) + " jours"
                                    }
                                />
                                <Table.Td
                                    label="Opas"
                                    children={<OpasStatus opas={data.opas} />}
                                />
                                <Table.Td
                                    label="Statut"
                                    children={<MissionStatus mission={data} />}
                                />
                            </Table.Tr>
                        ))}
                </Table.Tbody>
            </Table.Table>
            <Pagination
                totalItems={data["hydra:totalItems"]}
                page={page}
                setPage={setPage}
            />
        </>
    );
};

export default CollaborationsPage;
