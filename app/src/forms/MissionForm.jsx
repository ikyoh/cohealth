import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import AddButton from "../components/buttons/AddButton";
import Form from "../components/form/form/Form";
import { FormSelectAssuranceIRI } from "../components/form/selectAssuranceIRI/FormSelectAssuranceIRI";
import { FormSelectDoctorIRI } from "../components/form/selectDoctorIRI/FormSelectDoctorIRI";
import { FormSelectPatientIRI } from "../components/form/selectPatientIRI/FormSelectPatientIRI";
import { API_URL, API_USERS } from "../config/api.config";
import AssuranceFields from "../fields/AssuranceFields";
import DoctorFields from "../fields/DoctorFields";
import MissionFields from "../fields/MissionFields";
import PatientFields from "../fields/PatientFields";
import { useSearch } from "../hooks/useSearch";
import { useGetCurrentAccount as useAccount } from "../queryHooks/useAccount";
import { useGetIRI, usePostData, usePutData } from "../queryHooks/useMission";
import { mission } from "../utils/arrays";
import {
    assuranceIRI as assuranceIRISchema,
    assurance as assuranceSchema,
    doctorIRI as doctorIRISchema,
    doctor as doctorSchema,
    mission as missionSchema,
    patientIRI as patientIRISchema,
    patient as patientSchema,
} from "../utils/validationSchemas";

const MissionForm = ({ iri, handleCloseModal, action = "patientIRI" }) => {
    const [modalAction, setModalAction] = useState(action);
    const { isLoading, data } = useGetIRI(iri);
    const { data: user } = useAccount();
    const { mutate: postData } = usePostData();
    const { mutate: putData } = usePutData(iri);

    const { searchValue, searchbar } = useSearch("");

    const [currentStep, setCurrentStep] = useState(iri ? null : 1);
    const steps = iri ? null : 2;

    const handleNextStep = async () => {
        const isStepValid = await trigger();
        if (isStepValid) {
            setCurrentStep((cur) => cur + 1);
            setModalAction("mission");
        }
    };

    const handlePrevStep = () => {
        setCurrentStep((cur) => cur - 1);
        setModalAction("patientIRI");
    };

    const validationSchema = {
        mission: missionSchema,
        patient: Yup.object({ patient: patientSchema }),
        doctor: Yup.object({ doctor: doctorSchema }),
        assurance: Yup.object({ assurance: assuranceSchema }),
        patientIRI: patientIRISchema,
        doctorIRI: doctorIRISchema,
        assuranceIRI: assuranceIRISchema,
    };

    const methods = useForm({
        shouldUnregister: false,
        defaultValues: mission,
        resolver: yupResolver(validationSchema[modalAction]),
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
            const datas = { ...form };
            delete datas.user;
            delete datas.documents;
            delete datas.mandate;
            delete datas.patient;
            putData(datas);
        }
        handleCloseModal();
    };

    return (
        <>
            {steps && (
                <ul className="steps w-full">
                    <li data-content="●" className="step step-primary w-full">
                        Patient
                    </li>
                    <li
                        data-content="●"
                        className={`step w-full ${
                            currentStep === 2 ? "step-primary" : "step-neutral"
                        }`}
                    >
                        Dates - Synthèse
                    </li>
                </ul>
            )}

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
                >
                    {modalAction === "mission" && (
                        <>
                            <MissionFields
                                errors={errors}
                                register={register}
                            />
                        </>
                    )}
                    {modalAction === "patientIRI" && (
                        <>
                            <div className="flex justify-between">
                                {searchbar}
                                <AddButton
                                    onClick={() => setModalAction("patient")}
                                />
                            </div>
                            <FormSelectPatientIRI
                                watch={watch}
                                setValue={setValue}
                                searchValue={searchValue}
                            />
                        </>
                    )}
                    {modalAction === "patient" && (
                        <>
                            <PatientFields
                                errors={errors}
                                register={register}
                                name="patient"
                            />
                        </>
                    )}
                    {modalAction === "doctorIRI" && (
                        <>
                            <div className="flex justify-between">
                                {searchbar}
                                <AddButton
                                    onClick={() => setModalAction("doctor")}
                                />
                            </div>
                            <FormSelectDoctorIRI
                                watch={watch}
                                setValue={setValue}
                                searchValue={searchValue}
                            />
                        </>
                    )}
                    {modalAction === "doctor" && (
                        <DoctorFields
                            errors={errors}
                            register={register}
                            name="doctor"
                        />
                    )}
                    {modalAction === "assuranceIRI" && (
                        <>
                            <div className="flex justify-between">
                                {searchbar}
                                <AddButton
                                    onClick={() => setModalAction("assurance")}
                                />
                            </div>
                            <FormSelectAssuranceIRI
                                watch={watch}
                                setValue={setValue}
                                searchValue={searchValue}
                            />
                        </>
                    )}
                    {modalAction === "assurance" && (
                        <AssuranceFields
                            errors={errors}
                            register={register}
                            name="assurance"
                            watch={watch}
                        />
                    )}
                </Form>
            </FormProvider>
        </>
    );
};

export default MissionForm;
