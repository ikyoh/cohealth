import React from 'react'
import { FormInput } from '../components/form/input/FormInput'
import { FormSelect } from '../components/form/select/FormSelect'
import { FormTextarea } from '../components/form/textarea/FormTextarea'
import { mandateCategories } from '../utils/arrays';


const MandateFields = ({ name, errors, register }) => {

    return (
        <>
            <FormSelect
                type="text"
                name={name ? name + ".category" : "category"}
                label="Prestation"
                error={name && errors[name] ? errors[name]['category'] : errors['category']}
                register={register}
                required={true}
            >
                <option value="">Choisir une catégorie</option>
                {Object.entries(mandateCategories).map(([key, value]) => <option key={key} value={value}>{value}</option>)}
            </FormSelect>
            <FormSelect
                type="text"
                name={name ? name + ".user" : "user"}
                label="Mandataire"
                error={name && errors[name] ? errors[name]['user'] : errors['user']}
                register={register}
                required={true}
            >
                <option value="">Choisir un mandataire</option>
                <option value="">CoHealth</option>
            </FormSelect>
            <FormInput
                type="date"
                name={name ? name + ".beginAt" : "beginAt"}
                label="Date de prise en charge"
                error={name && errors[name] ? errors[name]['beginAt'] : errors['beginAt']}
                register={register}
                required={true}
            />
            <FormTextarea
                name={name ? name + ".description" : "description"}
                label="Commentaire"
                error={name && errors[name] ? errors[name]['description'] : errors['description']}
                register={register}
                required={false}
                rows={5}
            />
        </>
    )
}

export default MandateFields