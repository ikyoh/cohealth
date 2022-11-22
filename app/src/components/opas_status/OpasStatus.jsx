import React from 'react'
import { opasStatus } from '../../utils/arrays'

const OpasStatus = ({ prescriptions }) => {

    let opas = prescriptions.filter(p => p.type === "opas")

    if (opas.length === 0)
        return (
            <span className='px-3 py-1 uppercase text-xs rounded-full bg-error text-white'>
                A faire
            </span>
        )
    else
        return (
            <span className={`px-3 py-1 uppercase text-xs rounded-full text-white ${opasStatus[opas[0].status]}`}>
                {opas[0].status}
            </span>
        )

}

export default OpasStatus