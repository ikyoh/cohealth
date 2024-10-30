import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
import Form from "../components/form/form/Form";
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
import AddButton from "../components/buttons/AddButton";
import { FormSelect } from "../components/form/select/FormSelect";

const MandateGroupForm = ({ iri, handleCloseModal }) => {
    const { isLoading: isLoadingData, data } = useGetIRI(iri);
    const { mutate: postData, isLoading: isPosting } = usePostData();
    //const { data: account } = useGetCurrentAccount();

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
                    mandateUser: null,
                    mandateSelectUser: "",
                    beginAt: dayjs().format("YYYY-MM-DD"),
                    status: "DEFAULT-édité",
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
        control,
        setValue,
        trigger,
        watch,
        getValues,
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
        // eslint-disable-next-line
    }, [isLoadingData, data]);

    const onSubmit = (form) => {
        postData(form);
        handleCloseModal();
    };

    //const watchedMandates = watch("mandates");

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
                            <SelectPatient setValue={setValue} register={register} />
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
                                            className="flex flex-col gap-3 mb-4"
                                        >
                                            <MandateServiceFields
                                                fields={fields}
                                                name="mandates"
                                                index={index}
                                                register={register}
                                                errors={errors}
                                                watch={watch}
                                                setValue={setValue}
                                                remove={remove}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>


                            <div className="flex justify-center">
                                <AddButton
                                    onClick={() => {
                                        append(
                                            {
                                                category: "",
                                                description: "",
                                                mandateUser: null,
                                                mandateSelectUser: "",
                                                beginAt:
                                                    dayjs().format("YYYY-MM-DD"),
                                            },
                                            {
                                                focusName: `mandates.${fields.length}.category`,
                                            }
                                        );
                                    }} />
                            </div>

                        </>
                    )}
                </Form>
            </FormProvider>
        </>
    );
};

export default MandateGroupForm;

const SelectPatient = ({ setValue, register }) => {
    const { data, isLoading } = useGetAllDatas();
    if (isLoading) return <p className="py-2">Chargement de la liste des patients</p>;
    if (!isLoading && data && data["hydra:totalItems"] === 0)
        return <p className="py-2">Aucun patient trouvé</p>;
    return (
        <FormSelect
            label="Liste des patients"
            name="choosePatient"
            register={register}
            onChange={(e) => {
                let mandates = data["hydra:member"].filter(f => Number(f.id) === Number(e.target.value));
                setValue("patient", mandates[0].patient);
            }}>
            <option value="">Choisir un patient</option>
            {data["hydra:member"].reduce((accumulator, current) => {
                if (!accumulator.find((item) => item.patient.avsNumber === current.patient.avsNumber)) {
                    accumulator.push(current);
                }
                return accumulator;
            }, [])
                .map((item) => (
                    <option key={uuid()} value={item.id}>
                        {item.patient.firstname} {item.patient.lastname} - AVS{" "}
                        {item.patient.avsNumber}
                    </option>
                ))}
        </FormSelect>

    );
};
