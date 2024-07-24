import dayjs from "dayjs";
import _ from "lodash";
import React, { useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import {
    MdArrowBack,
    MdOutlineHealthAndSafety,
    MdPendingActions,
} from "react-icons/md";
import { RiStethoscopeFill } from "react-icons/ri";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Button from "../components/buttons/Button";
import Dropdown from "../components/dropdown/Dropdown";
import OpasCard from "../components/opas/OpasCard";
import PatientForm from "../forms/PatientForm";
import { useModal } from "../hooks/useModal";
import PageTitle from "../layouts/PageTitle";
import { useGetIRI as Assurance } from "../queryHooks/useAssurance";
import { useGetIRI as Doctor } from "../queryHooks/useDoctor";
import { useGetIRI as getMission } from "../queryHooks/useMission";
import { useGetOneData } from "../queryHooks/usePatient";

const PatientPage = () => {
    const navigate = useNavigate();
    const { state: previousPageState } = useLocation();
    const { id } = useParams();
    const { data } = useGetOneData(id);
    const { Modal, handleOpenModal, handleCloseModal } = useModal();
    const [tab, setTab] = useState("infos");

    const DoctorCard = ({ iri }) => {
        const { data, isLoading } = Doctor(iri ? iri : null);

        if (isLoading) return <Loader />;
        if (!data) return null;
        else
            return (
                <div>
                    <div>{data.fullname}</div>
                    <div className="text-sm">{data.category}</div>
                    {data.phone && <div>Tél : {data.phone}</div>}
                    {data.organization && (
                        <div>Organisation : {data.organization}</div>
                    )}
                    {data.email && <div>Email : {data.email}</div>}
                </div>
            );
    };

    const AssuranceCard = ({ iri }) => {
        const { data, isLoading } = Assurance(iri ? iri : null);

        if (isLoading) return <Loader />;
        if (!data) return null;
        else
            return (
                <div>
                    <div>{data.company}</div>
                    <div className="text-sm">{data.type}</div>
                    {data.email && <div>Email : {data.email}</div>}
                    {data.phone && <div>Tél : {data.phone}</div>}
                </div>
            );
    };

    const PatientInfos = () => {
        return (
            <>
                <div className="grid md:grid-cols-12 gap-5">
                    <div className="md:col-span-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 card-shadow">
                            <div className="card-title md:col-span-2">
                                <IoPersonCircleOutline size={36} />
                                Infos Patient
                            </div>
                            <div className="subcard-shadow">
                                <div className="subcard-title">Coordonnées</div>
                                <div>
                                    <div>Adresse : {data.address1}</div>
                                    {data.address2 && (
                                        <div>
                                            Adresse complément : {data.address2}
                                        </div>
                                    )}
                                    <div>NPA : {data.npa}</div>
                                    <div>Canton : {data.canton}</div>
                                    <div>Ville : {data.city}</div>
                                    {data.phone && (
                                        <div>Téléphone : {data.phone}</div>
                                    )}
                                    {data.mobile && (
                                        <div>Mobile : {data.mobile}</div>
                                    )}
                                    {data.email && (
                                        <div>Email : {data.email}</div>
                                    )}
                                </div>
                            </div>
                            <div className="subcard-shadow">
                                <div className="subcard-title">
                                    Infos assuré
                                </div>
                                <div>
                                    <div>
                                        Date de naissance :{" "}
                                        {data.birthdate
                                            ? dayjs(data.birthdate).format("L")
                                            : "non renseignée"}
                                    </div>
                                    <div>
                                        Age :{" "}
                                        {dayjs().diff(data.birthdate, "years")}{" "}
                                        ans
                                    </div>
                                    <div>
                                        Numéro d'assuré : {data.assuranceNumber}
                                    </div>
                                    <div>Numéro AVS : {data.avsNumber}</div>
                                </div>
                            </div>
                            {data.furtherInfos && (
                                <div className="subcard-shadow col-span-2">
                                    <div className="subcard-title">
                                        Informations complémentaires
                                    </div>
                                    <div className="whitespace-pre-line">
                                        {data.furtherInfos}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:col-span-4 flex flex-col gap-5">
                        <div className="card-shadow">
                            <div className="card-title">
                                <RiStethoscopeFill size={36} />
                                Médecin
                            </div>
                            {data && data.doctor && (
                                <DoctorCard iri={data.doctor} />
                            )}
                        </div>
                        <div className="card-shadow">
                            <div className="card-title">
                                <MdOutlineHealthAndSafety size={36} />
                                Assurance
                            </div>
                            {data && data.assurance && (
                                <AssuranceCard iri={data.assurance} />
                            )}
                        </div>
                    </div>
                    {data.missions.lenght !== 0 && (
                        <div className="md:col-span-8 card-shadow">
                            <div className="card-title">
                                <MdPendingActions size={36} />
                                Historique
                            </div>
                            {data.missions.map((mission) => (
                                <Mission iri={mission["@id"]} />
                            ))}
                        </div>
                    )}
                </div>
            </>
        );
    };

    const PatientStats = () => {
        return <h1>En cours de développement</h1>;
    };

    const PatientInvoices = () => {
        return <h1>En cours de développement</h1>;
    };

    if (!data) return <Loader />;
    else
        return (
            <>
                <Modal />
                <PageTitle
                    title={
                        data.gender === "homme"
                            ? "Mr "
                            : "Mme " + data.firstname + " " + data.lastname
                    }
                    icon={<MdPendingActions size={40} />}
                    mainButton={
                        _.isEmpty(previousPageState) ? (
                            <Button onClick={() => navigate(-1)}>
                                <MdArrowBack />
                            </Button>
                        ) : (
                            <Button
                                onClick={() =>
                                    navigate("/patients", {
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
                        <button
                            onClick={() =>
                                handleOpenModal({
                                    title: "Edition patient",
                                    content: (
                                        <PatientForm
                                            iri={data["@id"]}
                                            handleCloseModal={handleCloseModal}
                                        />
                                    ),
                                })
                            }
                        >
                            <IoPersonCircleOutline size={20} />
                            Modifier le patient
                        </button>
                        <button
                            onClick={() =>
                                handleOpenModal({
                                    title: "Médecin Traitant",
                                    content: (
                                        <PatientForm
                                            iri={data["@id"]}
                                            action="doctorIRI"
                                            handleCloseModal={handleCloseModal}
                                        />
                                    ),
                                })
                            }
                        >
                            <RiStethoscopeFill size={20} />
                            Modifier le médecin
                        </button>
                        <button
                            onClick={() =>
                                handleOpenModal({
                                    title: "Assurance",
                                    content: (
                                        <PatientForm
                                            iri={data["@id"]}
                                            action="assuranceIRI"
                                            handleCloseModal={handleCloseModal}
                                        />
                                    ),
                                })
                            }
                        >
                            <MdOutlineHealthAndSafety size={20} />
                            Modifier l'assurance
                        </button>
                    </Dropdown>
                </PageTitle>

                <div className="px-5 pb-5 md:px-0 md:pb-0">
                    <div className="bg-slate-200 flex border rounded-lg mb-5">
                        <div
                            className={`grow md:grow-0 md:px-8 py-3 text-center ${
                                tab === "infos"
                                    ? "bg-action text-white rounded-lg"
                                    : "cursor-pointer"
                            }`}
                            onClick={() => setTab("infos")}
                        >
                            Informations
                        </div>
                        <div
                            className={`grow md:grow-0 md:px-8 py-3 text-center ${
                                tab === "stats"
                                    ? "bg-action text-white rounded-lg"
                                    : "cursor-pointer"
                            }`}
                            onClick={() => setTab("stats")}
                        >
                            Documents
                        </div>
                        <div
                            className={`grow md:grow-0 md:px-8 py-3 text-center ${
                                tab === "invoices"
                                    ? "bg-action text-white rounded-lg"
                                    : "cursor-pointer"
                            }`}
                            onClick={() => setTab("invoices")}
                        >
                            Facturation
                        </div>
                    </div>

                    {tab === "infos" && <PatientInfos />}
                    {tab === "stats" && <PatientStats />}
                    {tab === "invoices" && <PatientInvoices />}
                </div>
            </>
        );
};

export default PatientPage;

const Mission = ({ iri }) => {
    const { data, isLoading } = getMission(iri);
    if (isLoading) return <Loader />;
    return (
        <div className="subcard-shadow">
            <div className="flex flex-row justify-between items-center">
                Mission {data.id} - du {dayjs(data.beginAt).format("L")} au{" "}
                {dayjs(data.endAt).format("L")}
                {data.opas && (
                    <OpasCard
                        iri={data.opas || false}
                        missionIRI={data["@id"]}
                        isMine={false}
                    />
                )}
            </div>
            <div className="subcard-title">Synthèse de la mission</div>
            <div className="whitespace-pre-line">{data.description}</div>
        </div>
    );
};
