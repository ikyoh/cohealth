import React from 'react'
import { useGetAllDatas } from '../../../queryHooks/useDoctor'
import classNames from 'classnames';
import Loader from '../../Loader';

export const FormSelectDoctorIRI = ({ watch, setValue, searchValue }) => {

    const { isLoading, data } = useGetAllDatas(searchValue || '', 'fullname', 'asc', true)

    const Button = ({ data }) => {

        const className = classNames("p-3 flex justify-between border-t border-slate-500/20",
            {
                "bg-action": watch('doctor') === data['@id'],
                "cursor-pointer hover:bg-action/30": watch('doctor') !== data['@id']
            })

        return (
            <div className={className}
                onClick={() => setValue("doctor", data['@id'])}
            >
                <div>
                {data.fullname}
                </div>
                <div>
                RCC {data.rcc}
                </div>
            </div>
        )
    }


    if (isLoading) return <Loader />
    else return (
        <div>
            {data && data.map(data =>
                <Button key={data.id} data={data} />
            )}
        </div>
    )
}

