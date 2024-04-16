import React from 'react'

const NoData = ({ label = "Aucune donnée trouvée" }) => {
    return (
        <div className='card-shadow'>
            {label}
        </div>
    )
}

export default NoData