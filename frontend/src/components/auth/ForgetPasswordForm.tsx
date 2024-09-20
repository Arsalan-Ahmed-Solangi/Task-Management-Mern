
import Link from "next/link";
import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

function ForgetPasswordForm() {
  //****IntialValues*****//
  interface FormValues {
    email: string;
    HospitalCode: string;
  }

  const initialValues: FormValues = {
    HospitalCode: "",
    email: "",
  };

  const validationSchema = Yup.object({
    HospitalCode: Yup.string().required("Hospital code is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    setTimeout(() => {
      console.log("Form data:", values);
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 400);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="row">
              <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                <div className="form-group">
                  <Field
                    style={{ fontSize: 12 }}
                    type="text"
                    placeholder="Hospital Code"
                    className="form-control"
                    name="HospitalCode"
                  />
                  <ErrorMessage
                    name="HospitalCode"
                    component="div"
                    className="error-message"
                  />
                  <p
                    className="form-text text-success"
                    style={{ fontSize: "10px" }}
                  >
                    Please provide the registered company code
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                <div className="form-group">
                  <Field
                    style={{ fontSize: 12 }}
                    type="email"
                    placeholder="Email Address"
                    className="form-control"
                    name="email"
                  />
                  <p
                    className="form-text text-success"
                    style={{ fontSize: "10px" }}
                  >
                    Please provide the registered email address
                  </p>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-12 col-xs-12 col-lg-12 col-sm-12 text-center">
                <p>
                  <Link
                    className="text-custom"
                    href={"/auth/login"}
                    style={{ fontSize: "12px", marginLeft: "1px" }}
                  >
                    Go back to login
                  </Link>
                </p>
                <button
                  type="submit"
                  className="btn btn-primary mb-2 text-white"
                  style={{ fontSize: 12 }}
                >
                  Send
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ForgetPasswordForm;
