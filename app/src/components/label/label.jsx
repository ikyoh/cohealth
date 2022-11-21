import React from 'react'
import classNames from 'classnames'

const label = ({ label }) => {

    const classNames = "px-3 py-1 rounded-full bg-success text-white"


    return (
        <div className={classNames}>{label}</div>
    )
}

export default label