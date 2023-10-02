import React, { useEffect, useState } from 'react'
import { useGetIRI, usePostData, usePutData } from '../queryHooks/useMandate';
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import Form from "../components/form/form/Form";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { mandatePatient as mandatePatientSchema } from '../utils/validationSchemas';
import uuid from 'react-uuid'

import MandatePatientFields from '../fields/MandatePatientFields';
import MandateServiceFields from '../fields/MandateServiceFields';

const MandateForm = ({ iri, handleCloseModal }) => {

    const { isLoading: isLoadingData, data, isError, error } = useGetIRI(iri)
    const { mutate: postData, isLoading: isPosting, isSuccess } = usePostData()
    const { mutate: putData } = usePutData()

    const [currentStep, setCurrentStep] = useState(1)

    const handleNextStep = async () => {
        const isStepValid = await trigger();
        if (isStepValid) {
            setCurrentStep(cur => cur + 1)
        }
    }

    const handlePrevStep = () => {
        setCurrentStep(cur => cur - 1)
    }

    const validationSchema = {
        1: Yup.object({ patient: mandatePatientSchema }),
        2: Yup.object()
    }


    const methods = useForm({
        shouldUnregister: false,
        defaultValues: {
            patient: { canton: "Genève" },
            services: [{ category: "Soins infirmiers" }]
        },
        resolver: yupResolver(validationSchema[currentStep]),
        mode: "onChange",
    });

    const { register, handleSubmit, reset, watch, control, setValue, trigger, formState: { errors, isSubmitting } } = methods;


    const { fields, append, remove } = useFieldArray({
        control,
        name: "services"
    })

    // Case update
    useEffect(() => {
        if (iri && data) {
            console.log('data', data)
            reset(data.content)
        }
    }, [isLoadingData, data])

    const onSubmit = async (form) => {

        const groupingId = uuid()

        await form.services.forEach(async service => {
            let _form = {
                groupingId: groupingId,
                patient: form.patient,
                service: service,
            }
            await postData(_form)
        })

        handleCloseModal()
    }

    return (
        <>
            <FormProvider {...methods}>
                <Form onSubmit={handleSubmit(onSubmit)}
                    steps={2}
                    handleNextStep={handleNextStep}
                    handlePrevStep={handlePrevStep}
                    currentStep={currentStep}
                    isLoading={isSubmitting || isPosting}
                    isDisabled={isSubmitting || isPosting}
                    errors={errors}
                >

                    {currentStep === 1 &&
                        <MandatePatientFields register={register} errors={errors} name="patient" />
                    }
                    {currentStep === 2 &&
                        <>

                            <ul>
                                {fields.map((item, index) => {
                                    return (
                                        <li key={item.id} className="flex flex-col gap-3">
                                            {fields.length !== 1 &&
                                                <button
                                                    type='button'
                                                    className='btn'
                                                    onClick={() => remove(index)}
                                                >
                                                    Retirer la prestation
                                                </button>
                                            }
                                            <MandateServiceFields
                                                name={`services.${index}`}
                                                register={register}
                                                errors={errors}
                                            />

                                        </li>
                                    )
                                })}
                            </ul>

                            <button
                                type='button'
                                className='btn'
                                onClick={() => {
                                    append({
                                        // details: { nouveloccupant: "" },
                                        // services: property.services.reduce((acc, item) => {
                                        //     return {
                                        //         ...acc,
                                        //         [item]: item,
                                        //     }
                                        // }, {})
                                    },
                                        { focusName: `services.${fields.length}.category` })
                                }}
                            >
                                AJOUTER
                            </button>
                        </>
                    }
                </Form>
            </FormProvider>
        </>
    )

}

export default MandateForm