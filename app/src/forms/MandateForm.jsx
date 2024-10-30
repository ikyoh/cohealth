import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import uuid from "react-uuid";
import * as Yup from "yup";
import Form from "../components/form/form/Form";
import { useGetIRI, usePostData } from "../queryHooks/useMandate";
import {
    mandatePatient as mandatePatientSchema,
    mandateServices as mandateServicesSchema
} from "../utils/validationSchemas";

import MandatePatientFields from "../fields/MandatePatientFields";
import MandateServiceFields from "../fields/MandateServiceFields";

const MandateForm = ({ iri, handleCloseModal }) => {
    const { isLoading: isLoadingData, data, isError, error } = useGetIRI(iri);
    const { mutate: postData, isLoading: isPosting, isSuccess } = usePostData();

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
        2: Yup.object({ services: mandateServicesSchema }),
    };

    const methods = useForm({
        shouldUnregister: false,
        defaultValues: {
            patient: { canton: "Genève" },
            services: [{ category: "Soins infirmiers" }],
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
        name: "services",
    });

    // Case update
    useEffect(() => {
        if (iri && data) {
            reset(data.content);
        }
    }, [isLoadingData, data]);

    const onSubmit = async (form) => {
        const groupingId = uuid();
        await form.services.forEach(async (service) => {
            let _form = {
                groupingId: groupingId,
                patient: form.patient,
                service: service,
                category: service.category,
            };
            await postData(_form);
        });

        handleCloseModal();
    };

    console.log("errors", errors);

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
                        <MandatePatientFields
                            register={register}
                            errors={errors}
                            name="patient"
                        />
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
                                                name="services"
                                                index={index}
                                                register={register}
                                                errors={errors}
                                                watch={watch}
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
                                            mandateUser: null,
                                            category: "",
                                            beginAt: "",
                                            description: "",
                                        },
                                        {
                                            focusName: `services.${fields.length}.category`,
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

export default MandateForm;
