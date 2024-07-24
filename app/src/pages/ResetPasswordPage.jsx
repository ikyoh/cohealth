import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import Form from "../components/form/form/Form";
import { FormInput } from "../components/form/input/FormInput";
//import { request } from '../utils/axios.utils'
import { API_PASSWORD, API_URL } from "../config/api.config";

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [setSubmitting] = useState(false);
    const [userToken, setUserToken] = useState(false);

    useEffect(() => {
        const fetchToken = async () => {
            const tokenContent = await axios.get(
                API_URL + API_PASSWORD + token
            );
            setUserToken(tokenContent.data);
        };
        fetchToken();
        // eslint-disable-next-line
    }, []);

    const validationSchema = yup.object({
        password: yup
            .string()
            .required("Mot de passe obligatoire")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                "Doit contenir 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial ! @ # % & *"
            ),
        passwordConfirmation: yup
            .string()
            .oneOf(
                [yup.ref("password"), null],
                "Le mots de passe ne correspondent pas"
            ),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading, isSubmitting },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (form) => {
        setSubmitting(true);
        submitPassword(form);
    };

    const submitPassword = async (form) => {
        try {
            const response = await axios.post(
                API_URL + API_PASSWORD + token,
                form
            );
            if (response.status === 204) {
                navigate("/login", {
                    state: {
                        login: userToken.user.email,
                        password: form.password,
                    },
                });
            }
        } catch (error) {
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
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting}
                    className="flex flex-col gap-5 items-center"
                >
                    <FormInput
                        type="password"
                        name="password"
                        placeholder="8 caracères minimum"
                        label="Mot de passe"
                        error={errors["password"]}
                        register={register}
                        required
                    />
                    <FormInput
                        type="password"
                        name="passwordConfirmation"
                        placeholder="Confirmation"
                        label="Confirmation"
                        error={errors["passwordConfirmation"]}
                        register={register}
                        required
                    />
                    <div className="text-sm text-medium">
                        Pour la sécurité de vos données le mot de passe doit
                        contenir 8 caractères, une majuscule, une minuscule, un
                        chiffre et un caractère spécial ! @ # % & *
                    </div>
                    <div className="mt-6">
                        {/* <FormSubmitButton label='valider' isLoading={submitting || !userToken} isDisabled={submitting || !userToken} /> */}
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
