import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid email address"),
});

function ForgotPassword() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="bg-gradient-primary">
      <div className="container">
        {/* <!-- Outer Row --> */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-2">
                          Forgot Your Password?
                        </h1>
                        <p className="mb-4">
                          We get it, stuff happens. Just enter your email
                          address below and we ll send you a link to reset your
                          password!
                        </p>
                      </div>
                      <form
                        className="user"
                        noValidate
                        onSubmit={handleSubmit(async (data) => {
                          console.log(data);
                          if (
                            JSON.parse(localStorage.getItem("userRecordStr")) ==
                            null
                          ) {
                            
                            toast.error("Please register first!!! no user records", {
                              position: toast.POSITION.BOTTOM_RIGHT,
                            });
                            router.push("/login-screens/register");
                          } else {
                            const userRecord = JSON.parse(
                              localStorage.getItem("userRecordStr")
                            );
                            const user = userRecord.filter((record) => {
                              return record.email == data.email;
                            });
                            if (user.length == 0) {
                              
                              toast.error("This user do not exists", {
                                position: toast.POSITION.BOTTOM_RIGHT,
                              });
                              
                            } else {
                              localStorage.setItem(
                                "resetEmail",
                                JSON.stringify(data.email)
                              );
                              router.push("/login-screens/change-pwd");
                            }
                          }
                        })}
                      >
                        <div className="form-group">
                          <Controller
                            render={({ field }) => (
                              <>
                                <input
                                  type="email"
                                  className="form-control form-control-user"
                                  id="exampleInputEmail"
                                  {...field}
                                  aria-describedby="emailHelp"
                                  placeholder="Enter Email Address..."
                                />
                                <ErrorMessage errors={errors} name="email" />
                              </>
                            )}
                            name="email"
                            control={control}
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-user btn-block"
                        >
                          Reset Password
                        </button>
                      </form>
                      <hr />
                      <div className="text-center">
                        <Link href={"/login-screens/register"}>
                          <a className="small">Create an Account!</a>
                        </Link>
                      </div>
                      <div className="text-center">
                        <Link href={"/login-screens/login"}>
                          <a className="small">
                            Already have an account? Login!
                          </a>
                        </Link>
                      </div>
                    </div>
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

export default ForgotPassword;
