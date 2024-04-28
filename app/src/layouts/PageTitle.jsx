import * as dayjs from "dayjs";
import React from "react";
import ReactPicto from "../assets/picto.svg";

import { URL } from "../features/apiConfig";
import { useGetCurrentAccount } from "../queryHooks/useAccount";

const PageTitle = ({
    title,
    subtitle = false,
    children,
    mainButton = false,
}) => {
    const { data: account, isLoading, error } = useGetCurrentAccount();

    return (
        <div className="px-3 md:px-0 flex flex-col md:flex-row md:items-center py-7 bg-slate-100 sticky top-0 w-full z-10 gap-5">
            <div className="flex items-center gap-3 grow">
                <div>
                    <div className="text-sm font-light capitalize">
                        {dayjs().format("dddd D MMMM YYYY")}
                    </div>
                    <div className="flex">
                        <div className="font-bold text-[33px]">{title}</div>
                        {subtitle !== false && subtitle !== 0 && (
                            <div className="chat chat-start h-9">
                                <div className="chat-bubble bg-white">
                                    <p className="text-primary text-sm font-semibold mt-1">
                                        {subtitle}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="bg-white md:bg-transparent flex p-2 rounded-full shadow-lg md:shadow-none shadow-slate-400/40 gap-3 justify-between">
                <div className="md:bg-white grow flex md:p-2 rounded-full md:shadow-lg shadow-none shadow-slate-400/40 gap-3 justify-between">
                    {children && (
                        <div className="w-full md:w-auto flex items-center justify-between gap-3 grow">
                            {children}
                        </div>
                    )}
                    {mainButton && (
                        <div className="flex items-center justify-between grow-0">
                            {mainButton}
                        </div>
                    )}
                </div>
                <div
                    className="flex items-center text-sm space-x-4 tooltip tooltip-left tooltip-neutral"
                    data-tip={
                        account.organization
                            ? account.organization
                            : account.firstname + " " + account.lastname
                    }
                >
                    {account.roles.includes("ROLE_ADMIN") ||
                    account.roles.includes("ROLE_COORDINATOR") ? (
                        <button className="bg-white flex gap-3 p-2 rounded-full shadow-lg shadow-slate-400/40">
                            <img
                                src={ReactPicto}
                                className="rounded-full object-cover h-10 w-10 overflow-hidden"
                                style={{ width: "100%" }}
                                alt="profil"
                            />
                        </button>
                    ) : account.avatar ? (
                        <button className="bg-white flex gap-3 p-2 rounded-full shadow-lg shadow-slate-400/40">
                            <img
                                src={URL + account.avatar.contentUrl}
                                className="rounded-full object-cover h-10 w-10"
                                alt="profil"
                            />
                        </button>
                    ) : (
                        <button className="rounded-full flex items-center h-10 justify-center w-10 bg-slate-300">
                            {account.firstname && account.firstname.charAt(0)}
                            {account.lastname && account.lastname.charAt(0)}
                            {account.organization &&
                                account.organization.charAt(0).toUpperCase()}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PageTitle;
