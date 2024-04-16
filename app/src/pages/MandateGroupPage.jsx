import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { AiOutlineFolderOpen } from "react-icons/ai";
import {
    HiCheckCircle,
    HiDotsCircleHorizontal,
    HiOutlinePaperClip,
    HiOutlineRefresh,
} from "react-icons/hi";
import { MdArrowBack, MdContentCopy, MdEventNote } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import uuid from "react-uuid";
import Loader from "../components/Loader";
import Button from "../components/buttons/Button";
import Dropdown from "../components/dropdown/Dropdown";
import MissionDocument from "../components/mission_document/MissionDocument";
import DocumentForm from "../forms/DocumentForm";
import MandateAcceptForm from "../forms/MandateAcceptForm";
import MandateAgentForm from "../forms/MandateAgentForm";
import MandateEditForm from "../forms/MandateEditForm";
import { useModal } from "../hooks/useModal";
import PageTitle from "../layouts/PageTitle";
import { useGetIRI as useMandate } from "../queryHooks/useMandate";
import { useGetOneData as useMandateGroup } from "../queryHooks/useMandateGroup";
import { mandateCategoriesUsersRoles } from "../utils/arrays";
import { mandateStatus } from "../utils/translations";

const MandateGroupPage = () => {
    const navigate = useNavigate();
    const { state: previousPageState } = useLocation();
    const { id } = useParams();
    const { data, isLoading, isSuccess } = useMandateGroup(id);
    const { Modal, handleOpenModal, handleCloseModal } = useModal();

    const queryClient = useQueryClient();
    const account = queryClient.getQueryData(["account"]);

    const [isMine, setIsMine] = useState(false);

    useEffect(() => {
        if (data) {
            if (account.id === data.user.id) setIsMine(true);
        }
    }, [data]);

    if (isLoading) return <Loader />;
    else
        return (
            <>
                <Modal />
                <PageTitle
                    title={
                        "Mandat " +
                        data.patient.lastname +
                        " " +
                        data.patient.firstname
                    }
                    icon={<MdEventNote size={40} />}
                    mainButton={
                        _.isEmpty(previousPageState) ? (
                            <Button onClick={() => navigate(-1)}>
                                <MdArrowBack />
                            </Button>
                        ) : (
                            <Button
                                onClick={() =>
                                    navigate("/groupmandates", {
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
                                                    mandateGroupID={data.id}
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
                    <div className="col-span-8 card-shadow">
                        <div className="card-title">
                            <MdContentCopy size={30} />
                            Informations
                        </div>
                        <div>
                            <div className="subcard-title">
                                {data.patient.gender === "homme"
                                    ? "Patient "
                                    : "Patiente"}
                            </div>
                            <p>
                                {data.patient.gender === "homme"
                                    ? "Mr "
                                    : "Mme "}{" "}
                                {data.patient.lastname}
                            </p>
                            <p>
                                {data.patient.gender === "homme"
                                    ? "Né le : "
                                    : "Née le : "}
                                {dayjs(data.patient.birthdate).format(
                                    "DD/MM/YYYY"
                                ) + " "}
                                ({dayjs().diff(data.patient.birthdate, "years")}{" "}
                                ans)
                            </p>
                            <p>AVS : {data.patient.avsNumber}</p>
                        </div>
                    </div>

                    <div className="col-span-4 card-shadow">
                        <div className="card-title">
                            <AiOutlineFolderOpen size={30} />
                            Documents
                        </div>
                        {data.documents.length === 0 && "Aucun document"}
                        {data.documents.map((document) => (
                            <MissionDocument
                                key={document["@id"]}
                                iri={document["@id"]}
                                isMine={isMine}
                            />
                        ))}
                    </div>

                    {data.mandates?.map((mandate) => (
                        <Mandate
                            key={uuid()}
                            iri={mandate["@id"]}
                            isMine={isMine}
                        />
                    ))}
                </div>
            </>
        );
};

export default MandateGroupPage;

const Mandate = ({ iri, isMine }) => {
    const { data, isLoading, isSuccess } = useMandate(iri);
    console.log("data", data);
    const queryClient = useQueryClient();
    const account = queryClient.getQueryData(["account"]);

    const { Modal, handleOpenModal, handleCloseModal } = useModal();

    if (isLoading) return <Loader />;
    return (
        <div className="col-span-8 card-shadow relative">
            <Dropdown type="card">
                {account.roles.includes("ROLE_NURSE") &&
                    data.status === "attribué" && (
                        <button
                            onClick={() =>
                                handleOpenModal({
                                    title: "Accepter le mandat",
                                    content: (
                                        <MandateAcceptForm
                                            iri={data["@id"]}
                                            handleCloseModal={handleCloseModal}
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
                                            handleCloseModal={handleCloseModal}
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
                                            handleCloseModal={handleCloseModal}
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
                                            handleCloseModal={handleCloseModal}
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
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Modal />
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-8 flex flex-col gap-3">
                            <div className="card-title">
                                {mandateCategoriesUsersRoles[data.category]}
                            </div>
                            <div>
                                <div className="subcard-title">Description</div>
                                <div className="whitespace-pre-line">
                                    {data.description}
                                </div>
                            </div>
                            <div>
                                <div className="subcard-title mb-1">
                                    Intervenant
                                </div>
                                <div className="flex md:flex-row flex-col md:gap-5 md:items-center">
                                    <div className="badge badge-neutral">
                                        {data.mandateUser
                                            ? data.mandateUser.firstname +
                                              " " +
                                              data.mandateUser.lastname
                                            : "non attribué"}
                                    </div>
                                    {data.mandateUser && (
                                        <>
                                            <div>
                                                Tél :{" "}
                                                {data.mandateUser.mobile
                                                    ? data.mandateUser.mobile
                                                    : data.mandateUser.phone}
                                            </div>
                                            <div>
                                                Email : {data.mandateUser.email}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-4 place-self-start w-full flex flex-col gap-5">
                            <div className="subcard-shadow">
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

                            <div className="subcard-shadow ">
                                <div className="card-title">
                                    <AiOutlineFolderOpen size={30} />
                                    Documents
                                </div>
                                {data.documents.length === 0 && (
                                    <div className="subcard-title">
                                        Aucun document
                                    </div>
                                )}
                                {data.documents.map((document) => (
                                    <MissionDocument
                                        key={document["@id"]}
                                        iri={document["@id"]}
                                        isMine={isMine}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
