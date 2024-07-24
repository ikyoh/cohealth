import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import AddButton from "../components/buttons/AddButton";
import Form from "../components/form/form/Form";
import { FormSelectAssuranceIRI } from "../components/form/selectAssuranceIRI/FormSelectAssuranceIRI";
import { FormSelectDoctorIRI } from "../components/form/selectDoctorIRI/FormSelectDoctorIRI";
import Loader from "../components/Loader";
import AssuranceFields from "../fields/AssuranceFields";
import DoctorFields from "../fields/DoctorFields";
import PatientFields from "../fields/PatientFields";
import { useSearch } from "../hooks/useSearch";
import { useGetIRI, usePostData, usePutData } from "../queryHooks/usePatient";
import { patient } from "../utils/arrays";
import {
    assuranceIRI as assuranceIRISchema,
    assurance as assuranceSchema,
    doctorIRI as doctorIRISchema,
    doctor as doctorSchema,
    patient as patientSchema,
} from "../utils/validationSchemas";

const PatientForm = ({ iri, handleCloseModal, action = "patient" }) => {
    const [modalAction, setModalAction] = useState(action);
    const { isLoading, data } = useGetIRI(iri);
    //const { isLoading: isLoadingDoctors, data: doctors } = useDoctors('', 'fullname', 'asc', action === 'doctorIRI' ? true : false)
    const { mutate: postData } = usePostData();
    const { mutate: putData } = usePutData(iri);

    const { searchValue, searchbar } = useSearch("");

    const validationSchema = {
        patient: patientSchema,
        doctor: Yup.object({ doctor: doctorSchema }),
        assurance: assuranceSchema,
        doctorIRI: doctorIRISchema,
        assuranceIRI: assuranceIRISchema,
    };

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validationSchema[modalAction]),
        defaultValues: patient,
    });

    // Case update
    useEffect(() => {
        if (iri && data) {
            console.log("data", data);
            reset(data);
        }
        // eslint-disable-next-line
    }, [isLoading, data]);

    const onSubmit = (form) => {
        if (!iri) postData(form);
        else {
            putData(form);
        }
        handleCloseModal();
    };

    if (isLoading && iri) return <Loader />;
    else
        return (
            <Form
                onSubmit={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
            >
                {modalAction === "patient" && (
                    <>
                        <PatientFields errors={errors} register={register} />
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
                    />
                )}
            </Form>
        );
};

export default PatientForm;
