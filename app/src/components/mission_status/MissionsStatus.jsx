import React from 'react'
import { missionStatus } from '../../utils/arrays'
import dayjs from 'dayjs'


const MissionStatus = ({ mission }) => {

    const showStatus = () => {
        if (mission.status !== 'en cours') return mission.status
        if (dayjs().isBetween(dayjs(mission.beginAt), dayjs(mission.endAt))) return 'en cours'
        if (dayjs().isBefore(dayjs(mission.endAt))) return 'programmé'
        if (dayjs().isAfter(dayjs(mission.beginAt))) return 'terminé'
    }

    return (
        <div className="flex flex-wrap items-center gap-3 text-black">
            <div className={`h-5 w-5 rounded-full ${missionStatus[showStatus()]}`}>
            </div>
            <div>
                {showStatus().charAt(0).toUpperCase() + showStatus().slice(1)}
            </div>
        </div>
    )
    
}

export default MissionStatus