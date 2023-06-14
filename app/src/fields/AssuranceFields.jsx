import React from 'react'
import { FormInput } from "../components/form/input/FormInput";
import { FormSelect } from '../components/form/select/FormSelect';
import { assuranceCategories } from '../utils/arrays';


const AssuranceFields = ({ name, errors, register, watch }) => {

    const type = watch("type")

    return (
        <>
            <FormInput
                type="text"
                name={name ? name + ".company" : "company"}
                label="Assurance"
                placeholder="Nom de l'assurance"
                error={name && errors[name] ? errors[name]['company'] : errors['company']}
                register={register}
                required={true}
            />
            <FormInput
                type="text"
                name={name ? name + ".organization" : "organization"}
                label="Groupe"
                placeholder="Groupe"
                error={name && errors[name] ? errors[name]['organization'] : errors['organization']}
                register={register}
                required={false}
            />

            <FormSelect
                type="text"
                name={name ? name + ".type" : "type"}
                label="Catégorie"
                error={name && errors[name] ? errors[name]['type'] : errors['type']}
                register={register}
                required={true}
            >
                <option value="">Choisir une catégorie</option>
                {assuranceCategories.map(category =>
                    <option key={category} value={category}>{category}</option>
                )}
            </FormSelect>

            <FormInput
                type="text"
                name={name ? name + ".address1" : "address1"}
                label="Adresse"
                error={name && errors[name] ? errors[name]['address1'] : errors['address1']}
                register={register}
                required={false}
            />
            <FormInput
                type="text"
                name={name ? name + ".address2" : "address2"}
                label="Complement d'adresse"
                error={name && errors[name] ? errors[name]['category'] : errors['category']}
                register={register}
                required={false}
            />
            <FormInput
                type="text"
                name={name ? name + ".npa" : "npa"}
                label="Code postal"
                error={name && errors[name] ? errors[name]['npa'] : errors['npa']}
                register={register}
                required={false}
            />
            <FormInput
                type="text"
                name={name ? name + ".city" : "city"}
                label="Ville"
                error={name && errors[name] ? errors[name]['city'] : errors['city']}
                register={register}
                required={false}
            />
            <FormInput
                type="text"
                name={name ? name + ".phone" : "phone"}
                label="Téléphone"
                error={name && errors[name] ? errors[name]['phone'] : errors['phone']}
                register={register}
                required={false}
            />
            <FormInput
                type="text"
                name={name ? name + ".email" : "email"}
                label="Email"
                error={name && errors[name] ? errors[name]['email'] : errors['email']}
                register={register}
                required={false}
            />
            <FormInput
                type="text"
                name={name ? name + ".www" : "www"}
                label="Site internet"
                error={name && errors[name] ? errors[name]['category'] : errors['category']}
                register={register}
                required={false}
            />

            {type !== "Internationale" &&
                <FormInput
                    type="text"
                    name={name ? name + ".gln" : "gln"}
                    label="N° GLN"
                    error={name && errors[name] ? errors[name]['gln'] : errors['gln']}
                    register={register}
                    required={false}
                />
            }

        </>
    )
}

export default AssuranceFields