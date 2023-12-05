import React, { useEffect } from 'react'
import { useGetIRI, usePutData } from '../queryHooks/usePrescription';
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import { yupResolver } from '@hookform/resolvers/yup';
import { FormTextarea } from '../components/form/textarea/FormTextarea'
import { FormCheckbox } from '../components/form/checkbox/FormCheckbox'
import dayjs from 'dayjs';


const OpasDoctorValidationForm = ({ iri, handleCloseModal }) => {

 console.log('iri', iri)

    const { isLoading: isLoadingData, data, isError, error } = useGetIRI(iri)
    const { mutate: putData } = usePutData()

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        //resolver: yupResolver(validationSchema),
        //defaultValues: {signedAt : dayjs() }
    })

    useEffect(() => {
        if (iri && data) {
            reset({...data, signedAt : dayjs(), status : "validé par le médecin"})
        }
    }, [isLoadingData, data])

    const onSubmit = form => {
        console.log('form', form)
        putData(form)
        handleCloseModal()
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}
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
                    error={errors['isDoctorSigned']}
                />
            </Form>
        </>
    )

}

export default OpasDoctorValidationForm