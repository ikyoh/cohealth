import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { MdArrowBack, MdContentCopy, MdEventNote } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Button from "../components/buttons/Button";
import Dropdown from "../components/dropdown/Dropdown";
import DocumentForm from "../forms/DocumentForm";
import MandateAcceptForm from "../forms/MandateAcceptForm";
import MandateAgentForm from "../forms/MandateAgentForm";
import MandateEditForm from "../forms/MandateEditForm";
import { useModal } from "../hooks/useModal";
import PageTitle from "../layouts/PageTitle";
import { useGetOneData as useMandate } from "../queryHooks/useMandate";
import { useGetIRI as useMandateGroup } from "../queryHooks/useMandateGroup";
import { mandateCategoriesUsersRoles } from "../utils/arrays";
import { mandateStatus } from "../utils/translations";

import { AiOutlineFolderOpen } from "react-icons/ai";
import {
    HiCheckCircle,
    HiDotsCircleHorizontal,
    HiOutlinePaperClip,
    HiOutlineRefresh,
} from "react-icons/hi";
import uuid from "react-uuid";

const PatientPage = () => {
    const navigate = useNavigate();
    const { state: previousPageState } = useLocation();
    const { id } = useParams();
    const { data, isLoading } = useMandate(id);
    const { data: mandateGroup, isLoading: isLoadingGroup } = useMandateGroup(
        data && data.mandateGroup ? data.mandateGroup : null
    );
    const { Modal, handleOpenModal, handleCloseModal } = useModal();

    const queryClient = useQueryClient();
    const account = queryClient.getQueryData(["account"]);

    //const [isMine, setIsMine] = useState(false);

    // useEffect(() => {
    //     if (data) {
    //         if (account.id === data.user.id) setIsMine(true);
    //     }
    // }, [data]);

    if (isLoading || isLoadingGroup) return <Loader />;
    else
        return (
            <>
                <Modal />
                <PageTitle
                    title="Mandat"
                    icon={<MdEventNote size={40} />}
                    mainButton={
                        _.isEmpty(previousPageState) ? (
                            <Button onClick={() => navigate(-1)}>
                                <MdArrowBack />
                            </Button>
                        ) : (
                            <Button
                                onClick={() =>
                                    navigate("/mandates", {
                                        state: previousPageState,
                                    })
                                }
                            >
                                <MdArrowBack />
                            </Button>
                        )
                    }
                >
                    <Dropdown type="button">
                        {account.roles.includes("ROLE_NURSE") &&
                            data.status === "attribué" && (
                                <button
                                    onClick={() =>
                                        handleOpenModal({
                                            title: "Accepter le mandat",
                                            content: (
                                                <MandateAcceptForm
                                                    iri={data["@id"]}
                                                    handleCloseModal={
                                                        handleCloseModal
                                                    }
                                                />
                                            ),
                                        })
                                    }
                                >
                                    <HiCheckCircle size={20} />
                                    Accepter le mandat
                                </button>
                            )}

                        {account.roles.includes("ROLE_COORDINATOR") &&
                            data.status === "édité" && (
                                <button
                                    onClick={() =>
                                        handleOpenModal({
                                            title: "Choix du mandataire",
                                            content: (
                                                <MandateAgentForm
                                                    iri={data["@id"]}
                                                    handleCloseModal={
                                                        handleCloseModal
                                                    }
                                                />
                                            ),
                                        })
                                    }
                                >
                                    <HiOutlineRefresh size={20} />
                                    Choisir le mandataire
                                </button>
                            )}
                        {(account.roles.includes("ROLE_DOCTOR") ||
                            (account.roles.includes("ROLE_COORDINATOR") &&
                                data.status === "édité")) && (
                            <>
                                <button
                                    onClick={() =>
                                        handleOpenModal({
                                            title: "Édition du mandat",
                                            content: (
                                                <MandateEditForm
                                                    iri={data["@id"]}
                                                    handleCloseModal={
                                                        handleCloseModal
                                                    }
                                                />
                                            ),
                                        })
                                    }
                                >
                                    <HiDotsCircleHorizontal size={20} />
                                    Éditer le mandat
                                </button>
                                <button
                                    onClick={() =>
                                        handleOpenModal({
                                            title: "Nouveau document",
                                            content: (
                                                <DocumentForm
                                                    event={false}
                                                    mandateID={data.id}
                                                    handleCloseModal={
                                                        handleCloseModal
                                                    }
                                                />
                                            ),
                                        })
                                    }
                                >
                                    <AiOutlineFolderOpen size={20} />
                                    Ajouter un document
                                </button>
                            </>
                        )}
                    </Dropdown>
                </PageTitle>

                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-8 row-span-3 card-shadow">
                        <div className="card-title">
                            <MdContentCopy size={30} />
                            Détails
                        </div>

                        <div className="subcard-shadow">
                            <div className="subcard-title">
                                {mandateGroup.patient.gender === "homme"
                                    ? "Patient "
                                    : "Patiente"}
                            </div>
                            <div className="whitespace-pre-line">
                                <p>
                                    {mandateGroup.patient.gender === "homme"
                                        ? "Mr "
                                        : "Mme "}{" "}
                                    {mandateGroup.patient.lastname}
                                </p>
                                <p>
                                    {mandateGroup.patient.gender === "homme"
                                        ? "Né le : "
                                        : "Née le : "}
                                    {dayjs(
                                        mandateGroup.patient.birthdate
                                    ).format("DD/MM/YYYY") + " "}
                                    (
                                    {dayjs().diff(
                                        mandateGroup.patient.birthdate,
                                        "years"
                                    )}{" "}
                                    ans)
                                </p>
                                <p>AVS : {mandateGroup.patient.avsNumber}</p>
                            </div>
                        </div>

                        <div className="subcard-shadow">
                            <div className="subcard-title">
                                Date de prise en charge
                            </div>
                            <div className="whitespace-pre-line">
                                {dayjs(data.beginAt).format("DD/MM/YYYY")}
                            </div>
                        </div>

                        <div className="subcard-shadow">
                            <div className="subcard-title">Motif du mandat</div>
                            <div className="whitespace-pre-line">
                                {data.description}
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4 card-shadow">
                        <div className="card-title">
                            <HiOutlinePaperClip size={30} />
                            Statut
                        </div>
                        {account.roles.includes("ROLE_DOCTOR") &&
                            mandateStatus["doctor"][data.status]}
                        {account.roles.includes("ROLE_NURSE") &&
                            mandateStatus["nurse"][data.status]}
                        {account.roles.includes("ROLE_COORDINATOR") &&
                            mandateStatus["coordinator"][data.status]}
                    </div>

                    <div className="col-span-4 card-shadow">
                        <div className="card-title">
                            <HiOutlinePaperClip size={30} />
                            Mandats associés
                        </div>
                        {mandateGroup.mandates
                            .filter((f) => f["@id"] !== data["@id"])
                            .map((mandate) => (
                                <div className="subcard-shadow" key={uuid()}>
                                    {
                                        mandateCategoriesUsersRoles[
                                            mandate.category
                                        ]
                                    }
                                </div>
                            ))}
                    </div>

                    <div className="col-span-4 card-shadow">
                        <div className="card-title">
                            <AiOutlineFolderOpen size={30} />
                            Documents
                        </div>
                        {/* 
                        {data.documents.length === 0 && "Aucun document"}
                        {data.documents.map(document =>
                            <MissionDocument key={document["@id"]} iri={document["@id"]} isMine={isMine} />
                        )} */}
                    </div>
                </div>

                {/* {mandateGroup.mandates.map((iri) => (
                    <OtherMandate iri={iri} />
                ))} */}

                <div className="col-span-4 card-shadow">
                    <div className="card-title">
                        <AiOutlineFolderOpen size={30} />
                        Documents
                    </div>
                </div>
            </>
        );
};

export default PatientPage;
