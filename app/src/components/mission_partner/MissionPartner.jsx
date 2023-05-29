import React from 'react'
import { useGetOneData } from '../../queryHooks/useUser'
import uuid from 'react-uuid'
import Loader from '../Loader'
import { URL } from '../../features/apiConfig'

const MissionPartner = ({ partners }) => {

    const PartnerCard = ({ id }) => {
        const { data, isLoading } = useGetOneData(id)
        if (isLoading) return <Loader isSmall={true} />
        else return (
            <div className='flex items-center gap-2 mb-3 last:mb-0'>
                {data.avatar
                    ? <img src={URL + data.avatar.contentUrl} className='rounded-full object-cover h-10 w-10' alt="profil" />
                    : <div className='rounded-full flex items-center h-10 justify-center w-10 bg-info'>
                        {data.firstname && data.firstname.charAt(0)}
                        {data.lastname && data.lastname.charAt(0)}
                    </div>
                }
                <div>{data.lastname} {data.firstname}</div>
            </div>
        )
    }

    return (
        <>
            {partners.length === 0 && "Aucun partenaire"}
            {partners?.map((value) => <PartnerCard key={uuid()} id={value} />)}
        </>
    )
}

export default MissionPartner