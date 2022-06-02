import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { route } from "next/dist/server/router";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fname: Yup.string().required("first name is required"),
  lname: Yup.string().required("last name is required"),

  email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  pwd: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  repeatpwd: Yup.string()
    .oneOf([Yup.ref("pwd"), null], "Passwords must match")
    .required("Password is required"),
});

function Register() {
  const router = useRouter();

  const [userRecord, setuserRecord] = useState([]);
  const [userDetails, setUserDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    pwd: "",
    repeatpwd: "",
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const registerAccount = (userDetails) => {
    console.log(userDetails);
    if (JSON.parse(localStorage.getItem("userRecordStr")) !== null) {
      let userRecord = JSON.parse(localStorage.getItem("userRecordStr"));
      userRecord = userRecord.concat(userDetails);
      console.log(userRecord);
      const userRecordStr = JSON.stringify(userRecord);
      localStorage.setItem("userRecordStr", userRecordStr);
    } else {
      let userRecord = [];
      userRecord = userRecord.concat(userDetails);
      console.log(userRecord);
      const userRecordStr = JSON.stringify(userRecord);
      localStorage.setItem("userRecordStr", userRecordStr);
    }
    router.push("/login-screens/login");
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      pwd: "",
      repeatpwd: "",
    },
  });
  return (
    <div className="bg-gradient-primary">
      <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            {/* <!-- Nested Row within Card Body --> */}
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">
                      Create an Account!
                    </h1>
                  </div>
                  <form
                    className="user"
                    noValidate
                    onSubmit={handleSubmit(async (data) => {
                      console.log(data);
                      registerAccount(data);
                    })}
                  >
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <Controller
                          render={({ field }) => (
                            <>
                              <input
                                type="text"
                                {...field}
                                className="form-control form-control-user"
                                id="exampleFirstName"
                                placeholder="First Name"
                              />
                              <ErrorMessage errors={errors} name="fname" />
                            </>
                          )}
                          name="fname"
                          control={control}
                        />
                      </div>
                      <div className="col-sm-6">
                        <Controller
                          render={({ field }) => (
                            <>
                              <input
                                type="text"
                                {...field}
                                className="form-control form-control-user"
                                id="exampleLastName"
                                placeholder="Last Name"
                              />
                              <ErrorMessage errors={errors} name="lname" />
                            </>
                          )}
                          name="lname"
                          control={control}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <Controller
                        render={({ field }) => (
                          <>
                            <input
                              type="email"
                              className="form-control form-control-user"
                              id="exampleInputEmail"
                              {...field}
                              placeholder="Email Address"
                            />
                            <ErrorMessage errors={errors} name="email" />
                          </>
                        )}
                        name="email"
                        control={control}
                      />
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <Controller
                          render={({ field }) => (
                            <>
                              <input
                                {...field}
                                type="password"
                                className="form-control form-control-user"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp1"
                                placeholder="New Password"
                              />
                              <ErrorMessage errors={errors} name="pwd" />
                            </>
                          )}
                          name="pwd"
                          control={control}
                        />
                      </div>
                      <div className="col-sm-6">
                        <Controller
                          render={({ field }) => (
                            <>
                              <input
                                {...field}
                                type="password"
                                className="form-control form-control-user"
                                id="exampleInputEmail2"
                                aria-describedby="emailHelp2"
                                placeholder="Repeat Password"
                              />
                              <ErrorMessage errors={errors} name="repeatpwd" />
                            </>
                          )}
                          name="repeatpwd"
                          control={control}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-user btn-block"
                    >
                      Register Account
                    </button>
                    <hr />
                    <a
                      onClick={() => {
                        if (JSON.parse(localStorage.getItem("userLogged"))) {
                          localStorage.removeItem("userLogged");
                        }
                        signIn("google", {
                          callbackUrl: `${window.location.origin}/`,
                        });
                      }}
                      className="btn btn-google btn-user btn-block"
                    >
                      <i className="fab fa-google fa-fw"></i> Register with
                      Google
                    </a>
                    <a
                      onClick={() =>
                        signIn("facebook", {
                          callbackUrl: `${window.location.origin}/`,
                        })
                      }
                      className="btn btn-facebook btn-user btn-block"
                    >
                      <i className="fab fa-facebook-f fa-fw"></i> Register with
                      Facebook
                    </a>
                  </form>
                  <hr />
                  <div className="text-center">
                    <Link href={"/login-screens/forgot-password"}>
                      <a className="small">Forgot Password?</a>
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link href={"/login-screens/login"}>
                      <a className="small">Already have an account? Login!</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Bootstrap core JavaScript--> */}
      {/* <script src="vendor/jquery/jquery.min.js"></script>
      <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script> */}

      {/* <!-- Core plugin JavaScript--> */}
      {/* <script src="vendor/jquery-easing/jquery.easing.min.js"></script> */}

      {/* <!-- Custom scripts for all pages--> */}
      {/* <script src="js/sb-admin-2.min.js"></script> */}
    </div>
  );
}

export default Register;
