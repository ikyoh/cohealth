import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import Form from "../components/form/form/Form";
import MandateServiceFields from "../fields/MandateServiceFields";
import { useGetIRI, usePutData } from "../queryHooks/useMandate";
import { mandateEdit as validationSchema } from "../utils/validationSchemas";

const MandateEditForm = ({ iri, handleCloseModal }) => {
    const { isLoading, data } = useGetIRI(iri);
    const { mutate, isLoading: isPending, isSuccess } = usePutData();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: data,
        resolver: yupResolver(validationSchema),
    });

    // Case update
    useEffect(() => {
        if (data) {
            reset(data);
        }
        // eslint-disable-next-line
    }, [isLoading]);

    const onSubmit = (form) => {
        mutate(form);
    };

    useEffect(() => {
        if (isSuccess) handleCloseModal();
        // eslint-disable-next-line
    }, [isSuccess]);

    if (isLoading) return <Loader />;

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isSubmitting || isPending}
            isDisabled={isSubmitting || isPending}
            errors={errors}
        >
            <MandateServiceFields
                register={register}
                errors={errors}
                edit={true}
            />
        </Form>
    );
};

export default MandateEditForm;
