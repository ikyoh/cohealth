import React from 'react'
import FormInput from '../components/forms/FormInput'
//import FormCheckbox from '../components/forms/FormCheckbox'
import FormSelect from '../components/forms/FormSelect'
import { cantons } from '../utils/arrays';

const DoctorFields = ({name=false, className=false}) => {

    return (
        <div className={`grid gap-x-10 gap-y-5 grid-cols-1 md:grid-cols-2 ${className && className}`}>
            <FormInput name={name ? name + ".fullname" : "fullname"} label="Nom complet" placeholder="Nom Prénom" required={true} />
            <FormSelect name={name ? name + ".category" : "category"} label="Spécialité" placeholder="" required={true}>
                <option value="">Choisir une spécialité</option>
                <option value="Médecine générale">Médecine générale</option>
                <option value="Médecine praticienne">Médecine praticienne</option>
                <option value="Chirurgie">Chirurgie</option>
                <option value="Cardiologie">Cardiologie</option>
                <option value="Chirurgie dentaire">Chirurgie dentaire</option>
                <option value="Dermatologie et vénéréologie">Dermatologie et vénéréologie</option>
                <option value="Endocrinologie et diabétologie">Endocrinologie et diabétologie</option>
                <option value="Gynécologie et obstétrique">Gynécologie et obstétrique</option>
                <option value="Ophtalmologie">Ophtalmologie</option>
                <option value="Psychiatrie et psychothérapie">Psychiatrie et psychothérapie</option>
                <option value="Radiologie">Radiologie</option>
                <option value="Urologie">Urologie</option>
                <option value="Autre">Autre</option>
            </FormSelect>
            <FormInput name={name ? name + ".organization" : "organization"} label="Organisation" placeholder="" />
            <FormInput name={name ? name + ".phone" : "phone"} label="Téléphone" placeholder="" />
            <FormInput name={name ? name + ".email" : "email"} label="Email" placeholder="" />
            <FormInput name={name ? name + ".mobile" : "mobile"} label="Mobile" placeholder="" />
            <FormInput name={name ? name + ".fax" : "fax"} label="Fax" placeholder="" />
            <FormInput name={name ? name + ".address1" : "address1"} label="Adresse" placeholder="" />
            <FormInput name={name ? name + ".npa" : "npa"} label="NPA" placeholder="" />
            <FormInput name={name ? name + ".city" : "city"} label="Ville" placeholder="" />
            <FormSelect name={name ? name + ".canton" : "canton"} label="Canton" placeholder="">
                <option value="">Choisir un canton</option>
                {Object.entries(cantons).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
            </FormSelect>
            <FormInput name={name ? name + ".rcc" : "rcc"} label="RCC" placeholder="" />
            <FormInput name={name ? name + ".gln" : "gln"} label="GLN" placeholder="" />
            {/* <FormCheckbox name={name ? name + ".isActive" : "isActive"} label="Actif" /> */}
        </div>
    )
}

export default DoctorFields