import React from 'react'
import classNames from 'classnames'
import { opasStatus } from '../../utils/arrays'

const OpasStatus = ({ prescriptions }) => {

    let opas = prescriptions.filter(p => p.type === "opas")

    return (
        <div className="flex flex-wrap items-center gap-3 text-black">
            <div className={`h-5 w-5 rounded-full ${opas.length === 0 ? 'bg-error' : opasStatus[opas[0].status]}`}>
            </div>
            <div>
                {opas.length === 0
                    ? 'A faire'
                    : opas[0].status.charAt(0).toUpperCase() + opas[0].status.slice(1)}
            </div>
        </div>
    )

}

export default OpasStatus