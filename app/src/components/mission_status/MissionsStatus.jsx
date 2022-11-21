import React from 'react'
import { missionStatus } from '../../utils/arrays'
import dayjs from 'dayjs'

const MissionStatus = ({ mission }) => {

    const showStatus = () => {
        if (dayjs().isBetween(dayjs(mission.beginAt), dayjs(mission.endAt))) return 'en cours'
        if (dayjs().isBefore(dayjs(mission.endAt))) return 'terminée'
        if (dayjs().isAfter(dayjs(mission.beginAt))) return 'programmée'
    }

    if (mission.status !== 'current')
        return (
            <span className={`px-3 py-1 uppercase text-xs rounded-full text-white ${missionStatus[mission.status]}`}>
                {mission.status}
            </span>
        )
    else return (
        <span className={`px-3 py-1 uppercase text-xs rounded-full text-white ${missionStatus[showStatus()]}`}>
            {showStatus()}
        </span>
    )

}

export default MissionStatus