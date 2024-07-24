import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { HiChevronRight, HiDotsCircleHorizontal } from "react-icons/hi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import AddButton from "../components/buttons/AddButton";
import Dropdown from "../components/dropdown/Dropdown";
import Loader from "../components/Loader";
import Pagination from "../components/pagination/Pagination";
import * as Table from "../components/table/Table";
import { API_PATIENTS } from "../config/api.config";
import PatientForm from "../forms/PatientForm";
import { useModal } from "../hooks/useModal";
import { useSearch } from "../hooks/useSearch";
import { useSortBy } from "../hooks/useSortBy";
import PageTitle from "../layouts/PageTitle";
import { useGetPaginatedDatas } from "../queryHooks/usePatient";

const PatientsPage = () => {
    const { state: initialPageState } = useLocation();
    const navigate = useNavigate();
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
    const { data = [], isLoading } = useGetPaginatedDatas(
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
        // eslint-disable-next-line
    }, [searchValue, sortValue]);

    if (isLoading) return <Loader />;
    return (
        <>
            <Modal />
            <PageTitle
                title="Liste des patients"
                subtitle={data["hydra:totalItems"]}
                icon={<IoPersonCircleOutline size={40} />}
                mainButton={
                    <AddButton
                        onClick={() =>
                            handleOpenModal({
                                title: "Nouveau patient",
                                content: (
                                    <PatientForm
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
                        label="Patient"
                        sortBy="lastname"
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Médecin"
                        sortBy="doctor.fullname"
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Assurance"
                        sortBy="assurance.company"
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th
                        label="Statut"
                        sortBy="lastMissionEndAt"
                        sortValue={sortValue}
                        sortDirection={sortDirection}
                        handleSort={handleSort}
                    />
                    <Table.Th label="" style={{ width: 10 }} />
                </Table.Thead>
                <Table.Tbody>
                    {!isLoading &&
                        data["hydra:member"].map((data) => (
                            <Table.Tr
                                key={data.id}
                                onClick={() =>
                                    navigate(API_PATIENTS + "/" + data.id, {
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
                                    label="Patient"
                                    text={data.lastname + " " + data.firstname}
                                />
                                <Table.Td
                                    label="Médecin"
                                    text={
                                        data.doctor ? data.doctor.fullname : ""
                                    }
                                />
                                <Table.Td
                                    label="Assurance"
                                    text={
                                        data.assurance
                                            ? data.assurance.company
                                            : ""
                                    }
                                />
                                <Table.Td label="Statut">
                                    <div className="flex flex-wrap items-center gap-3 text-black">
                                        {data.lastMissionEndAt &&
                                        dayjs(data.lastMissionEndAt) >
                                            dayjs() ? (
                                            <>
                                                <div className="h-5 w-5 rounded-full bg-info"></div>
                                                <div>Situation en cours</div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="h-5 w-5 rounded-full bg-neutral"></div>
                                                <div>Aucune situation</div>
                                            </>
                                        )}
                                    </div>
                                </Table.Td>
                                <Table.Td label="" text="">
                                    <Dropdown type="table">
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    API_PATIENTS +
                                                        "/" +
                                                        data.id,
                                                    {
                                                        state: {
                                                            page: page,
                                                            sortDirection:
                                                                sortDirection,
                                                            sortValue:
                                                                sortValue,
                                                            searchValue:
                                                                searchValue,
                                                        },
                                                    }
                                                )
                                            }
                                        >
                                            <HiChevronRight size={20} />
                                            Voir la fiche patient
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleOpenModal({
                                                    title: "Édition du patient",
                                                    content: (
                                                        <PatientForm
                                                            iri={data["@id"]}
                                                        />
                                                    ),
                                                })
                                            }
                                        >
                                            <HiDotsCircleHorizontal size={20} />
                                            Éditer le patient
                                        </button>
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

export default PatientsPage;
