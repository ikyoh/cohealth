import React from 'react'
import { missionStatus } from '../../utils/arrays'
import dayjs from 'dayjs'
import classNames from 'classnames'

const MissionStatus = ({ mission }) => {

    const className = classNames(
        { "px-3 py-1 uppercase text-xs rounded-full text-white": true }
    )

    const showStatus = () => {
        if (dayjs().isBetween(dayjs(mission.beginAt), dayjs(mission.endAt))) return 'en cours'
        if (dayjs().isBefore(dayjs(mission.endAt))) return 'programmée'
        if (dayjs().isAfter(dayjs(mission.beginAt))) return 'terminée'
    }

    // const ShowError = () => {
    //     if (!mission.doctor || !mission.assurance) return (
    //         <div className={`${className} bg-error`}>
    //             Fiche incomplète
    //         </div>
    //     )
    //     else return null
    // }

    return (
        <div className="flex gap-3 flex-wrap">
            {/* <ShowError /> */}
            {mission.status !== 'current' ?
                <div className={`${className} ${missionStatus[mission.status]}`}>
                    {mission.status}
                </div>
                :
                <div className={`${className} ${missionStatus[showStatus()]}`}>
                    {showStatus()}
                </div>
            }
        </div>
    )
}

export default MissionStatus