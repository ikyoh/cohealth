import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, useFormikContext } from 'formik'
import * as Yup from 'yup'
import FormInput from '../components/forms/FormInput'
import axios from 'axios'
import { API_USERS } from '../features/apiConfig'
import { addPartner, selectAllPartners } from "../features/partners/partnersSlice";

const PartnerForm = ({ handleCloseModal }) => {

    const dispatch = useDispatch()

    const Partners = useSelector(selectAllPartners)

    let partners = Partners.reduce(function (acc, curr) {
        return [...acc, curr.partner];
    }, []);

    const initialValues = {
        rcc: '',
        partner: false,
        isFavorite: false
    }

    const [info, setInfo] = useState(false)

    const SelectPartner = () => {



        const [partner, setPartner] = useState(false)

        const { setFieldValue, values } = useFormikContext()

        useEffect(() => {

            if (values.rcc.length === 8) {

                axios.get(API_USERS + "?rcc=" + values.rcc)
                    .then(response => {
                        // handle success
                        if (response.data["hydra:member"].length > 0) {
                            setPartner(response.data["hydra:member"][0])
                        }
                        else setInfo("Aucun résultat")
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error)
                    })

            } else {
                setInfo(false)
                setPartner(false)
                setFieldValue("partner", false);
            }

        }, [values.rcc])

        useEffect(() => {
            let isPartner = partners.filter(f => f.rcc === partner.rcc)
            if (isPartner.length > 0) setInfo( partner.lastname + " "+ partner.firstname + " fait déjà parti de vos partenaires")


        }, [partner])


        if (partner && !info) return (
            <div className={`text-center p-3 rounded-sm cursor-pointer ${values.partner ? 'bg-action' : 'bg-gray-200'}`}
                onClick={() => setFieldValue("partner", partner['@id'])}>
                {partner.lastname.toUpperCase()} {partner.firstname}
            </div>
        )
        else return null

    }


    return (
        <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                dispatch(addPartner(values))
                setSubmitting(false)
                handleCloseModal()
            }}
        >
            {({ isSubmitting, setValues, values }) => (
                <Form className='form-body'>
                    <div className="form-content">
                        <div className='grid gap-y-5 grid-cols-1'>

                            <FormInput name="rcc" label="N° RCC" placeholder="" className="" />

                            {info &&
                                <div>{info}</div>
                            }

                            <SelectPartner />

                        </div>
                    </div>
                    <div className="form-footer">
                        <button type="submit" className='button-submit' disabled={isSubmitting || !values.partner}>Valider</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default PartnerForm