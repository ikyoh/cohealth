import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/forms/FormInput';
import FormCheckbox from '../components/forms/FormCheckbox';
import FormSelect from '../components/forms/FormSelect';

const UserForm = ({ event = false, handleCloseModal }) => {


    const [initialValues, setInitialValues] = useState({
        roles: [],
        firstname: '',
        lastname: '',
        organization: '',
        phone: '',
        email: '',
        fax: '',
        mobile: '',
        npa: '',
        city: '',
        canton: '',
        address1: '',
        address2: '',
        gln: '',
        rcc: '',
        iban: '',
        isActive: true,
    })

    const validationSchema = Yup.object({
        firstname: Yup.string().required('Champ obligatoire'),
    })

    useEffect(() => {
        if (event) setInitialValues(event)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>UserForm</div>
    )

}

export default UserForm