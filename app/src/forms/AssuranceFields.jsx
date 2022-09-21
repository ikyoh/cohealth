import React from 'react'
import FormInput from '../components/forms/FormInput'
//import FormCheckbox from '../components/forms/FormCheckbox'
import FormSelect from '../components/forms/FormSelect'


const AssuranceFields = ({name=false, className=false}) => {

    return (
        <div className={`grid gap-x-10 gap-y-5 grid-cols-1 md:grid-cols-2 ${className && className}`}>
            <FormInput name={name ? name + ".company" : "company"} label="Nom" placeholder="" required={true} />
            <FormInput name={name ? name + ".organization" : "organization"} label="Groupe" placeholder="" />
            <FormSelect name={name ? name + ".type" : "type"} label="Type" placeholder="" required={true}>
                <option value="">Choisir un type</option>
                <option value="LAMAL">LAMAL</option>
                <option value="LAA">LAA</option>
                <option value="LAI">LAI</option>
                <option value="LAM">LAM</option>
                <option value="VVG">VVG</option>
            </FormSelect>
            <FormInput name={name ? name + ".phone" : "phone"} label="Téléphone" placeholder="" />
            <FormInput name={name ? name + ".email" : "email"} label="Email" placeholder="" />
            <FormInput name={name ? name + ".www" : "www"} label="Site internet" placeholder="" />
            <FormInput name={name ? name + ".address1" : "address1"} label="Adresse" placeholder="" />
            <FormInput name={name ? name + ".address2" : "address2"} label="Adresse complément" placeholder="" />
            <FormInput name={name ? name + ".npa" : "npa"} label="NPA" placeholder="" />
            <FormInput name={name ? name + ".city" : "city"} label="Ville" placeholder="" />
            <FormInput name={name ? name + ".gln" : "gln"} label="GLN" placeholder="" />
            {/* <FormCheckbox name={name ? name + ".isActive" : "isActive"} label="Actif" /> */}
        </div>
    )
}

export default AssuranceFields