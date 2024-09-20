import React from "react";

function Loader() {
  return (
    <div className="row">
      <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 text-center ">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Loader;
