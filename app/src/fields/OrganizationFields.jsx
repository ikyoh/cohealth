import React from "react";
import { FormInput } from "../components/form/input/FormInput";
// import { FormSelect } from '../components/form/select/FormSelect'
// import { FormTextarea } from '../components/form/textarea/FormTextarea'
// import { FormCheckBox } from '../components/form/checkbox/FormCheckbox'
// import { cantons } from '../utils/arrays';

const OrganizationFields = ({
    name,
    errors,
    register,
    registration = false,
}) => {
    return (
        <>
            <FormInput
                type="text"
                name={name ? name + ".organization" : "organization"}
                label="Organisation"
                placeholder="Nom / Raison sociale"
                error={
                    name && errors[name]
                        ? errors[name]["organization"]
                        : errors["organization"]
                }
                register={register}
                required={true}
            />
            <FormInput
                type="text"
                name={name ? name + ".phone" : "phone"}
                label="Téléphone"
                placeholder="Numéro de téléphone"
                error={
                    name && errors[name]
                        ? errors[name]["phone"]
                        : errors["phone"]
                }
                register={register}
                required={true}
            />
            <FormInput
                type="text"
                name={name ? name + ".email" : "email"}
                label="Email"
                placeholder="Adresse Email"
                error={
                    name && errors[name]
                        ? errors[name]["email"]
                        : errors["email"]
                }
                register={register}
                required={true}
            />
            {registration && (
                <>
                    <FormInput
                        type="text"
                        name={name ? name + ".fax" : "fax"}
                        label="Fax"
                        error={
                            name && errors[name]
                                ? errors[name]["fax"]
                                : errors["fax"]
                        }
                        register={register}
                        required={false}
                    />
                    <FormInput
                        type="text"
                        name={name ? name + ".address1" : "address1"}
                        label="Adresse"
                        error={
                            name && errors[name]
                                ? errors[name]["address1"]
                                : errors["address1"]
                        }
                        register={register}
                        required={false}
                    />
                    <FormInput
                        type="text"
                        name={name ? name + ".address2" : "address2"}
                        label="Complément d'adresse"
                        error={
                            name && errors[name]
                                ? errors[name]["address2"]
                                : errors["address2"]
                        }
                        register={register}
                        required={false}
                    />
                    <FormInput
                        type="text"
                        name={name ? name + ".npa" : "npa"}
                        label="Code postal"
                        error={
                            name && errors[name]
                                ? errors[name]["npa"]
                                : errors["npa"]
                        }
                        register={register}
                        required={false}
                    />
                    <FormInput
                        type="text"
                        name={name ? name + ".city" : "city"}
                        label="Ville"
                        error={
                            name && errors[name]
                                ? errors[name]["city"]
                                : errors["city"]
                        }
                        register={register}
                        required={false}
                    />
                </>
            )}
            <FormInput
                type="text"
                name={name ? name + ".rcc" : "rcc"}
                label="Numéro RCC"
                placeholder="Registre des codes créanciers"
                error={
                    name && errors[name] ? errors[name]["rcc"] : errors["rcc"]
                }
                register={register}
                required={false}
            />
            <FormInput
                type="text"
                name={name ? name + ".gln" : "gln"}
                label="Numéro GLN"
                placeholder="Numéro d'identification globale"
                error={
                    name && errors[name] ? errors[name]["gln"] : errors["gln"]
                }
                register={register}
                required={false}
            />
        </>
    );
};

export default OrganizationFields;
