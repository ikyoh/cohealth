import React, { useEffect, useState } from "react";
import { GiHealthNormal } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import AddButton from "../components/buttons/AddButton";
import Loader from "../components/Loader";
import Pagination from "../components/pagination/Pagination";
import * as Table from "../components/table/Table";
import ServiceForm from "../forms/ServiceForm";
import { useModal } from "../hooks/useModal";
import { useSearch } from "../hooks/useSearch";
import { useSortBy } from "../hooks/useSortBy";
import PageTitle from "../layouts/PageTitle";
import { useGetPaginatedDatas } from "../queryHooks/useService";

const ServicesPage = () => {
    const { state: initialPageState } = useLocation();
    const { Modal, handleOpenModal, handleCloseModal } = useModal();

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
    const { data, isLoading } = useGetPaginatedDatas(
        page,
        sortValue,
        sortDirection,
        searchValue
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
    }, [searchValue, sortValue, initialPageState, sortDirection]);

    if (isLoading) return <Loader />;
    else
        return (
            <>
                <Modal />
                <PageTitle
                    title="Liste des prestations"
                    subtitle={data["hydra:totalItems"]}
                    icon={<GiHealthNormal size={40} />}
                    mainButton={
                        <AddButton
                            onClick={() =>
                                handleOpenModal({
                                    title: "Nouvelle prestation",
                                    content: (
                                        <ServiceForm
                                            handleCloseModal={handleCloseModal}
                                        />
                                    ),
                                })
                            }
                        />
                    }
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
                        <Table.Th
                            label="Famille"
                            sortBy="family"
                            sortValue={sortValue}
                            sortDirection={sortDirection}
                            handleSort={handleSort}
                        />
                        <Table.Th
                            label="Catégorie"
                            sortBy="category"
                            sortValue={sortValue}
                            sortDirection={sortDirection}
                            handleSort={handleSort}
                        />
                        <Table.Th
                            label="Intitulé"
                            sortBy="title"
                            sortValue={sortValue}
                            sortDirection={sortDirection}
                            handleSort={handleSort}
                        />
                        <Table.Th
                            label="N° Acte"
                            sortBy="act"
                            sortValue={sortValue}
                            sortDirection={sortDirection}
                            handleSort={handleSort}
                        />
                        <Table.Th
                            label="OPAS"
                            sortBy="opas"
                            sortValue={sortValue}
                            sortDirection={sortDirection}
                            handleSort={handleSort}
                        />
                        <Table.Th
                            label="Durée"
                            sortBy="time"
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
                                        handleOpenModal({
                                            title: "Edition",
                                            content: (
                                                <ServiceForm
                                                    iri={data["@id"]}
                                                    handleCloseModal={
                                                        handleCloseModal
                                                    }
                                                />
                                            ),
                                        })
                                    }
                                >
                                    <Table.Td text={data.id} />
                                    <Table.Td
                                        label="Famille"
                                        text={data.family}
                                    />
                                    <Table.Td
                                        label="Catégorie"
                                        text={data.category}
                                    />
                                    <Table.Td
                                        label="Intitulé"
                                        text={data.title}
                                    />
                                    <Table.Td label="N° Acte" text={data.act} />
                                    <Table.Td label="OPAS" text={data.opas} />
                                    <Table.Td label="Durée" text={data.time} />
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

export default ServicesPage;
