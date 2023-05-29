import React from 'react'
import { useGetAllDatas } from '../../../queryHooks/useAssurance'
import classNames from 'classnames';
import Loader from '../../Loader';

export const FormSelectAssuranceIRI = ({ watch, setValue, searchValue }) => {

    const { isLoading, data } = useGetAllDatas(searchValue || '', 'company', 'asc', true)

    const Button = ({ data }) => {

        const className = classNames("p-3 flex justify-between border-t border-slate-500/20",
            {
                "bg-action": watch('assurance') === data['@id'],
                "cursor-pointer hover:bg-action/30": watch('assurance') !== data['@id']
            })

        return (
            <div className={className}
                onClick={() => setValue("assurance", data['@id'])}
            >
                <div>
                    {data.company}
                    <span className='text-slate-400'>
                    ({data.type})
                    </span>
                </div>
                <div>
                    GLN {data.gln}
                </div>
            </div>
        )
    }

    if (isLoading) return <Loader />
    return (
        <div>
            {data && data.map(data =>
                <Button key={data.id} data={data} />
            )}
        </div>
    )
}

