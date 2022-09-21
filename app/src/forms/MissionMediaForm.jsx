import React from 'react'
import { useDispatch } from "react-redux";
import { addDocument } from "../features/missions/missionsSlice";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormSelect from "../components/forms/FormSelect"
import FormInput from "../components/forms/FormInput"
import { MediaCategories } from '../utils/arrays';

const MissionMediaForm = ({ handleCloseModal, mission }) => {

    console.log('mission', mission)

    const dispatch = useDispatch()

    const initialValues = {
        type: 'opas',
        file: '',
        comment :'',
        mission : mission
    }

    const validationSchema = Yup.object({
        file: Yup.string().required('Champ obligatoire'),
    })

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                dispatch(addDocument(values))
                setSubmitting(false)
                handleCloseModal()
            }}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form className='form-body'>
                    <div className="form-content">
                        <div className='grid gap-x-10 gap-y-5 grid-cols-1 md:grid-cols-1'>
                            <FormSelect name="type" label="Catégorie" required={true}>
                                {MediaCategories.map((cat) =>
                                    <option key={cat} value={cat}>{cat}</option>
                                )}
                            </FormSelect>
                            <FormInput name="comment" label="Commentaire" />
                            <input
                                name='file'
                                type='file'
                                onChange={(event) => setFieldValue("file", event.target.files[0])}
                            />
                        </div>
                    </div>
                    <div className="form-footer">
                        <button type="submit" className='button-submit' disabled={isSubmitting}>Valider</button>
                    </div>
                </Form>
            )}
        </Formik>
    )

}

export default MissionMediaForm