import React, { useEffect } from 'react'
import { usePostData, usePutData, useGetDoctorComment, useGetAssuranceComment } from '../queryHooks/useComment';
import { useGetCurrentAccount } from '../queryHooks/useAccount';
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { FormTextarea } from '../components/form/textarea/FormTextarea'
import { URL } from '../features/apiConfig';


const CommentForm = ({ iri, doctor, assurance }) => {
    
    const { isLoading: isLoadingAccount, data: account } = useGetCurrentAccount()
    const { isLoading: isLoadingDoctor, data: doctorComment, } = useGetDoctorComment(doctor ? doctor  : null)
    const { isLoading: isLoadingAssurance, data: assuranceComment, } = useGetAssuranceComment(assurance ? assurance  : null)


    const { mutate: postData, isLoading: isPosting, isSuccess } = usePostData()
    const { mutate: putData } = usePutData()

    const validationSchema = Yup.object({
        content: Yup.string().required('Champ obligatoire'),
    })

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: { assurance: assurance, doctor: doctor }
    })


    // Case update
    useEffect(() => {
        if (doctorComment) {
            reset(doctorComment)
        }
        if (assuranceComment) {
            reset(assuranceComment)
        }
    }, [isLoadingDoctor, doctorComment, assuranceComment])

    const onSubmit = form => {
        if (!form["@id"])
            postData(form)
        else {
            putData(form)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className='m-3 p-5 bg-gray-100 text-center rounded'
        >
            <div className='flex gap-2 items-center'>
                {account && account.avatar
                    ? <img src={URL + account.avatar.contentUrl} className='rounded-full object-cover h-10 w-10' alt="profil" />
                    : <div className='rounded-full flex items-center h-10 justify-center w-10 bg-info'>
                        {account.firstname && account.firstname.charAt(0)}
                        {account.lastname && account.lastname.charAt(0)}
                        {account.organization && account.organization.charAt(0).toUpperCase()}
                    </div>
                }
                Commentaire personnel
            </div>
            <FormTextarea
                name='content'
                error={errors['content']}
                register={register}
            />
            <button type='submit' className='btn btn-wide btn-primary rounded-full'>
                Valider mon commentaire
            </button>
        </form>
    )

}

export default CommentForm