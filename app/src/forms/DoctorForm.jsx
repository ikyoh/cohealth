import React, { useEffect } from 'react'
import { useGetIRI, usePostData, usePutData } from '../queryHooks/useDoctor';
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { doctor } from '../utils/arrays';
import DoctorFields from '../fields/DoctorFields';
import CommentForm from './CommentForm';
import { doctor as validationSchema } from '../utils/validationSchemas';

const DoctorForm = ({ iri, handleCloseModal }) => {

    const { isLoading: isLoadingData, data, isError, error } = useGetIRI(iri)
    const { mutate: postData, isLoading: isPosting, isSuccess } = usePostData()
    const { mutate: putData } = usePutData()


    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: doctor
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
                <DoctorFields register={register} errors={errors} />
            </Form>
            <CommentForm doctor={iri}/>
        </>
    )

}

export default DoctorForm