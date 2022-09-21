import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { addPrescription } from "../features/missions/missionsSlice"
import { updatePrescription } from '../features/prescriptions/prescriptionsSlice'
import ServicesContainer from '../features/services/ServicesContainer'
import { Formik, Field, Form, FieldArray, ErrorMessage, useFormikContext, useField } from 'formik'
import * as Yup from 'yup'
import * as dayjs from 'dayjs'
import { nanoid } from "@reduxjs/toolkit";
import { services_family } from '../utils/arrays'
import FormTextarea from '../components/forms/FormTextarea'

import FormDatePicker from '../components/forms/FormDatePicker'

import { VscChevronDown, VscClose, VscChevronUp } from 'react-icons/vsc'


const OpasForm = ({ event = false, beginAt = false, mission = false, endAt = false, handleCloseModal }) => {

    const dispatch = useDispatch()

    var weekOfYear = require('dayjs/plugin/weekOfYear')
    dayjs.extend(weekOfYear)

    const [data, setData] = useState({
        type: "opas",
        status: "brouillon",
        mission: mission,
        content:
        {
            beginAt: dayjs(beginAt).toDate(),
            endAt: dayjs(endAt).toDate(),
            type: 'Prescription initiale',
            case: 'maladie',
            disability: 'non',
            diagnosticNurse: '',
            diagnosticDoctor: '',
            services: [],
            totalA: 0,
            totalB: 0,
            totalC: 0,
            totalN: 0,
            coworkers: []
        }
    })

    useEffect(() => {
        if (event) {
            let beginAt = dayjs(event.content.beginAt).toDate()
            let endAt = dayjs(event.content.endAt).toDate()
            let content = { ...event.content, beginAt: beginAt, endAt: endAt }
            setData({ ...event, content, content: content })
        }
    }, [])

    const [currentStep, setCurrentStep] = useState(0)

    const makeRequest = (formData) => {
        console.log('formData', formData)
        if (!event) dispatch(addPrescription(formData))
        else dispatch(updatePrescription(formData))
        handleCloseModal()
    }

    const handleNextStep = (newData, final = false) => {

        setData((prev) => ({ ...prev, ...newData }))

        if (final) {
            makeRequest(newData)
            return
        }

        setCurrentStep((prev) => prev + 1)
    }

    const handlePrevStep = (newData) => {
        setData((prev) => ({ ...prev, ...newData }))
        setCurrentStep((prev) => prev - 1)
    }

    const calcNumberofDays = () => {
        const date1 = dayjs(beginAt)
        const date2 = dayjs(endAt)
        console.log('jours', date2.diff(date1, 'days'))
        return (date2.diff(date1, 'days'))
    }

    const calcNumberWeeks = () => {
        const date1 = dayjs(beginAt).week();
        const date2 = dayjs(endAt).week();
        console.log('semaines', date2 - date1 + 1)
        return (date2 - date1 + 1)
    }

    const calcNumberMonths = () => {
        const date1 = dayjs(beginAt).month()
        const date2 = dayjs(endAt).month()
        console.log('mois', date2 - date1 + 1)
        return (date2 - date1 + 1)
    }


    const Times = () => {

        const formikProps = useFormikContext()

        // category = "A" || "B" || "C" || "N"
        const calcABCN = (category) => {

            let filteredServices = formikProps.values.content.services.filter(service => service.category === category)

            let total = filteredServices.reduce((acc, curr) => {

                if (curr.periodicity === "par période")
                    return Number(curr.time) * Number(curr.frequency) + acc
                if (curr.periodicity === "par jour")
                    return Number(curr.time) * Number(curr.frequency) * calcNumberofDays() + acc
                if (curr.periodicity === "par semaine")
                    return Number(curr.time) * Number(curr.frequency) * calcNumberWeeks() + acc
                if (curr.periodicity === "par mois")
                    return Number(curr.time) * Number(curr.frequency) * calcNumberMonths() + acc

            }, 0)

            return total

        }

        useEffect(() => {
            formikProps.setFieldValue("content.totalA", calcABCN("A"))
            formikProps.setFieldValue("content.totalB", calcABCN("B"))
            formikProps.setFieldValue("content.totalC", calcABCN("C"))
            formikProps.setFieldValue("content.totalN", calcABCN("N"))
        }, [formikProps.values.content.services])


        return (
            <div className='flex space-x-1'>
                <div>
                    A : {formikProps.values.content.totalA} m.
                    {formikProps.values.content.totalA !== 0 &&
                        " (" + Math.round(formikProps.values.content.totalA * 100 / 60) / 100 + "h)"
                    }
                </div>
                <div>
                    B : {formikProps.values.content.totalB} m.
                    {formikProps.values.content.totalB !== 0 &&
                        " (" + Math.round(formikProps.values.content.totalB * 100 / 60) / 100 + "h)"
                    }
                </div>
                <div>
                    C : {formikProps.values.content.totalC} m.
                    {formikProps.values.content.totalC !== 0 &&
                        " (" + Math.round(formikProps.values.content.totalC * 100 / 60) / 100 + "h)"
                    }
                </div>
                {/* <div>
                    N : {formikProps.values.content.totalN}
                </div> */}
            </div>
        )
    }

    const validationSchemaStep1 = Yup.object({
        // beginAt: Yup.string().required('Champ obligatoire'),
        //endAt: Yup.string().required('Champ obligatoire'),
    })

    const validationSchemaStep2 = Yup.object({
        // company: Yup.string().required('Champ obligatoire'),
        // type: Yup.string().required('Champ obligatoire'),
    })

    const StepBar = () => {

        const formikProps = useFormikContext()

        return (
            <div className="flex justify-between items-center space-x-3 p-3 border-b">
                <div className="flex items-center space-x-3">
                    <div className={`rounded-full h-10 w-10 flex items-center justify-center border border-slate-200 ${currentStep === 0 && 'border-action bg-action'}  ${currentStep > 0 ? 'bg-cyan-100' : ''}`}>1</div>
                    <div>Informations</div>
                    <div className='text-slate-500'>
                        {formikProps.values.content.beginAt &&
                            "du " + dayjs(formikProps.values.content.beginAt).format('dddd D MMMM')
                        }
                        {formikProps.values.content.endAt &&
                            " au " + dayjs(formikProps.values.content.endAt).format('dddd D MMMM')
                        }
                        {formikProps.values.content.endAt &&
                            " (" + dayjs(formikProps.values.content.endAt).diff(dayjs(formikProps.values.content.beginAt), 'days') + " jours)"
                        }
                    </div>
                </div>
                <div className={`flex-1 ${currentStep > 0 ? 'bg-action' : 'bg-slate-200'}`} style={{ height: 1 }}>
                </div>
                <div className="flex items-center space-x-3">
                    <div className={`rounded-full h-10 w-10 flex items-center justify-center border border-slate-200 ${currentStep === 1 && 'border-action bg-action'}  ${currentStep > 1 ? 'bg-cyan-100' : ''}`}>2</div>
                    <div>Prescriptions</div>
                    <div className='text-slate-500'>
                        <Times />
                    </div>
                </div>
            </div>
        )
    }



    const StepOne = (props) => {

        const handleSubmit = (values) => {
            props.next(values)
        }

        return (
            <Formik
                validationSchema={validationSchemaStep1}
                initialValues={props.data}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <>
                        <Form className='form-body'>
                            <StepBar />
                            <div className="form-content flex flex-col space-y-5">

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                    <FormDatePicker name="content.beginAt" label="Début d'OPAS" />
                                    <FormDatePicker name="content.endAt" label="Fin d'OPAS" />
                                </div>

                                <div className='bg-gray-100 p-2 rounded flex items-center gap-5 text-sm'>
                                    <div>
                                        Prescription médicale :
                                    </div>
                                    <label className={`flex items-center gap-3 ${values.content.type === 'Prescription initiale' && 'text-action'}`}>
                                        <Field type="radio" name="content.type" value="Prescription initiale" className='w-5 h-5' />
                                        Prescription initiale
                                    </label>
                                    <label className={`flex items-center gap-3 ${values.content.type === 'Reévaluation' && 'text-action'}`}>
                                        <Field type="radio" name="content.type" value="Reévaluation" className='w-5 h-5' />
                                        Reévaluation
                                    </label>
                                    <label className={`flex items-center gap-3 ${values.content.type === "Complément d'OPAS" && 'text-action'}`}>
                                        <Field type="radio" name="content.type" value="Complément d'OPAS" className='w-5 h-5' />
                                        Complément d'OPAS
                                    </label>
                                </div>

                                <div className='bg-gray-100 p-2 rounded flex items-center gap-5 text-sm'>
                                    <div>
                                        Cas :
                                    </div>
                                    <label className={`flex items-center gap-3 ${values.content.case === 'maladie' && 'text-action'}`}>
                                        <Field type="radio" name="content.case" value="maladie" className='w-5 h-5' />
                                        Maladie
                                    </label>
                                    <label className={`flex items-center gap-3 ${values.content.case === 'accident' && 'text-action'}`}>
                                        <Field type="radio" name="content.case" value="accident" className='w-5 h-5' />
                                        Accident
                                    </label>
                                    <label className={`flex items-center gap-3 ${values.content.case === "invalidité" && 'text-action'}`}>
                                        <Field type="radio" name="content.case" value="invalidité" className='w-5 h-5' />
                                        Invalidité
                                    </label>
                                </div>

                                <div className='bg-gray-100 p-2 rounded flex items-center gap-5 text-sm'>
                                    <div>
                                        Allocation pour impotent :
                                    </div>
                                    <label className={`flex items-center gap-3 ${values.content.disability === 'non' && 'text-action'}`}>
                                        <Field type="radio" name="content.disability" value="non" className='w-5 h-5' />
                                        Non
                                    </label>
                                    <label className={`flex items-center gap-3 ${values.content.disability === 'oui' && 'text-action'}`}>
                                        <Field type="radio" name="content.disability" value='oui' className='w-5 h-5' />
                                        Oui
                                    </label>
                                </div>

                                <div>
                                    <FormTextarea
                                        name="content.diagnosticNurse"
                                        label="Diagnostic infirmier"
                                        placeholder="Votre diagnostic"
                                    />
                                </div>
                            </div>
                            <div className="form-footer">
                                <button className='button-submit' type="submit">
                                    Suivant
                                </button>
                            </div>
                        </Form>
                    </>
                )}
            </Formik>
        )

    }

    const StepTwo = (props) => {

        const [search, setSearch] = useState('Alimentation et diètes')

        const handleSubmit = (values) => {
            props.next(values, true)
        }

        const Service = ({ item }) => {

            const formikProps = useFormikContext()

            const handleAddService = (event) => {
                let services = [...formikProps.values.content.services]
                services.unshift({ ...event, name: nanoid(), frequency: 1, periodicity: "par période" })
                formikProps.setFieldValue("content.services", services)
            }

            const [showDescription, setShowDescription] = useState(false)

            return (
                <div className='mb-5'>
                    <div className='w-full flex space-x-3'>
                        <div className={`cat${item.category}`}>{item.category}</div>
                        <div className='w-full'>
                            <div className='cursor-pointer' onClick={() => handleAddService(item)}>
                                {item.title}
                            </div>
                            {showDescription &&
                                <div className='text-slate-500 py-3'
                                    onClick={() => setShowDescription(!showDescription)}
                                >
                                    {item.description}
                                </div>}
                        </div>
                        <div>
                            <div className='hover:bg-slate-200 p-2 rounded-full relative -top-1' onClick={() => setShowDescription(!showDescription)}>
                                {showDescription
                                    ? <VscChevronUp />
                                    : <VscChevronDown />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }


        return (

            <Formik
                validationSchema={validationSchemaStep2}
                initialValues={props.data}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <>
                        <Form className='form-body'>
                            <StepBar />
                            <div className="form-content-noscroll" style={{ paddingTop: 0 }}>
                                <div className="flex h-full">
                                    <div className='overflow-y-scroll w-full px-3 text-sm'>
                                        <div className='sticky top-0 bg-white py-3 font-semibold'>
                                            CATÉGORIES
                                        </div>
                                        {services_family.map(item =>
                                            <div
                                                key={nanoid()}
                                                value={item}
                                                className={`my-3 px-3 py-2 cursor-pointer hover:bg-slate-400 ${item === search && 'bg-action'}`}
                                                onClick={() => setSearch(item)}
                                            >
                                                {item}
                                            </div>
                                        )}
                                    </div>
                                    <div className='overflow-y-scroll w-full px-3 text-sm'>
                                        <div className='sticky top-0 bg-white py-3 flex justify-between z-10'>
                                            <div className='font-semibold'>
                                                SOINS
                                            </div>
                                        </div>
                                        <div className='my-3'>
                                            <ServicesContainer search={search}>
                                                <Service />
                                            </ServicesContainer>
                                        </div>
                                    </div>
                                    <div className='overflow-y-scroll w-full px-3 text-sm'>
                                        <div className='sticky top-0 bg-white py-3 flex justify-between z-10'>
                                            <div className='font-semibold'>
                                                PRESCRIPTIONS ({values.content.services.length})
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <FieldArray name="content.services">
                                                    {({ insert, remove, push }) => (
                                                        <div>
                                                            {values.content.services.length > 0 &&
                                                                values.content.services.map((service, index) => (
                                                                    <div className="border-b pb-5" key={index}>
                                                                        <div className='my-3'>

                                                                            <div className='w-full flex space-x-3'>
                                                                                <div className={`cat${service.category}`}>{service.category}</div>
                                                                                <div className='w-full'>
                                                                                    <div>
                                                                                        {service.title}
                                                                                    </div>
                                                                                    <div className='mt-5 flex flex-col   space-y-3'>
                                                                                        <div className='grid grid-cols-2'>
                                                                                            <div>
                                                                                                Durée
                                                                                            </div>
                                                                                            <Field
                                                                                                name={`content.services.${index}.time`}
                                                                                                placeholder=""
                                                                                                type="text"
                                                                                                className="border px-2 py-1 rounded-sm"
                                                                                            />
                                                                                        </div>
                                                                                        <div className='grid grid-cols-2'>
                                                                                            <div>
                                                                                                Fréquence
                                                                                            </div>
                                                                                            <Field
                                                                                                name={`content.services.${index}.frequency`}
                                                                                                className="border px-2 py-1 rounded-sm"
                                                                                            />
                                                                                        </div>
                                                                                        <div className='grid grid-cols-2'>
                                                                                            <div>
                                                                                                Période
                                                                                            </div>
                                                                                            <Field
                                                                                                component="select"
                                                                                                name={`content.services.${index}.periodicity`}
                                                                                                className="border px-2 py-1 rounded-sm"
                                                                                            >
                                                                                                <option value="par période">par période</option>
                                                                                                <option value="par jour">par jour</option>
                                                                                                <option value="par semaine">par semaine</option>
                                                                                                <option value="par mois">par mois</option>
                                                                                            </Field>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="">
                                                                                        <ErrorMessage
                                                                                            name={`content.services.${index}.name`}
                                                                                            component="div"
                                                                                            className="field-error"
                                                                                        />

                                                                                        <ErrorMessage
                                                                                            name={`content.services.${index}.frequency`}
                                                                                            component="div"
                                                                                            className="field-error"
                                                                                        />

                                                                                        <ErrorMessage
                                                                                            name={`content.services.${index}.periodicity`}
                                                                                            component="div"
                                                                                            className="field-error"
                                                                                        />
                                                                                    </div>


                                                                                </div>
                                                                                <div>
                                                                                    <div className='hover:bg-slate-200 p-2 rounded-full relative -top-1' onClick={() => remove(index)}>
                                                                                        <VscClose />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                ))}

                                                        </div>
                                                    )}
                                                </FieldArray>



                                            </div>
                                        </div>
                                        <div className=''>





                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-footer">
                                <button className='button-submit' type="button" onClick={() => props.prev(values)}>
                                    Précèdent
                                </button>
                                <button type="submit" className='button-submit'>Valider</button>
                            </div>
                        </Form>
                    </>
                )}
            </Formik>

        )
    }

    const steps = [
        <StepOne next={handleNextStep} data={data} />,
        <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />
    ]

    return (
        <>
            {steps[currentStep]}
        </>
    )

}

export default OpasForm