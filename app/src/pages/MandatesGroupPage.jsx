import React, { useEffect, useState } from "react";
import { MdEventNote } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import AddButton from "../components/buttons/AddButton";
import Dropdown from "../components/dropdown/Dropdown";
import Loader from "../components/Loader";
import NoData from "../components/no_data/NoData";
import Pagination from "../components/pagination/Pagination";
import * as Table from "../components/table/Table";
import MandateAgentForm from "../forms/MandateAgentForm";
import MandateGroupForm from "../forms/MandateGroupForm";
import { useFilterMandates } from "../hooks/useFilterMandates";
import { useModal } from "../hooks/useModal";
import { useSearch } from "../hooks/useSearch";
import { useSortBy } from "../hooks/useSortBy";
import PageTitle from "../layouts/PageTitle";
import { useGetCurrentAccount } from "../queryHooks/useAccount";
import {
    useDeleteIRI,
    useGetPaginatedDatas,
    usePutData,
} from "../queryHooks/useMandateGroup";
import { mandateCategoriesUsersRoles } from "../utils/arrays";

const MandatesGroupPage = () => {
    const { state: initialPageState } = useLocation();
    const navigate = useNavigate();
    const { Modal, handleOpenModal, handleCloseModal } = useModal();
    const { searchValue, searchbar } = useSearch(
        initialPageState ? initialPageState.searchValue : ""
    );
    const { filters, filter } = useFilterMandates();
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
        searchValue,
        filters
    );

    const { data: account, isLoading: isLoadingAccount } =
        useGetCurrentAccount();
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
        // eslint-disable-next-line
    }, [searchValue, sortValue]);

    if (isLoading || isLoadingAccount) return <Loader />;
    return (
        <>
            <Modal />
            <PageTitle
                title={"Liste des mandats"}
                subtitle={data["hydra:totalItems"]}
                icon={<MdEventNote size={40} />}
                mainButton={
                    account &&
                    account.roles.includes("ROLE_DOCTOR") && (
                        <AddButton
                            onClick={() =>
                                handleOpenModal({
                                    title: "Nouveau mandat",
                                    content: (
                                        <MandateGroupForm
                                            handleCloseModal={handleCloseModal}
                                        />
                                    ),
                                })
                            }
                        />
                    )
                }
            >
                {searchbar}
                {filter}
            </PageTitle>

            {data["hydra:totalItems"] === 0 ? (
                <NoData />
            ) : (
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
                            sortBy="patient.lastname"
                            sortValue={sortValue}
                            sortDirection={sortDirection}
                            handleSort={handleSort}
                        />
                        {!account.roles.includes("ROLE_DOCTOR") && (
                            <Table.Th
                                label="Mandant"
                                sortBy="doctor.fullname"
                                sortValue={sortValue}
                                sortDirection={sortDirection}
                                handleSort={handleSort}
                            />
                        )}
                        {!account.roles.includes("ROLE_NURSE") ||
                            (!account.roles.includes("ROLE_PHYSIO") && (
                                <Table.Th
                                    label="Mandataire"
                                    sortBy="doctor.fullname"
                                    sortValue={sortValue}
                                    sortDirection={sortDirection}
                                    handleSort={handleSort}
                                />
                            ))}
                        <Table.Th
                            label="Prestations"
                            sortBy="doctor.fullname"
                            sortValue={sortValue}
                            sortDirection={sortDirection}
                            handleSort={handleSort}
                        />
                        {/* 
                        <Table.Th
                            label="Créé le"
                            sortBy='doctor.fullname'
                            sortValue={sortValue}
                            sortDirection={sortDirection}
                            handleSort={handleSort}
                        />
                        <Table.Th
                            label="Statut"
                            sortBy='status'
                            sortValue={sortValue}
                            sortDirection={sortDirection}
                            handleSort={handleSort}
                        /> */}
                        <Table.Th label="" style={{ width: 10 }} />
                    </Table.Thead>
                    <Table.Tbody>
                        {!isLoading &&
                            data["hydra:member"].map((data) => (
                                <Table.Tr
                                    key={data.id}
                                    onClick={() => {
                                        navigate("/groupmandates/" + data.id, {
                                            state: {
                                                page: page,
                                                sortDirection: sortDirection,
                                                sortValue: sortValue,
                                                searchValue: searchValue,
                                            },
                                        });
                                    }}
                                >
                                    <Table.Td text={data.id} />
                                    <Table.Td
                                        label="Patient"
                                        text={
                                            data.patient.firstname +
                                            " " +
                                            data.patient.lastname
                                        }
                                    />
                                    {!account.roles.includes("ROLE_DOCTOR") && (
                                        <Table.Td
                                            label="Mandant"
                                            text={
                                                data.user.lastname +
                                                " " +
                                                data.user.firstname
                                            }
                                        />
                                    )}
                                    {!account.roles.includes("ROLE_NURSE") ||
                                        (!account.roles.includes(
                                            "ROLE_PHYSIO"
                                        ) && (
                                            <Table.Td
                                                label="Mandataire"
                                                text={
                                                    data.mandateUser
                                                        ? data.mandateUser
                                                              .lastname +
                                                          " " +
                                                          data.mandateUser
                                                              .firstname
                                                        : "..."
                                                }
                                            />
                                        ))}
                                    {/* <Table.Td label="Prestations" text={mandateCategoriesUsersRoles[data.category]} />
                                <Table.Td label="Créé le" text={dayjs(data.createdAt).format('L')} />
                                <Table.Td label="Statut">
                                    {account.roles.includes('ROLE_DOCTOR') && mandateStatus["doctor"][data.status]}
                                    {account.roles.includes('ROLE_NURSE') && mandateStatus["nurse"][data.status]}
                                    {account.roles.includes('ROLE_PHYSIO') && mandateStatus["nurse"][data.status]}
                                    {account.roles.includes('ROLE_COORDINATOR') && mandateStatus["coordinator"][data.status]}
                                </Table.Td> */}
                                    <Table.Td label="" text="">
                                        {data.mandates.map((mandate) => (
                                            <div key={uuid()} className="mr-3">
                                                {
                                                    mandateCategoriesUsersRoles[
                                                        mandate.category
                                                    ]
                                                }
                                            </div>
                                        ))}
                                        {/* {account.roles.includes('ROLE_DOCTOR') &&
                                        <Dropdown type='table'>
                                            {data.status === "édité" &&
                                                <button onClick={() => handleOpenModal({ title: 'Édition du mandat', content: <MandateEditForm iri={data['@id']} handleCloseModal={handleCloseModal} /> })}>
                                                    <HiDotsCircleHorizontal size={20} />
                                                    Éditer le mandat
                                                </button>
                                            }
                                            {data.status !== "annulé" &&
                                                <button onClick={() => handleOpenModal({ title: 'Édition du mandat', content: <MandateEditForm iri={data['@id']} handleCloseModal={handleCloseModal} /> })}>
                                                    <AiOutlineFolderOpen size={20} />
                                                    Ajouter un document
                                                </button>
                                            }
                                            {(data.status !== "édité" && data.mission.length !== 0) &&
                                                <button onClick={() => handleChangeStatus({ id: data.id, status: 'annulé' })}>
                                                    <TiDelete size={20}/>
                                                    Annuler le mandat
                                                </button>
                                            }
                                            {data.status === "édité" &&
                                                <button onClick={() => handleOpenModal({ title: 'Supprimer le mandat', size: "small", content: <MandateDelete iri={data['@id']} handleCloseModal={handleCloseModal} /> })}>
                                                    <TiDelete size={20}/>
                                                    Supprimer le mandat
                                                </button>
                                            }
                                        </Dropdown>
                                    } */}

                                        {account.roles.includes(
                                            "ROLE_COORDINATOR"
                                        ) &&
                                            data.status === "édité" && (
                                                <Dropdown type="table">
                                                    <button
                                                        onClick={() =>
                                                            handleOpenModal({
                                                                title: "Choix du mandataire",
                                                                content: (
                                                                    <MandateAgentForm
                                                                        iri={
                                                                            data[
                                                                                "@id"
                                                                            ]
                                                                        }
                                                                        handleCloseModal={
                                                                            handleCloseModal
                                                                        }
                                                                    />
                                                                ),
                                                            })
                                                        }
                                                    >
                                                        Choisir le mandataire
                                                    </button>
                                                </Dropdown>
                                            )}
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                    </Table.Tbody>
                </Table.Table>
            )}

            <Pagination
                totalItems={data["hydra:totalItems"]}
                page={page}
                setPage={setPage}
            />
        </>
    );
};

export default MandatesGroupPage;

const MandateDelete = ({ iri, handleCloseModal }) => {
    const { mutate, isLoading, isSuccess } = useDeleteIRI();

    useEffect(() => {
        if (isSuccess) handleCloseModal();
    }, [isSuccess]);

    return (
        <div className="p-8">
            <p>
                Attention cette opération est irréversible, voulez-vous
                confirmer la suppression ?
            </p>
            <div className="flex items-center gap-5 justify-center p-5">
                <button
                    className="btn btn-outline"
                    onClick={() => handleCloseModal()}
                >
                    Annuler
                </button>
                <button
                    className="btn btn-error text-white"
                    onClick={() => mutate(iri)}
                >
                    Confirmer
                </button>
            </div>
        </div>
    );
};
