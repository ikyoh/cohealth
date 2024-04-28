import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import DashboardAdmin from "../dashboards/DashboardAdmin";
import DashboardCoordinator from "../dashboards/DashboardCoordinator";
import DashboardDoctor from "../dashboards/DashboardDoctor";
import DashboardEmployee from "../dashboards/DashboardEmployee";
import DashboardNurse from "../dashboards/DashboardNurse";
import DashboardOrganization from "../dashboards/DashboardOrganization";
import Layout from "../layouts/Layout";
import PageTitle from "../layouts/PageTitle";
import { useGetCurrentAccount } from "../queryHooks/useAccount";

const DashboardPage = () => {
    const { data: account } = useGetCurrentAccount();
    const [filterButtonState, setFilterButtonState] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const Dashboard = () => {
        if (account.roles.includes("ROLE_ADMIN")) return <DashboardAdmin />;
        if (account.roles.includes("ROLE_ADMIN"))
            return <DashboardCoordinator />;
        if (account.roles.includes("ROLE_ORGANIZATION"))
            return <DashboardOrganization />;
        if (account.roles.includes("ROLE_NURSE")) return <DashboardNurse />;
        if (account.roles.includes("ROLE_EMPLOYEE"))
            return <DashboardEmployee />;
        if (account.roles.includes("ROLE_DOCTOR")) return <DashboardDoctor />;
        if (account.roles.includes("ROLE_USER")) return null;
    };

    return (
        <Layout>
            <>
                <PageTitle
                    title="Tableau de bord"
                    icon={<MdDashboard size={25} />}
                />
                <Dashboard />
            </>
        </Layout>
    );
};

export default DashboardPage;
