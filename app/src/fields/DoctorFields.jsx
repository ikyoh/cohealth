import React from 'react'
import { FormInput } from "../components/form/input/FormInput";
import { FormSelect } from '../components/form/select/FormSelect';
import { cantons, doctorCategories } from '../utils/arrays';


const DoctorFields = ({ name, errors, register }) => {

    console.log('errors', errors)
    return (
        <>
            <FormInput
                type="text"
                name={name ? name + ".fullname" : "fullname"}
                label="Nom Complet"
                placeholder="Nom Prénom"
                error={name && errors[name] ? errors[name]['fullname'] : errors['fullname']}
                register={register}
                required={true}
            />
            <FormInput
                type="text"
                name={name ? name + ".organization" : "organization"}
                label="Organisation"
                error={name && errors[name] ? errors[name]['organization'] : errors['organization']}
                register={register}
                required={false}
            />
            <FormSelect
                type="text"
                name={name ? name + ".category" : "category"}
                label="Catégorie"
                error={name && errors[name] ? errors[name]['category'] : errors['category']}
                register={register}
                required={true}
            >
                <option value="">Choisir une catégorie</option>
                {doctorCategories.map(category =>
                    <option key={category} value={category}>{category}</option>
                )}
            </FormSelect>
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
                name={name ? name + ".address" : "address"}
                label="Adresse"
                error={name && errors[name] ? errors[name]['address'] : errors['address']}
                register={register}
                required={false}
            />
            <FormInput
                type="text"
                name={name ? name + ".npa" : "npa"}
                label="NPA"
                error={name && errors[name] ? errors[name]['npa'] : errors['npa']}
                register={register}
                required={false}
            />
            <FormSelect
                type="text"
                name={name ? name + ".canton" : "canton"}
                label="Canton"
                error={name && errors[name] ? errors[name]['canton'] : errors['canton']}
                register={register}
                required={true}
            >
                <option value="">Choisir un canton</option>
                {Object.entries(cantons).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
            </FormSelect>
            <FormInput
                type="text"
                name={name ? name + ".rcc" : "rcc"}
                label="RCC"
                error={name && errors[name] ? errors[name]['rcc'] : errors['rcc']}
                register={register}
                required={true}
            />
            <FormInput
                type="text"
                name={name ? name + ".gln" : "gln"}
                label="N° GLN"
                error={name && errors[name] ? errors[name]['gln'] : errors['gln']}
                register={register}
                required={true}
            />
        </>
    )
}

export default DoctorFields