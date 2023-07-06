import { useState } from 'react'
import Form from "../components/form/form/Form"
import { useGetAllDatas as getPartners } from '../queryHooks/usePartner'
import { useGetIRI as getMission, usePutData } from '../queryHooks/useMission'
import Loader from '../components/Loader'
import uuid from 'react-uuid'
import classNames from 'classnames'
import { API_URL } from '../config/api.config'

const MissionPartnerForm = ({ iri, partners, handleCloseModal }) => {

    const { data: allPartners, isLoading: isLoadingPartners } = getPartners()
    const { data, isLoading: isLoadingMission } = getMission(iri)
    const { mutate } = usePutData()
    const [selected, setSelected] = useState(partners)

    const Button = ({ partner }) => {
        const className = classNames("btn btn-ghost bg-slate-200",
            {
                "ring-2 ring-action ring-inset": selected.includes(partner.id)
            })

        return (
            <button
                type="button"
                className={className}
                onClick={() => handleClick(partner.id)}
            >
                {partner.lastname} {partner.firstname}
            </button>
        )

    }

    const handleClick = (id) => {
        if (selected.includes(id)) {
            const filterSelected = selected.filter((f) => f !== id)
            setSelected(filterSelected)
        }
        else {
            const cloneSelected = JSON.parse(JSON.stringify(selected))
            cloneSelected.push(id)
            setSelected(cloneSelected)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        mutate({ id: data.id, coworkers: selected })
        handleCloseModal()
    }

    if (isLoadingMission || isLoadingPartners) return <Loader />
    else return (
        <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-3">
                {allPartners.map(p =>
                    <Button key={uuid()} partner={p.partner} />
                )}
            </div>
        </Form>
    )
}

export default MissionPartnerForm