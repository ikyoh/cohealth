import React, { useEffect } from 'react'
import { useGetIRI, usePostData, usePutData } from '../queryHooks/useDocument'
import { useForm } from "react-hook-form"
import Form from "../components/form/form/Form"
import { FormFile } from "../components/form/file/FormFile"
import { FormSelect } from '../components/form/select/FormSelect'
import { FormTextarea } from '../components/form/textarea/FormTextarea'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { documentCategories } from '../utils/arrays'

const DocumentForm = ({ iri, missionID, handleCloseModal }) => {

    const { isLoading: isLoadingData, data, isError, error } = useGetIRI(iri)
    const { mutate: postData, isLoading: isPosting, isSuccess } = usePostData()
    const { mutate: putData } = usePutData()

    const validationSchema = Yup.object({
        type: Yup.string().required('Champ obligatoire'),
        file: Yup.mixed().required('Fichier obligatoire'),
    })

    const updateValidationSchema = Yup.object({
        type: Yup.string().required('Champ obligatoire'),
    })

    const { register, handleSubmit, reset, formState: { errors, isPostingisSubmitting } } = useForm({
        resolver: yupResolver(!iri ? validationSchema : updateValidationSchema),
        defaultValues: {
            file: null,
            mission: missionID
        }
    })

    // Case update
    useEffect(() => {
        if (iri && data) {
            reset(data)
        }
    }, [isLoadingData, data])

    const onSubmit = async form => {
        if (!iri) {
            await postData(form)
        }
        else {
            const _form = { ...form }
            delete _form.mission
            delete _form.user
            delete _form.contentUrl
            delete _form.filePath
            delete _form.createdAt
            await putData(_form)
        }
        handleCloseModal()
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}
            isLoading={isPosting}
            isDisabled={isPosting}
            className="p-5"
        >
            <FormSelect
                type="text"
                name="type"
                label="Catégorie"
                error={errors['type']}
                register={register}
                required={true}
            >
                <option value="">Choisir une catégorie</option>
                {documentCategories.map((cat) =>
                    <option key={cat} value={cat}>{cat}</option>
                )}
            </FormSelect>
            {!iri &&
                <FormFile
                    type="text"
                    name="file"
                    label="Catégorie"
                    error={errors['file']}
                    register={register}
                    required={true}
                />
            }
            <FormTextarea
                name="comment"
                label="Commentaire"
                error={errors['comment']}
                register={register}
                required={false}
                rows={5}
            />
        </Form>
    )

}

export default DocumentForm