import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import Dropdown from "../components/dropdown/Dropdown";
import Loader from "../components/loader/Loader";
import Pagination from "../components/pagination/Pagination";
import * as Table from "../components/table/Table";
import { useModal } from "../hooks/useModal";
import { useSearch } from "../hooks/useSearch";
import { useSortBy } from "../hooks/useSortBy";
import PageTitle from "../layouts/PageTitle";
import { useGetPaginatedDatas, usePutData } from "../queryHooks/useUser";
import { roles } from "../utils/arrays";

const UsersPage = () => {
    const { state: initialPageState } = useLocation();
    const { Modal } = useModal();

    const { searchValue, searchbar } = useSearch(
        initialPageState ? initialPageState.searchValue : ""
    );
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
    const { data = [], isLoading } = useGetPaginatedDatas(
        page,
        sortValue,
        sortDirection,
        searchValue
    );
    const { mutate } = usePutData();

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
    }, [searchValue, sortValue, initialPageState, sortDirection]);

    const handleUpdateStatus = (data) => {
        mutate({ id: data.id, isActive: !data.isActive });
    };

    if (isLoading) return <Loader />;

    return (
        <>
            <Modal />
            <PageTitle
                title="Gestion des utilisateurs"
                subtitle={data["hydra:totalItems"]}
                icon={<IoPersonCircleOutline size={40} />}
            >
                {searchbar}
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
                    <Table.Th label="Compte" />
                    <Table.Th
                        label="Nom"
                        sortBy="lastname"
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Organization"
                        sortBy="organization"
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Email"
                        sortBy="email"
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th label="Téléphone" />
                    <Table.Th
                        label="N° RCC"
                        sortBy="rcc"
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Créé le"
                        sortBy="createdAt"
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Statut"
                        sortBy="isActive"
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th label="" style={{ width: 10 }} />
                </Table.Thead>
                <Table.Tbody>
                    {!isLoading &&
                        data["hydra:member"].map((data) => (
                            <Table.Tr key={data.id}>
                                <Table.Td text={data.id} />
                                <Table.Td
                                    label="Compte"
                                    text={roles[data.roles[0]]}
                                />
                                <Table.Td
                                    label="Nom Prénom"
                                    text={data.lastname + " " + data.firstname}
                                />
                                <Table.Td
                                    label="Organisation"
                                    text={data.organization}
                                />
                                <Table.Td label="Email" text={data.email} />
                                <Table.Td
                                    label="Téléphone"
                                    text={data.mobile || data.phone}
                                />
                                <Table.Td label="RCC" text={data.rcc} />
                                <Table.Td
                                    label="Créé le"
                                    text={dayjs(data.createdAt).format("L")}
                                />
                                <Table.Td label="Statut">
                                    {data.isActive ? (
                                        <span className="px-3 py-1 uppercase text-xs rounded-full bg-success text-white">
                                            Actif
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 uppercase text-xs rounded-full bg-error text-white">
                                            Inactif
                                        </span>
                                    )}
                                </Table.Td>
                                <Table.Td label="" text="">
                                    <Dropdown type="table">
                                        <div className="form-control">
                                            <label className="flex gap-2 cursor-pointer label">
                                                <span className="label-text">
                                                    Statut
                                                </span>
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-success"
                                                    onChange={() =>
                                                        handleUpdateStatus(data)
                                                    }
                                                    defaultChecked={
                                                        data.isActive
                                                    }
                                                />
                                            </label>
                                        </div>
                                    </Dropdown>
                                </Table.Td>
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

export default UsersPage;
