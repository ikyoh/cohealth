import React from 'react'
import FormTextarea from '../components/forms/FormTextarea'
import FormDatePicker from '../components/forms/FormDatePicker'

const MissionFields = ({ name = false }) => {

  return (
    <div className='grid gap-x-10 gap-y-5 grid-cols-1 md:grid-cols-1 mt-3'>
      <div className='grid gap-x-10 gap-y-5 grid-cols-1 md:grid-cols-2'>
        <FormDatePicker name={name ? name + ".beginAt" : "beginAt"} label="Début de la mission" />
        <FormDatePicker name={name ? name + ".endAt" : "endAt"} label="Fin de la mission" />
      </div>
      <FormTextarea
        rows={12}
        name={name ? name + ".description" : "description"}
        label="Synthèse de la mission"
      />
    </div>
  )
}

export default MissionFields