import React from 'react'
import { FormInput } from '../components/form/input/FormInput'
import { FormTextarea } from '../components/form/textarea/FormTextarea'

const MissionFields = ({ errors, register }) => {

  return (
    <>
      <FormInput
        type="date"
        name="beginAt"
        label="Début de la mission"
        error={errors['beginAt']}
        register={register}
        required={true}
      />
      <FormInput
        type="date"
        name="endAt"
        label="Fin de la mission"
        error={errors['endAt']}
        register={register}
        required={true}
      />
      <FormTextarea
        name="description"
        label="Synthèse de la mission"
        error={errors['description']}
        register={register}
        required={false}
        rows={10}
      />
    </>
  )
}

export default MissionFields