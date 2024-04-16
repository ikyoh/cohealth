import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaCircle } from "react-icons/fa";
import OpasForm from "../../forms/OpasForm";
import { useModal } from "../../hooks/useModal";
import { useGetIRI, usePutData } from "../../queryHooks/usePrescription";
import Dropdown from "../dropdown/Dropdown";
import OpasPDF from "./OpasPDF";

import {
    HiEye,
    HiOutlineClipboardCheck,
    HiOutlineClipboardList,
} from "react-icons/hi";
import OpasDoctorValidationForm from "../../forms/OpasDoctorValidationForm";
import OpasStatus from "./OpasStatus";

const OpasCard = ({ iri, missionIRI, isMine = false }) => {
    const queryClient = useQueryClient();
    const account = queryClient.getQueryData(["account"]);

    const { data } = useGetIRI(iri);

    const { mutate: putData } = usePutData(iri);
    const { Modal, handleOpenModal, handleCloseModal } = useModal();

    const handleUpdateOpasStatus = (status) => {
        putData({ ...data, status: status });
    };

    if (account.roles.includes("ROLE_DOCTOR") && !data) return null;

    return (
        <>
            <Modal />
            <div className="bg-white rounded-full relative flex items-center gap-3 pl-3">
                OPAS
                {account.roles.includes("ROLE_DOCTOR") &&
                data.status === "envoyé au médecin" ? (
                    " à valider"
                ) : (
                    <OpasStatus opas={data} />
                )}
                <Dropdown type="opas">
                    {isMine && !data && (
                        <button
                            onClick={() =>
                                handleOpenModal({
                                    size: "full",
                                    title: "Nouveau OPAS",
                                    content: (
                                        <OpasForm
                                            missionIRI={missionIRI}
                                            handleCloseModal={handleCloseModal}
                                        />
                                    ),
                                })
                            }
                        >
                            <HiOutlineClipboardList size={20} />
                            Créer un OPAS
                        </button>
                    )}
                    {isMine && data && data.status === "brouillon" && (
                        <button
                            onClick={() =>
                                handleOpenModal({
                                    size: "full",
                                    title: "Edition de l'OPAS",
                                    content: (
                                        <OpasForm
                                            iri={iri}
                                            missionIRI={missionIRI}
                                            handleCloseModal={handleCloseModal}
                                        />
                                    ),
                                })
                            }
                        >
                            <HiOutlineClipboardList size={20} />
                            Éditer l'OPAS
                        </button>
                    )}
                    {data && (
                        <>
                            <button
                                onClick={() =>
                                    handleOpenModal({
                                        size: "full",
                                        title: "OPAS",
                                        content: (
                                            <OpasPDF
                                                missionIRI={missionIRI || false}
                                                isOnePage={true}
                                                isPDFViewer={true}
                                                isPDFDownload={false}
                                                handleCloseModal={
                                                    handleCloseModal
                                                }
                                            />
                                        ),
                                    })
                                }
                            >
                                <HiEye size={20} />
                                OPAS
                            </button>
                            {account.roles.includes("ROLE_NURSE") && (
                                <button
                                    onClick={() =>
                                        handleOpenModal({
                                            size: "full",
                                            title: "OPAS",
                                            content: (
                                                <OpasPDF
                                                    missionIRI={
                                                        missionIRI || false
                                                    }
                                                    isOnePage={false}
                                                    isPDFViewer={true}
                                                    isPDFDownload={false}
                                                    handleCloseModal={
                                                        handleCloseModal
                                                    }
                                                />
                                            ),
                                        })
                                    }
                                >
                                    <HiEye size={20} />
                                    OPAS Détaillé
                                </button>
                            )}

                            {/* <OpasPDF missionIRI={missionIRI || false} isOnePage={false} isPDFViewer={false} isPDFDownload={true} /> */}

                            {account.roles.includes("ROLE_DOCTOR") &&
                                data.status === "envoyé au médecin" && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleOpenModal({
                                                title: "OPAS",
                                                size: "small",
                                                content: (
                                                    <OpasDoctorValidationForm
                                                        iri={data["@id"]}
                                                        handleCloseModal={
                                                            handleCloseModal
                                                        }
                                                    />
                                                ),
                                            })
                                        }
                                    >
                                        <HiOutlineClipboardCheck size={20} />{" "}
                                        Valider
                                    </button>
                                )}
                            {isMine && (
                                <>
                                    <p>Status de l'OPAS</p>
                                    <button
                                        onClick={() =>
                                            handleUpdateOpasStatus("brouillon")
                                        }
                                    >
                                        <FaCircle className="mr-1 text-waiting" />
                                        Brouillon
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleUpdateOpasStatus(
                                                "envoyé au médecin"
                                            )
                                        }
                                    >
                                        <FaCircle className="mr-1 text-mention" />
                                        Envoyé au médecin
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleUpdateOpasStatus(
                                                "validé par le médecin"
                                            )
                                        }
                                    >
                                        <FaCircle className="mr-1 text-info" />
                                        Validé par le médecin
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleUpdateOpasStatus(
                                                "envoyé à l'assurance"
                                            )
                                        }
                                    >
                                        <FaCircle className="mr-1 text-success" />
                                        Envoyé à l'assurance
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleUpdateOpasStatus("contesté")
                                        }
                                    >
                                        <FaCircle className="mr-1 text-black" />
                                        Contesté par l'assurance
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </Dropdown>
            </div>
        </>
    );
};

export default OpasCard;
