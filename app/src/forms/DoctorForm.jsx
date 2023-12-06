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
import Loader from '../components/Loader';

const DoctorForm = ({ iri, handleCloseModal }) => {

    const { isLoading, data } = useGetIRI(iri)
    const { mutate: postData, isLoading: isPostPending, isSuccess: isPostSuccess } = usePostData()
    const { mutate: putData, isLoading: isPutPending, isSuccess: isPutSuccess } = usePutData()


    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: doctor
    })

    // Case update
    useEffect(() => {
        if (iri && data) {
            reset(data)
        }
    }, [isLoading, data])

    const onSubmit = form => {
        if (!iri)
            postData(form)
        else {
            putData(form)
        }
    }

    useEffect(() => {
        if (isPostSuccess || isPutSuccess) handleCloseModal()
    }, [isPostSuccess, isPutSuccess])


    if (isLoading && iri) return <Loader />
    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}
                isLoading={isPostPending || isPutPending}
                isDisabled={isPostPending || isPutPending}
                className="p-5"
            >
                <DoctorFields register={register} errors={errors} />
            </Form>
            {iri &&
                <CommentForm doctor={iri} />
            }
        </>
    )

}

export default DoctorForm