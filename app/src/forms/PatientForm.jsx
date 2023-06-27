import React, { useState, useEffect } from 'react'
import { useGetIRI, usePostData, usePutData } from '../queryHooks/usePatient'
import { useGetAllDatas as useDoctors } from '../queryHooks/useDoctor'
import { useForm } from "react-hook-form"
import Form from "../components/form/form/Form"
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { patient } from '../utils/arrays'
import { FormSelectDoctorIRI } from '../components/form/selectDoctorIRI/FormSelectDoctorIRI'
import { FormSelectAssuranceIRI } from '../components/form/selectAssuranceIRI/FormSelectAssuranceIRI'
import PatientFields from '../fields/PatientFields'
import AssuranceFields from '../fields/AssuranceFields'
import DoctorFields from '../fields/DoctorFields'
import { useSearch } from '../hooks/useSearch'
import AddButton from '../components/buttons/AddButton'
import { patient as patientSchema, doctorIRI as doctorIRISchema, doctor as doctorSchema, assuranceIRI as assuranceIRISchema, assurance as assuranceSchema } from '../utils/validationSchemas'
import Loader from '../components/Loader'

const PatientForm = ({ iri, handleCloseModal, action = "patient" }) => {

    const [modalAction, setModalAction] = useState(action)
    const { isLoading, data, isError, error } = useGetIRI(iri)
    const { isLoading: isLoadingDoctors, data: doctors } = useDoctors('', 'fullname', 'asc', action === 'doctorIRI' ? true : false)
    const { mutate: postData, isLoading: isPosting, isSuccess } = usePostData()
    const { mutate: putData } = usePutData(iri)

    const { searchValue, searchbar } = useSearch("")

    const validationSchema = {
        patient: patientSchema,
        doctor: Yup.object({ doctor: doctorSchema }),
        assurance: assuranceSchema,
        doctorIRI: doctorIRISchema,
        assuranceIRI: assuranceIRISchema,
    }

    const { register, handleSubmit, setValue, reset, watch, control, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(validationSchema[modalAction]),
        defaultValues: patient
    })

    // Case update
    useEffect(() => {
        if (iri && data) {
            console.log('data', data)
            reset(data)
        }
    }, [isLoading, data])

    const onSubmit = form => {
        if (!iri)
            postData(form)
        else {
            putData(form)
        }
        handleCloseModal()
    }

    if (isLoading && iri) return <Loader />
    else return (
        <Form onSubmit={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
        >
            {modalAction === 'patient' &&
                <>
                    <PatientFields errors={errors} register={register} />
                </>
            }
            {modalAction === 'doctorIRI' &&
                <>
                    <div className='flex justify-between'>
                        {searchbar}
                        <AddButton onClick={() => setModalAction('doctor')} />
                    </div>
                    <FormSelectDoctorIRI watch={watch} setValue={setValue} searchValue={searchValue} />
                </>
            }
            {modalAction === 'doctor' &&
                <DoctorFields errors={errors} register={register} name="doctor" />
            }
            {modalAction === 'assuranceIRI' &&
                <>
                    <div className='flex justify-between'>
                        {searchbar}
                        <AddButton onClick={() => setModalAction('assurance')} />
                    </div>
                    <FormSelectAssuranceIRI watch={watch} setValue={setValue} searchValue={searchValue} />
                </>
            }
            {modalAction === 'assurance' &&
                <AssuranceFields errors={errors} register={register} name="assurance" />
            }
        </Form>
    )
}

export default PatientForm