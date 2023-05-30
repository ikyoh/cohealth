import React, { useEffect } from 'react'
import { useGetIRI, usePostData, usePutData } from '../queryHooks/useService';
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import { yupResolver } from '@hookform/resolvers/yup';
import ServiceFields from '../fields/ServiceFields';
import { service as defaultValues } from '../utils/arrays';
import { service as validationSchema } from '../utils/validationSchemas';

const ServiceForm = ({ iri, handleCloseModal }) => {

    const { isLoading: isLoadingData, data, isError, error } = useGetIRI(iri)
    const { mutate: postData, isLoading: isPosting, isSuccess } = usePostData()
    const { mutate: putData } = usePutData()


    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: defaultValues
    })

    // Case update
    useEffect(() => {
        if (iri && data) {
            reset(data)
        }
    }, [isLoadingData, data])

    const onSubmit = form => {
        if (!iri)
            postData(form)
        else {
            putData(form)
        }
        handleCloseModal()
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                className="p-5"
            >
                <ServiceFields register={register} errors={errors} />
            </Form>
        </>
    )

}

export default ServiceForm