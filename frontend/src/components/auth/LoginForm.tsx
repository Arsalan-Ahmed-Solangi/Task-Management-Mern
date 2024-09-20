import Link from "next/link";
import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

function LoginForm() {
    
  //****IntialValues*****//
  interface FormValues {
    password: string;
    email: string;
  }

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(3, "Password must be at least 3 characters long"),
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
                    type="email"
                    placeholder="Email Address"
                    className="form-control"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                <div className="form-group">
                  <Field
                    style={{ fontSize: 12 }}
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    name="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12 col-xs-12 col-lg-12 col-sm-12 text-center">
                <p>
                  <Link
                    className="text-custom"
                    href={"/auth/forget-password"}
                    style={{ fontSize: "12px", marginLeft: "1px" }}
                  >
                    Forget Password?
                  </Link>
                </p>
                <button
                  type="submit"
                  className="btn btn-primary text-white mb-2"
                  style={{ fontSize: 12 }}
                >
                  Login
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default LoginForm;
