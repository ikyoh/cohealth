import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/main.css";
import ProtectedRoute from "./components/ProtectedRoute";
import FrontLayout from "./layouts/FrontLayout";
import Layout from "./layouts/Layout";
import AccountPage from "./pages/AccountPage";
import AcknowledgementPage from "./pages/AcknowledgementPage";
import AssurancesPage from "./pages/AssurancesPage";
import CollaborationsPage from "./pages/CollaborationsPage";
import DashboardPage from "./pages/DashboardPage";
import DoctorsPage from "./pages/DoctorsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import MandateGroupPage from "./pages/MandateGroupPage";
import MandatePage from "./pages/MandatePage";
import MandatesGroupPage from "./pages/MandatesGroupPage";
import MandatesPage from "./pages/MandatesPage";
import MissionPage from "./pages/MissionPage";
import MissionsPage from "./pages/MissionsPage";
import PartnersPage from "./pages/PartnersPage";
import PatientPage from "./pages/PatientPage";
import PatientsPage from "./pages/PatientsPage";
import RegistrationPage from "./pages/RegistrationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ServicesPage from "./pages/ServicesPage";
import UsersPage from "./pages/UsersPage";

import * as dayjs from "dayjs";
require("dayjs/locale/fr");
dayjs.locale("fr");

let weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);
let isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);
let localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
let utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const App = () => {
    const queryClient = new QueryClient();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <FrontLayout>
                                    <Homepage />
                                </FrontLayout>
                            }
                        />
                        <Route
                            path="/account"
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <AccountPage />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/assurances"
                            element={
                                <Layout>
                                    <AssurancesPage />
                                </Layout>
                            }
                        />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route
                            path="/doctors"
                            element={
                                <Layout>
                                    <DoctorsPage />
                                </Layout>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <FrontLayout>
                                    <LoginPage />
                                </FrontLayout>
                            }
                        />
                        <Route
                            path="/users"
                            element={
                                <Layout>
                                    <UsersPage />
                                </Layout>
                            }
                        />
                        <Route
                            path="/groupmandates/:id"
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <MandateGroupPage />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/groupmandates"
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <MandatesGroupPage />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/mandates/:id"
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <MandatePage />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/mandates"
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <MandatesPage />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/missions/:id"
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <MissionPage />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/missions"
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <MissionsPage />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/collaborations"
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <CollaborationsPage />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/partners"
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <PartnersPage />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/patients/:id"
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <PatientPage />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/patients"
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <PatientsPage />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/services"
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <ServicesPage />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/registration"
                            element={
                                <FrontLayout>
                                    <RegistrationPage />
                                </FrontLayout>
                            }
                        />
                        <Route
                            path="/acknowledgement"
                            element={
                                <FrontLayout>
                                    <AcknowledgementPage />
                                </FrontLayout>
                            }
                        />
                        <Route
                            path={"/reset-password/:token"}
                            element={
                                <FrontLayout>
                                    <ResetPasswordPage />
                                </FrontLayout>
                            }
                        />
                        <Route
                            path={"/forgot-password"}
                            element={
                                <FrontLayout>
                                    <ForgotPasswordPage />
                                </FrontLayout>
                            }
                        />
                    </Routes>
                </Router>
                <ToastContainer autoClose={1000} />
                <ReactQueryDevtools
                    initialIsOpen={false}
                    position="bottom-right"
                />
            </QueryClientProvider>
        </>
    );
};

export default App;
