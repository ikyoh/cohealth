import React from 'react'
import { missionStatus } from '../../utils/arrays'
import dayjs from 'dayjs'


const MissionStatus = ({ mission, label, isAnimated }) => {

    const showStatus = () => {
        if (mission.status !== 'en cours') return mission.status
        if (dayjs().isBetween(dayjs(mission.beginAt), dayjs(mission.endAt))) return 'en cours'
        if (dayjs().isBefore(dayjs(mission.endAt))) return 'programmé'
        if (dayjs().isAfter(dayjs(mission.beginAt))) return 'terminé'
    }

    return (
        <div className="flex flex-wrap items-center gap-3 text-black">

            <span className="relative flex h-4 w-4">
                {isAnimated &&
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${missionStatus[showStatus()]} opacity-75`}></span>}
                <span className={`relative inline-flex rounded-full h-4 w-4 ${missionStatus[showStatus()]}`}></span>
            </span>


            <div>
                {label ? label : showStatus().charAt(0).toUpperCase() + showStatus().slice(1)}
            </div>
        </div>
    )

}

export default MissionStatus