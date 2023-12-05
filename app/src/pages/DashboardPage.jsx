import React from 'react'
import Layout from '../layouts/Layout'
import { useGetCurrentAccount } from '../queryHooks/useAccount';
import DashboardAdmin from "../dashboards/DashboardAdmin"
import DashboardOrganization from "../dashboards/DashboardOrganization"
import DashboardNurse from "../dashboards/DashboardNurse"
import DashboardEmployee from "../dashboards/DashboardEmployee"
import PageTitle from '../layouts/PageTitle';
import { MdDashboard } from "react-icons/md";
import DashboardCoordinator from '../dashboards/DashboardCoordinator';
import DashboardDoctor from '../dashboards/DashboardDoctor';


const DashboardPage = () => {

  const { data: account} = useGetCurrentAccount()

  const Dashboard = () => {
    if (account.roles.includes("ROLE_ADMIN")) return <DashboardAdmin />
    if (account.roles.includes("ROLE_ADMIN")) return <DashboardCoordinator />
    if (account.roles.includes("ROLE_ORGANIZATION")) return <DashboardOrganization />
    if (account.roles.includes("ROLE_NURSE")) return <DashboardNurse />
    if (account.roles.includes("ROLE_EMPLOYEE")) return <DashboardEmployee />
    if (account.roles.includes("ROLE_DOCTOR")) return <DashboardDoctor />
    if (account.roles.includes("ROLE_USER")) return null
  }

  return (
    <Layout>
      <>
        <PageTitle
          title='Tableau de bord'
          icon={<MdDashboard size={25} />}
        />
        <Dashboard />
      </>
    </Layout>
  )
}

export default DashboardPage