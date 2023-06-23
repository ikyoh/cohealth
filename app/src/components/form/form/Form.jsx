import React from 'react'
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import classNames from 'classnames'

const Form = ({ children, onSubmit, isLoading, isDisabled, steps = null, currentStep = null, handleNextStep, handlePrevStep, errors, submitLabel, className=false }) => {

    const buttonClassName = classNames("btn btn-wide btn-primary rounded-full",
        {
            "btn-disabled": isDisabled,
            "loading": isLoading,
        }
    )

    return (
        <form className="relative" onSubmit={onSubmit}>
            <div className={`flex flex-col gap-3 p-5 relative ${className && className}`}>
                {children}
            </div>
            <div className="sticky bottom-0 p-3 border-t bg-white">
                <div className='grid grid-cols-3'>
                    <div className='place-self-start'>
                        {currentStep > 1 &&
                            <button className="btn btn-circle btn-primary" onClick={handlePrevStep}>
                                <MdChevronLeft className='text-3xl' />
                            </button>
                        }
                    </div>
                    <div className='place-self-center'>
                        {steps === currentStep &&
                            <button className={buttonClassName}>
                                {submitLabel || "Valider"}
                            </button>
                        }
                    </div>
                    <div className='place-self-end'>
                        {currentStep < steps &&
                            <button className="btn btn-circle btn-primary" disabled={Object.keys(errors).length !== 0} onClick={handleNextStep}>
                                <MdChevronRight className='text-3xl' />
                            </button>
                        }
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Form