import classNames from "classnames";
import { useEffect } from "react";
import { useGetAllDatas, useGetIRI } from "../../../queryHooks/usePatient";
import Loader from "../../Loader";

export const FormSelectPatientIRI = ({ watch, setValue, searchValue }) => {
    const { isLoading, data } = useGetAllDatas(
        searchValue ? searchValue : "",
        "lastname",
        "asc",
        true
    );
    const { data: patient } = useGetIRI(
        watch("patient") ? watch("patient") : ""
    );

    useEffect(() => {
        if (patient) {
            if (patient.doctor) setValue("doctor", patient.doctor);
            if (patient.assurance) setValue("assurance", patient.assurance);
        }
    }, [patient, setValue]);

    const Button = ({ data }) => {
        const className = classNames(
            "p-3 flex justify-between border-t border-slate-500/20",
            {
                "bg-action": watch("patient") === data["@id"],
                "cursor-pointer hover:bg-action/30":
                    watch("patient") !== data["@id"],
            }
        );

        return (
            <div
                className={className}
                onClick={() => setValue("patient", data["@id"])}
            >
                <div>
                    {data.firstname} {data.lastname}
                </div>
                <div></div>
            </div>
        );
    };

    if (isLoading) return <Loader />;
    else
        return (
            <div>
                {data &&
                    data.map((data) => <Button key={data.id} data={data} />)}
            </div>
        );
};
