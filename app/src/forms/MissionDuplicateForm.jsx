import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import MissionFields from "../fields/MissionFields";
import { useGetIRI, usePostData } from "../queryHooks/useMission";
import { mission as validationSchema } from "../utils/validationSchemas";

const MissionDuplicateForm = ({ iri, handleCloseModal }) => {
    const { isLoading, data } = useGetIRI(iri);
    const { data: dataOpas } = useGetIRI(data && data.opas ? data.opas : null);

    const { mutate: postData, isSuccess } = usePostData();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {},
    });

    // Case update
    useEffect(() => {
        if (data) {
            const _formData = {
                description: data.description,
                assurance: data.assurance,
                doctor: data.doctor,
                patient: data.patient["@id"],
            };

            if (data.opas && dataOpas) {
                const _formDataOpas = {
                    content: dataOpas.content,
                    type: dataOpas.type,
                    user: dataOpas.user,
                };
                _formData.opas = _formDataOpas;
            }
            reset(_formData);
        }
    }, [isLoading, data, dataOpas, reset]);

    const onSubmit = (form) => {
        postData(form);
    };

    useEffect(() => {
        if (isSuccess) {
            handleCloseModal();
        }
    }, [isSuccess, handleCloseModal]);

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            errors={errors}
        >
            <MissionFields register={register} errors={errors} />
        </Form>
    );
};

export default MissionDuplicateForm;
