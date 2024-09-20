"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function Custom404Error() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#f5f2f2";
    setLoading(true);
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const goBack = () => {
    window.history.back();
    return;
  };

  return (
    <>
      {loading && (
        <div
          className="container justify-content-center align-items-center text-center"
          style={{ marginTop: "5%" }}
        >
          <Image
            alt="404 Error Image"
            src="/images/404.png"
            className="mx-auto d-block"
            width={300}
            height={300}
          />
          <h1>Oops!</h1>
          <h5 className="mt-2">404 - PAGE NOT FOUND</h5>
          <p>The page you requested could not be found!</p>

          <button onClick={goBack} className="btn btn-sm btn-primary btn-round">
            GO TO HOME PAGE
          </button>
        </div>
      )}
    </>
  );
}

export default Custom404Error;
