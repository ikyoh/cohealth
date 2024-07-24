import React, { useState, useEffect } from "react";
import { useGetPaginatedDatas as getUsers } from "../queryHooks/useUser";
import {
    useGetAllDatas as getPartners,
    usePostData,
} from "../queryHooks/usePartner";
import Form from "../components/form/form/Form";
import uuid from "react-uuid";
import Loader from "../components/Loader";

const PartnerForm = ({ handleCloseModal }) => {
    const [filters, setFilters] = useState({ rcc: "" });
    const [enabled, setEnabled] = useState(false);
    const { data: dataUsers } = getUsers(1, "id", "asc", "", filters, enabled);
    const { isLoading: isLoadingPartners, data: dataPartners } = getPartners();
    const { mutate: post } = usePostData();

    const handleChangeInput = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (filters.rcc.length === 8) setEnabled(true);
        else setEnabled(false);
    }, [filters.rcc]);

    const onSubmit = (event) => {
        event.preventDefault();
        post({ partner: dataUsers["hydra:member"][0]["@id"] });
        handleCloseModal();
    };

    const isDisabled = () => {
        if (dataUsers && dataPartners) {
            if (dataUsers["hydra:totalItems"] !== 1) return true;
            if (
                dataPartners.filter(
                    (f) =>
                        f.partner["@id"] === dataUsers["hydra:member"][0]["@id"]
                ).length === 1
            )
                return true;
            else return false;
        }

        return true;
    };

    if (isLoadingPartners) return <Loader />;
    else
        return (
            <Form onSubmit={onSubmit} isDisabled={isDisabled()}>
                <div className="bg-gray-100 p-2 rounded flex items-center">
                    <div className="flex-1">Numéro RCC</div>
                    <input
                        type="search"
                        className="appearance-none h-10 p-2 border rounded-md focus:outline-action flex-1"
                        name="rcc"
                        value={filters.rcc}
                        onChange={handleChangeInput}
                        placeholder="C123456"
                    />
                </div>
                <div className="h-12">
                    {dataUsers &&
                        dataUsers["hydra:member"]?.map((user) => (
                            <div key={uuid()}>
                                {dataPartners.filter(
                                    (f) => f.partner["@id"] === user["@id"]
                                ).length === 1 ? (
                                    <div>
                                        {user.firstname + " " + user.lastname}{" "}
                                        (Partenaire déjà présent dans la liste)
                                    </div>
                                ) : (
                                    <div>
                                        {user.firstname + " " + user.lastname}
                                    </div>
                                )}
                            </div>
                        ))}
                    {enabled &&
                        dataUsers &&
                        dataUsers["hydra:totalItems"] === 0 && (
                            <div>Aucun résultat</div>
                        )}
                </div>
            </Form>
        );
};

export default PartnerForm;
