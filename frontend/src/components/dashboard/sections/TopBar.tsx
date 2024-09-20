import Image from "next/image";
import React from "react";

function TopBar() {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light back-custom topbar mb-4 static-top shadow">
        <button
          id="sidebarToggleTop"
          className="btn  btn-light d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars"></i>
        </button>

        <div className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-5 my-md-0 mw-100 navbar-search">
          <div className="d-flex align-items-center">
            <Image
              width={50}
              height={50}
              alt="Hospital Logo"
              className="img-profile rounded-circle"
              src="/images/hospital.jpg"
            />
            <p className="text-light ml-3 mt-3" style={{ fontWeight: "700" }}>
              {"Hayat Foundation Hospital"}
            </p>
          </div>
        </div>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <Image
                width={100}
                height={100}
                alt="ProfileImage"
                className="img-profile rounded-circle"
                src="/images/man.png"
              />
              <span className="mr-2 pl-1 d-none d-lg-inline text-gray-200 text-xs">
                Douglas McGee
              </span>
              <i className="fa fa-chevron-down"></i>
            </a>

            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a className="dropdown-item" href="#">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                Settings
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                Activity Log
              </a>
              <div className="dropdown-divider"></div>
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default TopBar;
