import React from "react";
import { MdOutlineSettings } from "react-icons/md";
import banner from "../assets/img/banner.png";
import Loader from "../components/Loader";
import AccountForm from "../forms/AccountForm";
import AccountMediaForm from "../forms/AccountMediaForm";
import { useModal } from "../hooks/useModal";
import PageTitle from "../layouts/PageTitle";
import { useGetCurrentAccount } from "../queryHooks/useAccount";

const AccountPage = () => {
    const { data: account, isLoading } = useGetCurrentAccount();
    const { Modal, handleOpenModal, handleCloseModal } = useModal();

    if (isLoading) return <Loader />;
    else
        return (
            <>
                <Modal />
                <PageTitle
                    title="Mon compte"
                    icon={<MdOutlineSettings size={40} />}
                />

                <div className="grid grid-cols-12 gap-5">
                    <div className="card-shadow col-span-4 items-center relative">
                        <div
                            className="relative mt-1 flex h-20 w-full justify-center rounded-xl bg-cover"
                            style={{ backgroundImage: `url(${banner})` }}
                        >
                            {account && account.avatar ? (
                                <img
                                    src={account.avatar.contentUrl}
                                    className="object-cover absolute -bottom-12 h-[87px] w-[87px] rounded-full border-[4px] border-white"
                                    alt="profil"
                                />
                            ) : (
                                <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-slate-300">
                                    {account.firstname.charAt(0)}
                                    {account.lastname.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div className="mt-8 flex flex-col items-center">
                            <h4 className="text-xl font-bold">
                                {account.firstname} {account.lastname}
                            </h4>
                            <p className="font-xs text-slate-400">
                                {account.roles.includes("ROLE_NURSE") &&
                                    "Infirmièr(e)"}
                                {account.roles.includes("ROLE_DOCTOR") &&
                                    "Médecin"}
                                {account.roles.includes("ROLE_PHYSIO") &&
                                    "Physiothérapeute"}
                            </p>
                        </div>

                        <div className="flex justify-center mt-5">
                            <div
                                className="cursor-pointer overflow-hidden"
                                onClick={() =>
                                    handleOpenModal({
                                        title: "Ma signature",
                                        content: (
                                            <AccountMediaForm
                                                id={
                                                    account.signature
                                                        ? account.signature.id
                                                        : false
                                                }
                                                type="signature"
                                                handleCloseModal={
                                                    handleCloseModal
                                                }
                                            />
                                        ),
                                    })
                                }
                            >
                                {account && account.signature ? (
                                    <img
                                        src={account.signature.contentUrl}
                                        className="object-cover w-[250px] max-w-full"
                                        alt="profil"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center rounded-full px-3 py-2 bg-action">
                                        Ma signature
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                className="btn btn-sm btn-primary rounded-full"
                                onClick={() =>
                                    handleOpenModal({
                                        title: "Ma signature",
                                        content: (
                                            <AccountMediaForm
                                                id={
                                                    account.signature
                                                        ? account.signature.id
                                                        : false
                                                }
                                                type="signature"
                                                handleCloseModal={
                                                    handleCloseModal
                                                }
                                            />
                                        ),
                                    })
                                }
                            >
                                Choisir ma photo de profil
                            </button>
                            <button
                                className="btn btn-sm btn-primary rounded-full"
                                onClick={() =>
                                    handleOpenModal({
                                        title: "Mon portrait",
                                        content: (
                                            <AccountMediaForm
                                                id={
                                                    account.avatar
                                                        ? account.avatar.id
                                                        : false
                                                }
                                                type="avatar"
                                                handleCloseModal={
                                                    handleCloseModal
                                                }
                                            />
                                        ),
                                    })
                                }
                            >
                                Choisir ma signature
                            </button>
                        </div>
                    </div>

                    <div className="card-shadow col-span-8">
                        <AccountForm isEdit={true} submitLabel="Modifier mon profil" />
                    </div>
                </div>
            </>
        );
};

export default AccountPage;
