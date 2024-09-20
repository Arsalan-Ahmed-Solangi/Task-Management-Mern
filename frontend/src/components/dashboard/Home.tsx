"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideBar from "./sections/SideBar";
import TopBar from "./sections/TopBar";
import Loader from "../loader/Loader";
import { PieChart } from "@mui/x-charts";

function Home() {
  const [dashboard, setDashboard] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const dashboardData: any = [
      {
        title: "Appointments",
        icon: "fa fa-calendar-alt",
        link: "/dashboard/appointment/view",
        count: 20,
      },
      {
        title: "Doctors",
        icon: "fa fa-user-md",
        link: "/dashboard/doctor/view",
        count: 20,
      },
      {
        title: "Patients",
        icon: "fa fa-users",
        link: "/dashboard/patient/view",
        count: 20,
      },
      {
        title: "Prescriptions",
        icon: "fas fa-file-alt",
        link: "/dashboard/patient/view",
        count: 20,
      },
      {
        title: "Enquiries",
        icon: "fa fa-question-circle",
        link: "/dashboard/enquiries",
        count: 20,
      },
      {
        title: "Users",
        icon: "fa fa-user-cog",
        link: "/dashboard/users",
        count: 20,
      },
    ];
    setDashboard(dashboardData);
    setLoading(true);
  }, [dashboard]);

  return (
    <>
      <div className="container-fluid">
        <div className="card shadow-sm mb-4 p-2">
          <h5 className="text-custom mb-0">
            <i className="fa fa-tachometer-alt"></i> Dashboard
          </h5>
        </div>
        {loading ? (
          <>
            {/* Start of Show Dashboard Statistics */}
            <div className="row">
              {dashboard.length > 0 &&
                dashboard.map((value: any) => (
                  <>
                    <div className="col-xl-4 col-lg-4 col-xs-12 col-sm-12 col-md-6 mb-3">
                      <Link
                        href={value?.link}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="card border-left-primary shadow-sm h-100 py-2">
                          <div className="card-body">
                            <div className="row no-gutters align-items-center">
                              <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                  {value?.title ?? "Title Here"}
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                  {value?.count ?? 0}
                                </div>
                              </div>
                              <div className="col-auto">
                                <i
                                  className={`fa-2x text-custom ${value.icon}`}
                                ></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </>
                ))}
            </div>
            {/* End of Show Dashboard Statistics */}

            {/* Start of Charts Overview */}
            <div className="row">
              <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
                <div className="card shadow-sm">
                  <div className="card-header bg-custom p-2">
                    <h6 className="text-white card-title text-center pt-2">
                      Appointments Status Overview
                    </h6>
                  </div>

                  <div className="chart-container">
                    <PieChart
                      colors={[
                        "#4A90E2", // Pending
                        "#2ECC71", // Confirmed
                        "#117a65", // Checked In
                        "#F39C12", // Completed
                        "#E74C3C", // Rescheduled
                        "#C0392B", // Canceled
                        "#A569BD", // Missed
                      ]}
                      series={[
                        {
                          data: [
                            { id: 0, value: 10, label: "Pending" },
                            { id: 1, value: 15, label: "Confirmed" },
                            { id: 3, value: 30, label: "Checked In" },
                            { id: 4, value: 60, label: "Completed" },
                            { id: 5, value: 90, label: "Rescheduled" },
                            { id: 6, value: 10, label: "Canceled" },
                            { id: 7, value: 10, label: "Missed" },
                          ],
                        },
                      ]}
                      width={500}
                      height={300}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
                <div className="card shadow-sm">
                  <div className="card-header bg-custom p-2">
                    <h6 className="text-white card-title text-center pt-2">
                      Department Wise Doctors Overview
                    </h6>
                  </div>
                  <div className="chart-container">
                    <PieChart
                      colors={[
                        "#4A90E2", // Pending
                        "#2ECC71", // Confirmed
                        "#117a65", // Checked In
                      ]}
                      series={[
                        {
                          data: [
                            { id: 0, value: 10, label: "Radiology" },
                            { id: 1, value: 15, label: "Pathology" },
                            { id: 3, value: 30, label: "Hepatology" },
                          ],
                        },
                      ]}
                      width={500}
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* End of Charts Overview */}

            {/* Start of NoticeBoard */}
            <div className="row mt-3">
              <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12">
                <div className="card shadow-sm">
                  <div className="card-header bg-gray-100 p-1">
                    <h6 className="text-custom pl-3 card-title pt-3">
                      <i className="fa fa-clock"></i> Upcoming Appointments
                    </h6>
                  </div>

                  <div className="card-body">
                    <table className="table text-xs table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>SR</th>
                          <th>Patient</th>
                          <th>Doctor</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* End of NoticeBoard */}
          </>
        ) : (
          <>
            <Loader />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
