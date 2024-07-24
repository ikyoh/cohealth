import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import Loader from "../components/Loader";
import AssuranceFields from "../fields/AssuranceFields";
import { useGetIRI, usePostData, usePutData } from "../queryHooks/useAssurance";
import { assurance } from "../utils/arrays";
import { assurance as validationSchema } from "../utils/validationSchemas";
import CommentForm from "./CommentForm";

const AssuranceForm = ({ iri, handleCloseModal }) => {
    const { isLoading, data } = useGetIRI(iri);
    const {
        mutate: postData,
        isLoading: isPostPending,
        isSuccess: isPostSuccess,
    } = usePostData();
    const {
        mutate: putData,
        isLoading: isPutPending,
        isSuccess: isPutSuccess,
    } = usePutData();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: assurance,
    });

    // Case update
    useEffect(() => {
        if (iri && data) {
            reset(data);
        }
        // eslint-disable-next-line
    }, [isLoading, data]);

    const onSubmit = (form) => {
        if (!iri) postData(form);
        else {
            putData(form);
        }
    };

    useEffect(() => {
        if (isPostSuccess || isPutSuccess) handleCloseModal();
        // eslint-disable-next-line
    }, [isPostSuccess, isPutSuccess]);

    if (isLoading && iri) return <Loader />;
    return (
        <>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                isLoading={isPostPending || isPutPending}
                isDisabled={isPostPending || isPutPending}
                className="p-5"
            >
                <AssuranceFields
                    register={register}
                    errors={errors}
                    watch={watch}
                />
            </Form>
            {iri && <CommentForm assurance={iri} />}
        </>
    );
};

export default AssuranceForm;
