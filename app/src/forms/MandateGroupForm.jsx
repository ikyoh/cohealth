import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
import Form from "../components/form/form/Form";
import { useGetCurrentAccount } from "../queryHooks/useAccount";
import {
    useGetAllDatas,
    useGetIRI,
    usePostData,
} from "../queryHooks/useMandateGroup";
import {
    mandatePatient as mandatePatientSchema,
    mandateServices as mandateServicesSchema,
} from "../utils/validationSchemas";

import dayjs from "dayjs";
import MandatePatientFields from "../fields/MandatePatientFields";
import MandateServiceFields from "../fields/MandateServiceFields";

import uuid from "react-uuid";
import { API_USERS, IRI } from "../config/api.config";

const MandateGroupForm = ({ iri, handleCloseModal }) => {
    const { isLoading: isLoadingData, data, isError, error } = useGetIRI(iri);
    const { mutate: postData, isLoading: isPosting, isSuccess } = usePostData();
    const { isLoading: isLoadingAccount, data: account } =
        useGetCurrentAccount();

    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = async () => {
        const isStepValid = await trigger();
        if (isStepValid) {
            setCurrentStep((cur) => cur + 1);
        }
    };

    const handlePrevStep = () => {
        setCurrentStep((cur) => cur - 1);
    };

    const validationSchema = {
        1: Yup.object({ patient: mandatePatientSchema }),
        2: Yup.object({
            mandates: mandateServicesSchema,
        }),
    };

    const methods = useForm({
        shouldUnregister: false,
        defaultValues: {
            patient: { canton: "Genève" },
            mandates: [
                {
                    category: "ROLE_NURSE",
                    user: IRI + API_USERS + "/" + account.id,
                    beginAt: dayjs().format("YYYY-MM-DD"),
                },
            ],
        },
        resolver: yupResolver(validationSchema[currentStep]),
        mode: "onChange",
    });

    const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        setValue,
        trigger,
        formState: { errors, isSubmitting },
    } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "mandates",
    });

    // Case update
    useEffect(() => {
        if (iri && data) {
            reset(data.content);
        }
    }, [isLoadingData, data]);

    const onSubmit = (form) => {
        console.log("form", form);
        postData(form);
        handleCloseModal();
    };

    return (
        <>
            <FormProvider {...methods}>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    steps={2}
                    handleNextStep={handleNextStep}
                    handlePrevStep={handlePrevStep}
                    currentStep={currentStep}
                    isLoading={isSubmitting || isPosting}
                    isDisabled={isSubmitting || isPosting}
                    errors={errors}
                >
                    {currentStep === 1 && (
                        <>
                            <SelectPatient setValue={setValue} />
                            <MandatePatientFields
                                register={register}
                                errors={errors}
                                name="patient"
                            />
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                            <ul>
                                {fields.map((item, index) => {
                                    return (
                                        <li
                                            key={item.id}
                                            className="flex flex-col gap-3"
                                        >
                                            {fields.length !== 1 && (
                                                <button
                                                    type="button"
                                                    className="btn"
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                >
                                                    Retirer la prestation
                                                </button>
                                            )}
                                            <MandateServiceFields
                                                name="mandates"
                                                index={index}
                                                register={register}
                                                errors={errors}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>

                            <button
                                type="button"
                                className="btn"
                                onClick={() => {
                                    append(
                                        {
                                            category: "",
                                            description: "",
                                            user:
                                                IRI +
                                                API_USERS +
                                                "/" +
                                                account.id,
                                            beginAt:
                                                dayjs().format("YYYY-MM-DD"),
                                        },
                                        {
                                            focusName: `mandates.${fields.length}.category`,
                                        }
                                    );
                                }}
                            >
                                AJOUTER
                            </button>
                        </>
                    )}
                </Form>
            </FormProvider>
        </>
    );
};

export default MandateGroupForm;

const SelectPatient = ({ setValue }) => {
    const { data, isLoading, isError, error } = useGetAllDatas();
    if (isLoading) return <p>Chargement...</p>;
    if (!isLoading && data && data["hydra:totalItems"] === 0)
        return <p>Aucun patient trouvé</p>;
    return (
        <select
            className="bg-gray-100 p-2 rounded"
            onChange={(e) => {
                console.log(
                    'data["hydra:member"][e.target.value]',
                    data["hydra:member"][e.target.value].patient
                );
                setValue(
                    "patient",
                    data["hydra:member"][e.target.value].patient
                );
            }}
        >
            <option value="">Choisir un patient</option>
            {data["hydra:member"].map((item, index) => (
                <option key={uuid()} value={index}>
                    {item.patient.firstname} {item.patient.lastname} - AVS{" "}
                    {item.patient.avsNumber}
                </option>
            ))}
        </select>
    );
};
