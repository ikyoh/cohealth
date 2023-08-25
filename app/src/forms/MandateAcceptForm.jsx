import React, { useEffect } from 'react'
import { useGetIRI, usePutData } from '../queryHooks/useMandate';
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import { yupResolver } from '@hookform/resolvers/yup';
import { mandateUserIRI as validationSchema } from '../utils/validationSchemas';
import uuid from 'react-uuid';
import Loader from '../components/Loader';

const MandateAcceptForm = ({ iri, handleCloseModal }) => {

    const { isLoading: isLoading, data, isError, error } = useGetIRI(iri)
    const { mutate: putData } = usePutData()

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {},
        resolver: yupResolver(validationSchema)
    })


    useEffect(() => {
        if (data && !isLoading) {
            reset({ id: data.id })
        }
    }, [isLoading, data])

    const onSubmit = form => {
        putData(form)
        handleCloseModal()
    }


    if (isLoading) return <Loader />
    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                className="p-5"
            >

                <p>
                    Patient : {data.content.patient.lastname} {data.content.patient.firstname}
                </p>
                <p>
                    Date de prise en charge : {data.content.service.beginAt}
                </p>
                <p>
                    Detail du mandat : {data.content.service.description}
                </p>

            </Form>
        </>
    )

}

export default MandateAcceptForm