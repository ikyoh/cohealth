import React, { useEffect } from 'react'
import { useGetIRI, usePostData, usePutData } from '../queryHooks/useAssurance';
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { assurance } from '../utils/arrays';
import AssuranceFields from '../fields/AssuranceFields';
import CommentForm from './CommentForm';
import { assurance as validationSchema } from '../utils/validationSchemas';

const AssuranceForm = ({ iri, handleCloseModal }) => {

    const { isLoading: isLoadingData, data, isError, error } = useGetIRI(iri)
    const { mutate: postData, isLoading: isPosting, isSuccess } = usePostData()
    const { mutate: putData } = usePutData()

    const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: assurance
    })

console.log('errors', errors)

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
                className='p-5'
            >
                <AssuranceFields register={register} errors={errors} watch={watch} />
            </Form>
            {iri &&
                <CommentForm assurance={iri} />
            }
        </>
    )

}

export default AssuranceForm