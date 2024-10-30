import React, { useState } from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import { BsFileEarmarkRuled } from "react-icons/bs";
import { FaHandshake } from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";
import { HiLogout } from "react-icons/hi";
import {
    IoCloseSharp,
    IoMenuSharp,
    IoPeople,
    IoPersonCircleOutline,
} from "react-icons/io5";
import {
    MdDashboard,
    MdEventNote,
    MdOutlineHealthAndSafety,
    MdOutlineSettings,
    MdPendingActions,
    MdSchedule,
    MdSupervisedUserCircle,
} from "react-icons/md";
import { RiStethoscopeFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import MenuButton from "../components/buttons/MenuButton";
import {
    useGetCurrentAccount,
    useLogoutAccount,
} from "../queryHooks/useAccount";
import { useGetPaginatedDatas as useGetMandates } from "../queryHooks/useMandate";
import { useGetPaginatedDatas as useGetMissions } from "../queryHooks/useMission";

import ReactLogo from "../assets/logo-horizontal.svg";

const Menu = () => {
    const { mutate: logout } = useLogoutAccount();
    const { data: account, isSuccess: isSuccessAccount } =
        useGetCurrentAccount();

    const [show, setShow] = useState(false);

    const mandateDefaultStatus = () => {
        if (isSuccessAccount) {
            if (account.roles.includes("ROLE_DOCTOR")) return "DEFAULT";
            if (account.roles.includes("ROLE_NURSE")) return "attribué";
            if (account.roles.includes("ROLE_COORDINATOR")) return "DEFAULT";
        } else return null;
    };

    const { data: mandates, isSuccess: isSuccessMandate } = useGetMandates(
        1,
        "id",
        "ASC",
        "",
        { status: mandateDefaultStatus() }
    );

    const { data: missions, isSuccess: isSuccessMission } = useGetMissions(
        1,
        "id",
        "ASC",
        "",
        { status: "en cours" }
    );

    const missionsBadge = () => {
        if (isSuccessMission && account.roles.includes("ROLE_DOCTOR")) {
            const nbMissions = missions["hydra:member"].filter(
                (mission) =>
                    mission.opas && mission.opas.status === "envoyé au médecin"
            ).length;
            if (nbMissions > 0) return nbMissions;
            else return null;
        }
        return null;
    };

    return (
        <div className="z-[100] h-screen fixed md:sticky md:top-0">
            <div className="md:hidden fixed bottom-0 bg-primary w-full text-center pt-2 pb-5">
                <label className="rounded-full bg-white swap swap-rotate p-2">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" onClick={() => setShow(!show)} />

                    {/* hamburger icon */}
                    <IoMenuSharp
                        size={30}
                        className="swap-off fill-current text-primary"
                    />

                    {/* close icon */}
                    <IoCloseSharp
                        size={30}
                        className="swap-on fill-current text-primary"
                    />
                </label>
            </div>
            <div
                className={`w-screen md:w-64 h-screen md:h-auto md:sticky md:top-0 ${show ? "block" : "hidden md:block"
                    }`}
            >
                <div className="flex justify-between items-center p-3 md:h-[146px]">
                    <NavLink className="" to="/dashboard">
                        <img
                            src={ReactLogo}
                            className=""
                            alt="React Logo"
                            style={{ width: 180 }}
                        />
                    </NavLink>
                </div>
                <div className={`flex-1 bg-white p-3 md:w-64 h-full`}>
                    <div className="pt-3 md:pt-0 text-xl md:text-sm">
                        <div className="text-zinc-400 font-light uppercase mt-5 pl-2 pb-2">
                            mon activité
                        </div>
                        <MenuButton
                            onClick={() => setShow(!show)}
                            link="/dashboard"
                            title="Tableau de bord"
                            roles={["ROLE_USER"]}
                        >
                            <MdDashboard size={25} />
                        </MenuButton>
                        <MenuButton
                            onClick={() => setShow(!show)}
                            link="/missions"
                            title="Missions"
                            roles={["ROLE_NURSE", "ROLE_DOCTOR"]}
                            badge={missionsBadge()}
                        >
                            <MdPendingActions size={25} />
                        </MenuButton>
                        <MenuButton
                            onClick={() => setShow(!show)}
                            link="/collaborations"
                            title="Collaborations"
                            roles={["ROLE_NURSE"]}
                        >
                            <IoPeople size={25} />
                        </MenuButton>
                        <MenuButton
                            onClick={() => setShow(!show)}
                            disabled={true}
                            title="Planning"
                            roles={["ROLE_NURSE"]}
                        >
                            <MdSchedule size={25} />
                        </MenuButton>
                        <MenuButton
                            onClick={() => setShow(!show)}
                            disabled={true}
                            title="Factures"
                            roles={["ROLE_NURSE"]}
                        >
                            <BsFileEarmarkRuled size={25} />
                        </MenuButton>
                        <MenuButton
                            onClick={() => setShow(!show)}
                            disabled={true}
                            title="Statistiques"
                            roles={["ROLE_NURSE"]}
                        >
                            <AiOutlineBarChart size={25} />
                        </MenuButton>
                        <MenuButton
                            onClick={() => setShow(!show)}
                            link="/mandates"
                            badge={
                                isSuccessMandate &&
                                !account.roles.includes("ROLE_DOCTOR") &&
                                mandates["hydra:totalItems"] !== 0 &&
                                mandates["hydra:totalItems"]
                            }
                            title="Mandats"
                            roles={[
                                "ROLE_NURSE",
                                "ROLE_PHYSIO",
                                "ROLE_PHARMACY",
                            ]}
                        >
                            <MdEventNote size={25} />
                        </MenuButton>
                        <MenuButton
                            onClick={() => setShow(!show)}
                            link="/groupmandates"
                            badge={
                                isSuccessMandate &&
                                !account.roles.includes("ROLE_DOCTOR") &&
                                mandates["hydra:totalItems"] !== 0 &&
                                mandates["hydra:totalItems"]
                            }
                            title="Mandats"
                            roles={["ROLE_DOCTOR", "ROLE_COORDINATOR"]}
                        >
                            <MdEventNote size={25} />
                        </MenuButton>
                        <div className="text-zinc-400 font-light uppercase mt-5 pl-2 pb-2">
                            contacts
                        </div>
                        <MenuButton
                            onClick={() => setShow(!show)}
                            link="/patients"
                            title="Patients"
                            roles={["ROLE_NURSE", "ROLE_ORGANIZATION"]}
                        >
                            <IoPersonCircleOutline size={25} />
                        </MenuButton>
                        <MenuButton
                            onClick={() => setShow(!show)}
                            link="/doctors"
                            title="Médecins"
                            roles={["ROLE_NURSE", "ROLE_COORDINATOR"]}
                        >
                            <RiStethoscopeFill size={25} />
                        </MenuButton>
                        <MenuButton
                            onClick={() => setShow(!show)}
                            link="/assurances"
                            title="Assurances"
                            roles={["ROLE_USER", "ROLE_COORDINATOR"]}
                        >
                            <MdOutlineHealthAndSafety size={25} />
                        </MenuButton>
                        <MenuButton
                            onClick={() => setShow(!show)}
                            link="/partners"
                            title="Partenaires"
                            roles={["ROLE_NURSE", "ROLE_ORGANIZATION"]}
                        >
                            <FaHandshake size={25} />
                        </MenuButton>
                        <div className="text-zinc-400 font-light uppercase mt-5 pl-2 pb-2">
                            mon compte
                        </div>
                        <MenuButton
                            onClick={() => setShow(!show)}
                            link="/services"
                            title="Prestations"
                            roles="ROLE_ADMIN"
                        >
                            <GiHealthNormal size={25} />
                        </MenuButton>
                        <MenuButton
                            onClick={() => setShow(!show)}
                            link="/account"
                            title="Paramètres"
                            roles={[
                                "ROLE_NURSE",
                                "ROLE_DOCTOR",
                                "ROLE_ORGANIZATION",
                            ]}
                        >
                            <MdOutlineSettings size={25} />
                        </MenuButton>
                        <MenuButton
                            onClick={() => setShow(!show)}
                            link="/users"
                            title="Utilisateurs"
                            roles={["ROLE_ADMIN"]}
                        >
                            <MdSupervisedUserCircle size={25} />
                        </MenuButton>
                        <MenuButton
                            onClick={() => logout()}
                            title="Déconnexion"
                            roles={["ROLE_USER"]}
                        >
                            <HiLogout size={25} />
                        </MenuButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
