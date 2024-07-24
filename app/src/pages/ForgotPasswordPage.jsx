import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Form from "../components/form/form/Form";
import { FormInput } from "../components/form/input/FormInput";
import { API_PASSWORD } from "../config/api.config";
import { request } from "../utils/axios.utils";
const ForgotPasswordPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const validationSchema = yup.object({
        email: yup
            .string()
            .email("Email non valide")
            .required("Champ obligatoire"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitted },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (form) => {
        setSubmitting(true);
        submitPassword(form);
    };

    const submitPassword = async (form) => {
        try {
            await request({ url: API_PASSWORD, method: "post", data: form });
            setSubmitting(false);
            setSubmitted(true);
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    return (
        <div className="container max-w-xl p-5">
            <div className="border rounded bg-white p-5">
                <div className="flex justify-center my-5 text-2xl text-bold">
                    Réinitialiser mon mot de passe
                </div>
                <div className="h-1 mx-auto bg-info w-3/6 md:w-2/6 mb-6 py-0 rounded-full"></div>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    isLoading={submitting}
                    isDisabled={isSubmitted || isSubmitting}
                >
                    {!submitted ? (
                        <>
                            <FormInput
                                type="text"
                                name="email"
                                label="Adresse email"
                                placeholder="Adresse email"
                                errors={errors}
                                register={register}
                                required
                            />
                            <div className="text-sm text-medium">
                                Veuillez renseigner l'adresse email associée à
                                votre compte pour réinitialiser votre mot de
                                passe.
                            </div>
                        </>
                    ) : (
                        <div className="text-sm text-medium text-center py-12">
                            Veuillez consulter votre boîte mail pour poursuivre
                            la procèdure.
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
