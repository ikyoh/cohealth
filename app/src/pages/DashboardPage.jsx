import React from 'react'
import Layout from '../layouts/Layout'
import { useSelector } from "react-redux";
import { getAccount } from "../features/account/accountSlice";
import DashboardAdmin from "../dashboards/DashboardAdmin"
import DashboardOrganization from "../dashboards/DashboardOrganization"
import DashboardNurse from "../dashboards/DashboardNurse"
import DashboardEmployee from "../dashboards/DashboardEmployee"


const DashboardPage = () => {

  const Dashboard = () => {    
    const account = useSelector(getAccount);
    if (account.roles.includes("ROLE_ADMIN")) return <DashboardAdmin />
    if (account.roles.includes("ROLE_ORGANIZATION")) return <DashboardOrganization />
    if (account.roles.includes("ROLE_NURSE")) return <DashboardNurse />
    if (account.roles.includes("ROLE_EMPLOYEE")) return <DashboardEmployee />
    if (account.roles.includes("ROLE_USER")) return null
  }

  return (
    <Layout>
      <>
        <Dashboard />
      </>
    </Layout>
  )
}

export default DashboardPage