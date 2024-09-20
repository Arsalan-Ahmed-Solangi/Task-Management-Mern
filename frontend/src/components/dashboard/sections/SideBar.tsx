"use client";
import { usePathname } from "next/navigation";
import React from "react";

function SideBar() {
  const pathName = usePathname();
  // alert(pathName);
  const sidebar: any = [
    {
      title: "Dashboard",
      icon: "fas fa-fw fa-tachometer-alt",
      link: "/dashboard",
      nested: {},
    },
    {
      title: "Departments",
      icon: "fa fa-sitemap",
      nested: [
        { title: "Add Department", link: "/dashboard/department/add" },
        { title: "View Deparments", link: "/dashboard/department/view" },
      ],
    },
    {
      title: "Doctors",
      icon: "fa fa-user-md",
      nested: [
        { title: "Add Doctor", link: "/dashboard/doctor/add" },
        { title: "View Doctors", link: "/dashboard/doctor/view" },
      ],
    },
    {
      title: "Patients",
      icon: "fa fa-users",
      nested: [
        { title: "Add Patient", link: "/dashboard/patient/add" },
        { title: "View Patients", link: "/dashboard/patient/view" },
      ],
    },
    {
      title: "Schedule",
      icon: "fa fa-clock",
      nested: [
        { title: "Time Slots", link: "/dashboard/schedule/timeslots" },
        { title: "Add Schedule", link: "/dashboard/schedule/add" },
        { title: "View Schedules", link: "/dashboard/schedule/view" },
      ],
    },
    {
      title: "Appointments",
      icon: "fa fa-calendar-alt",
      nested: [
        { title: "Add Appointment", link: "/dashboard/appointment/add" },
        { title: "View Appointments", link: "/dashboard/appointment/view" },
      ],
    },
    {
      title: "Pharmacy",
      icon: "fas fa-book-medical",
      nested: [
        {
          title: "Medicine Category",
          link: "/dashboard/pharmacy/category/add",
        },
        { title: "Add Medicine", link: "/dashboard/pharmacy/medicine/add" },
        { title: "View Medicines", link: "/dashboard/pharmacy/medicine/view" },
      ],
    },
    {
      title: "Prescription",
      icon: "fas fa-file-alt",
      nested: [
        {
          title: "Add Prescription",
          link: "/dashboard/prescription/add",
        },

        { title: "View Prescription", link: "/dashboard/prescription/view" },
      ],
    },
    {
      title: "Account Manager",
      icon: "fas fa-user-secret",
      link: "/dashboard/accounts",
      nested: {},
    },
    {
      title: "Insurance",
      icon: "fas fa-shield-alt",
      link: "/dashboard/insurance",
      nested: {},
    },
    {
      title: "Billing",
      icon: "fas fa-file-invoice-dollar",
      link: "/dashboard/billing",
      nested: {},
    },
    {
      title: "Medication-Visits",
      icon: "fa fa-hospital",
      nested: [
        {
          title: "Patient Medication",
          link: "/dashboard/medicationvisit/medication/view",
        },

        {
          title: "Patient Visits",
          link: "/dashboard/medicationvisit/visits/view",
        },
      ],
    },
    {
      title: "Noticeboard",
      icon: "fa fa-bell",
      nested: [
        {
          title: "Add Notice",
          link: "/dashboard/noticeboard/add",
        },
        {
          title: "View Notices",
          link: "/dashboard/noticeboard/view",
        },
      ],
    },
    {
      title: "Hospital-Activites",
      icon: "fa fa-hospital",
      nested: [
        {
          title: "Add Reports",
          link: "/dashboard/hospitalactivities/reports/add",
        },
        {
          title: "View Reports",
          link: "/dashboard/hospitalactivities/reports",
        },
      ],
    },
    {
      title: "Enquiries",
      icon: "fa fa-question-circle",
      link: "/dashboard/enquiries",
      nested: {},
    },
    {
      title: "Messages",
      icon: "fa fa-comments",
      link: "/dashboard/messages",
      nested: {},
    },
    {
      title: "Mail",
      icon: "fa fa-envelope",
      link: "/dashboard/mail",
      nested: {},
    },
    {
      title: "Website",
      icon: "fa fa-globe",
      nested: [
        {
          title: "Slider",
          link: "/dashboard/website/slider",
        },
        {
          title: "Services",
          link: "/dashboard/website/services",
        },
        {
          title: "Gallery",
          link: "/dashboard/website/gallery",
        },
        {
          title: "About",
          link: "/dashboard/website/about",
        },
        {
          title: "Contact Info",
          link: "/dashboard/website/contact",
        },
        {
          title: "Pages",
          link: "/dashboard/website/pages",
        },
        {
          title: "Settings",
          link: "/dashboard/website/setting",
        },
      ],
    },
    {
      title: "Permissions",
      icon: "fa fa-user-lock",
      nested: [
        {
          title: "Users",
          link: "/dashboard/users/",
        },
        {
          title: "Roles",
          link: "/dashboard/roles",
        },
      ],
    },
  ];

  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>
        {sidebar.length > 0 &&
          sidebar.map((value: any) => (
            <>
              <hr className="sidebar-divider my-0 mb-2" />

              {value.nested?.length > 0 ? (
                <li className="nav-item pt-1 pb-1">
                  <a
                    className="nav-link collapsed"
                    href="/"
                    data-toggle="collapse"
                    data-target={`#${value.title}`}
                    aria-expanded="true"
                    aria-controls={value.title}
                  >
                    <i className={value?.icon}></i>
                    <span>{value.title}</span>
                  </a>
                  <div
                    id={value.title}
                    className="collapse"
                    aria-labelledby="headingTwo"
                    data-parent="#accordionSidebar"
                  >
                    <div className="bg-white py-2 collapse-inner rounded">
                      {value.nested.map((item: any) => (
                        <a
                          key={item.title}
                          className="collapse-item"
                          href={item.link}
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </li>
              ) : (
                <li
                  className={`nav-item  ${
                    value?.title === "Dashboard" ? "active" : ""
                  }   mb-2`}
                >
                  <a className="nav-link" href={value.link}>
                    <i className={value.icon ?? "fa fa-list"}></i>
                    <span>{value.title}</span>
                  </a>
                </li>
              )}

              <hr className="sidebar-divider my-0" />
            </>
          ))}
      </ul>
    </>
  );
}

export default SideBar;
