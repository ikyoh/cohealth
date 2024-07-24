import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormCheckbox } from "../components/form/checkbox/FormCheckbox";
import Form from "../components/form/form/Form";
import { FormTextarea } from "../components/form/textarea/FormTextarea";
import { useGetIRI, usePutData } from "../queryHooks/usePrescription";

const OpasDoctorValidationForm = ({ iri, handleCloseModal }) => {
    const { isLoading: isLoadingData, data } = useGetIRI(iri);
    const { mutate: putData } = usePutData();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        //resolver: yupResolver(validationSchema),
        //defaultValues: {signedAt : dayjs() }
    });

    useEffect(() => {
        if (iri && data) {
            reset({
                ...data,
                signedAt: dayjs(),
                status: "validé par le médecin",
            });
        }
        // eslint-disable-next-line
    }, [isLoadingData, data]);

    const onSubmit = (form) => {
        console.log("form", form);
        putData(form);
        handleCloseModal();
    };

    return (
        <>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                className="p-5"
            >
                <FormTextarea
                    name="content.diagnosticDoctor"
                    label="Mesures médico-déléguées"
                    //error={errors['isActive']}
                    register={register}
                    required={false}
                    rows={2}
                />
                <FormCheckbox
                    name="isSigned"
                    label="Accord"
                    register={register}
                    error={errors["isDoctorSigned"]}
                />
            </Form>
        </>
    );
};

export default OpasDoctorValidationForm;
