import React from 'react'

const NoData = ({ label = "Aucune donnée trouvée" }) => {
    return (
        <div className='p-5 bg-slate-200 text-center'>
            {label}
        </div>
    )
}

export default NoData