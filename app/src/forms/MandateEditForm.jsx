import React, { useEffect } from 'react';
import { useGetIRI, usePutData } from '../queryHooks/useMandate';
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import { yupResolver } from '@hookform/resolvers/yup';
import { mandate as validationSchema } from '../utils/validationSchemas';
import MandatePatientFields from '../fields/MandatePatientFields';
import MandateServiceFields from '../fields/MandateServiceFields';
import Loader from '../components/Loader';

const MandateEditForm = ({ iri, handleCloseModal }) => {

    const { isLoading, data } = useGetIRI(iri)
    const { mutate, isLoading: isPending, isSuccess } = usePutData()

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: data,
        resolver: yupResolver(validationSchema)
    })


    // Case update
    useEffect(() => {
        if (data) {
            reset(data)
        }
    }, [isLoading])


    const onSubmit = form => {
        mutate(form)
    }

    useEffect(() => {
        if (isSuccess) handleCloseModal()
    }, [isSuccess])


    if (isLoading) return <Loader />

    return (
        <Form onSubmit={handleSubmit(onSubmit)}
            isLoading={isSubmitting || isPending}
            isDisabled={isSubmitting || isPending}
            errors={errors}
        >
            <MandatePatientFields
                name="content[patient]"
                register={register}
                errors={errors}
            />
            <MandateServiceFields
                name="content[service]"
                register={register}
                errors={errors}
            />
        </Form>
    )

}

export default MandateEditForm