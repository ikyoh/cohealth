import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import Form from "../components/form/form/Form";
import { API_URL, API_USERS } from "../config/api.config";
import MissionFields from "../fields/MissionFields";
import { useGetCurrentAccount as useAccount } from "../queryHooks/useAccount";
import { useGetPaginatedDatas as useGetDoctors } from "../queryHooks/useDoctor";
import { useGetIRI, usePutData } from "../queryHooks/useMandate";
import { useGetIRI as useGetMandateGroup } from "../queryHooks/useMandateGroup";
import { usePostData } from "../queryHooks/useMission";
import { useGetDatasByAvsNumber } from "../queryHooks/usePatient";
import { mission as validationSchema } from "../utils/validationSchemas";

const MandateAcceptForm = ({ iri }) => {
    const { isLoading, data } = useGetIRI(iri);
    const { isLoadingMandataGroup, data: mandateGroup } = useGetMandateGroup(
        data ? data.mandateGroup : null
    );
    const { data: user, isLoading: isLoadingUser } = useAccount();
    const { data: patient, isLoading: isLoadingPatient } =
        useGetDatasByAvsNumber(data ? mandateGroup.patient.avsNumber : null);
    const { data: doctor, isLoading: isLoadingDoctor } = useGetDoctors(
        1,
        "",
        "",
        "",
        { rcc: mandateGroup ? mandateGroup.user.rcc : null },
        mandateGroup ? mandateGroup.user.rcc : false
    );

    const { mutate: postData, isLoading: isPosting } = usePostData();
    const {
        mutate: putData,
        isSuccess: isPutSuccess,
        isLoading: isPutting,
    } = usePutData();

    useEffect(() => {
        if (patient && doctor && !isLoading) {
            if (patient["hydra:member"].length !== 0)
                reset({
                    patient: patient["hydra:member"][0],
                    beginAt: dayjs(data.beginAt).format("YYYY-MM-DD"),
                    mandate: data["@id"],
                    doctor: doctor["hydra:member"][0],
                });
            else
                reset({
                    patient: {
                        ...mandateGroup.patient,
                        user: API_URL + API_USERS + "/" + user.id,
                    },
                    beginAt: dayjs(data.beginAt).format("YYYY-MM-DD"),
                    mandate: data["@id"],
                    doctor: doctor["hydra:member"][0],
                });
        }
        // eslint-disable-next-line
    }, [
        isLoadingPatient,
        isLoadingDoctor,
        isLoadingUser,
        isLoadingMandataGroup,
    ]);

    const onSubmit = () => {
        putData({
            id: data.id,
            status: "accepté",
            acceptedAt: dayjs().format(),
            rejectedAt: null,
        });
    };

    useEffect(() => {
        if (isPutSuccess) postData(getValues());
        // eslint-disable-next-line
    }, [isPutSuccess]);

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {},
        resolver: yupResolver(validationSchema),
    });

    const beginAt = watch("beginAt");
    const endAt = watch("endAt");

    if (isLoading || isLoadingMandataGroup || isLoadingPatient || isLoadingUser)
        return <Loader />;
    return (
        <>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                submitLabel="Accepter ce mandat"
                isLoading={isSubmitting || isPosting || isPutting}
                isDisabled={
                    isLoading ||
                    isLoadingUser ||
                    isLoadingDoctor ||
                    isSubmitting ||
                    isPosting ||
                    isPutting
                }
                className="p-5"
            >
                <p>
                    <span className="font-bold">Patient :</span>{" "}
                    {mandateGroup.patient.lastname}{" "}
                    {mandateGroup.patient.firstname}
                </p>
                <p>
                    <span className="font-bold">
                        Date de prise en charge souhaitée:
                    </span>{" "}
                    {dayjs(data.beginAt).format("dddd LL")}
                </p>
                <p>
                    <span className="font-bold">Détail du mandat :</span>{" "}
                    {data.description}
                </p>
                <p>
                    <span className="font-bold">Durée de la mission :</span>{" "}
                    {endAt && beginAt
                        ? dayjs(endAt).diff(dayjs(beginAt), "days") + " jours"
                        : "..."}
                </p>
                <MissionFields errors={errors} register={register} />
            </Form>
        </>
    );
};

export default MandateAcceptForm;
