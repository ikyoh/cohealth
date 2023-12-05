import React from 'react'
import { opasStatus } from '../../utils/arrays'
import { firstLetterUppercase } from '../../utils/functions'

const OpasStatus = ({ opas }) => {

    return (
        <div className="flex flex-wrap items-center gap-2 text-black">
            <div className={`h-5 w-5 rounded-full ${!opas ? 'bg-error' : opasStatus[opas.status]}`}>
            </div>
            <div className='text-sm'>
                {!opas
                    ? 'A faire'
                    : firstLetterUppercase(opas.status)}
            </div>
        </div>
    )

}

export default OpasStatus