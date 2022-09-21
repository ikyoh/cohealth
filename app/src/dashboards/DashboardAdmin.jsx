import React, { useState } from 'react'
import UsersContainer from '../features/users/UsersContainer'

const DashboardAdmin = () => {

  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    roles: null,
    isActive: true
  })
  const [sort, setSort] = useState({ by: 'id', direction: 'asc' })


  const Row = () => {
    return null
  }

  return (
    <>
      <div>DashboardAdmin</div>
      <UsersContainer search={search} sort={sort} filters={filters}>
        <Row />
      </UsersContainer>
    </>
  )
}

export default DashboardAdmin