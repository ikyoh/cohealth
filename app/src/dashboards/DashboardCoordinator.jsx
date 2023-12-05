import React from 'react'
import { MdEventNote, MdPendingActions } from 'react-icons/md'

const DashboardCoordinator = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-5 mb-5">
    <div className='cards'>
      <div className="icon">
        <MdPendingActions size={30} />
      </div>
      <div>
        <div className="title">
          Missions
        </div>
        <div className="info">
        ...
        </div>
      </div>
    </div>
    <div className='cards'>
      <div className="icon">
        <MdPendingActions size={30} />
      </div>
      <div>
        <div className="title">
          Collaborations
        </div>
        <div className="info">
        ...
        </div>
      </div>
    </div>
    <div className='cards'>
      <div className="icon">
        <MdEventNote size={30} />
      </div>
      <div>
        <div className="title">
          Mandats
        </div>
        <div className="info">
        ...
        </div>
      </div>
    </div>
  </div>
  )
}

export default DashboardCoordinator