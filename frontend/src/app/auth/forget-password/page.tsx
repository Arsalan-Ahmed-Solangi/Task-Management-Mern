"use client";
import React, { useState } from "react";
import "../auth.css";
import Image from "next/image";

import ForgetPasswordForm from "@/components/auth/ForgetPasswordForm";
function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
            <div
              className="card border-primary-down shadow-sm bg-white"
              style={{
                margin: "auto",
                width: "32%",
                display: "flex",
                flexDirection: "column",
                borderTop: "5px solid #0A264C",
              }}
            >
              <div className="card-body">
                <div className="text-center">
                  <Image
                    src={"/images/fav.png"}
                    width={40}
                    height={40}
                    alt=""
                  />
                  <h6 className="mt-2">Forget your Password?</h6>
                  <p className="form-text" style={{ fontSize: "11px" }}>
                    { `Enter your email and we'll send you instructions to reset your password` }

                  </p>
                </div>

                {/* Start of Form */}
                <ForgetPasswordForm />
                {/* End of Form */}
              </div>
              <div
                className="card-footer bg-custom p-0 d-flex align-items-center justify-content-center"
                style={{ minHeight: "30px" }}
              >
                <p className="mb-0 p-2 text-center  text-light" style={{ fontSize: "11px" }}>
                  &copy; 2024 -{" "}
                  <a
                    href="https://developerarsalanahmed.com/"
                    className="text-light"
                  >
                    Developer Arsalan Ahmed
                  </a>{" "}
                  - All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
