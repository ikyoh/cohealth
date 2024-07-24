import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import OpasFields from "../fields/OpasFields";
import { useGetCurrentAccount as useAccount } from "../queryHooks/useAccount";
import { useGetIRI as useMission } from "../queryHooks/useMission";
import {
    useGetIRI,
    usePostData,
    usePutData,
} from "../queryHooks/usePrescription";
import { opas } from "../utils/arrays";

import { API_URL, API_USERS } from "../config/api.config";
import OpasServicesFields from "../fields/OpasServicesFields";
import { calcABCN, calcMinutestoHours } from "../utils/functions";

const OpasForm = ({ iri, missionIRI, handleCloseModal, action = "infos" }) => {
    const [modalAction, setModalAction] = useState(action);
    const { isLoading, data } = useGetIRI(iri);
    const { data: mission } = useMission(missionIRI);
    //const { data: doctors } = useDoctors('', 'fullname', 'asc', action === 'doctorIRI' ? true : false)
    const { data: user } = useAccount();
    const { mutate: postData } = usePostData();
    const { mutate: putData } = usePutData();

    const [currentStep, setCurrentStep] = useState(1);
    const steps = 2;

    const handleNextStep = async () => {
        const isStepValid = await trigger();
        if (isStepValid) {
            setCurrentStep((cur) => cur + 1);
            setModalAction("services");
        }
    };

    const handlePrevStep = () => {
        setCurrentStep((cur) => cur - 1);
        setModalAction("infos");
    };

    // const validationSchema = {
    //     mission: missionSchema,
    //     patient: Yup.object({ patient: patientSchema }),
    //     doctor: Yup.object({ doctor: doctorSchema }),
    //     assurance: Yup.object({ assurance: assuranceSchema }),
    //     patientIRI: patientIRISchema,
    //     doctorIRI: doctorIRISchema,
    //     assuranceIRI: assuranceIRISchema,
    // };

    const methods = useForm({
        shouldUnregister: false,
        defaultValues: { ...opas, mission: missionIRI },
        //resolver: yupResolver(validationSchema[modalAction]),
        mode: "onChange",
    });

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        trigger,
        formState: { errors, isSubmitting },
    } = methods;

    const values = watch();

    const totalA = calcABCN(
        "A",
        values.content.services,
        mission.beginAt,
        mission.endAt
    );
    const totalAHours = calcMinutestoHours(totalA);
    const totalB = calcABCN(
        "B",
        values.content.services,
        mission.beginAt,
        mission.endAt
    );
    const totalBHours = calcMinutestoHours(totalB);
    const totalC = calcABCN(
        "C",
        values.content.services,
        mission.beginAt,
        mission.endAt
    );
    const totalCHours = calcMinutestoHours(totalC);

    // Case update
    useEffect(() => {
        if (iri && data) {
            reset(data);
        }
        // eslint-disable-next-line
    }, [isLoading, data]);

    useEffect(() => {
        if (modalAction === "patient" && user)
            setValue("patient.user", API_URL + API_USERS + "/" + user.id);
        // eslint-disable-next-line
    }, [modalAction]);

    const onSubmit = (form) => {
        if (!iri) postData(form);
        else {
            putData(form);
        }
        handleCloseModal();
    };

    return (
        <>
            <FormProvider {...methods}>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    steps={steps || null}
                    handleNextStep={handleNextStep}
                    handlePrevStep={handlePrevStep}
                    currentStep={currentStep}
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting}
                    errors={errors}
                    className=""
                >
                    {steps && (
                        <div>
                            <ul className="steps w-full border-b">
                                <li
                                    data-content={`${
                                        currentStep === 1 ? "●" : ""
                                    }`}
                                    className="step step-primary w-full"
                                >
                                    Informations
                                </li>
                                <li
                                    data-content={`${
                                        currentStep === 2 ? "●" : ""
                                    }`}
                                    className={`step w-full ${
                                        currentStep === 2 && "step-primary"
                                    }`}
                                >
                                    Prescriptions
                                </li>
                            </ul>
                        </div>
                    )}

                    {modalAction === "infos" && (
                        <OpasFields errors={errors} register={register} />
                    )}
                    {modalAction === "services" && (
                        <OpasServicesFields
                            errors={errors}
                            register={register}
                            totalAHours={totalAHours}
                            totalBHours={totalBHours}
                            totalCHours={totalCHours}
                            beginAt={mission.beginAt}
                            endAt={mission.endAt}
                        />
                    )}
                </Form>
            </FormProvider>
        </>
    );
};

export default OpasForm;
