import React, { useEffect, useState } from "react";
import { getProviders, signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  pwd: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

function Login({ providers }) {
  const router = useRouter();
  const { data: session, status } = useSession();
 

  const classnames = ["fab fa-google fa-fw", "fab fa-facebook-f fa-fw"];
  const [userCred, setuserCred] = useState({
    email: "",
    pwd: "",
  });
  const handleChange = (e) => {
    setuserCred({ ...userCred, [e.target.name]: e.target.value });
  };

  const handleLogin = (userCred) => {
    console.log(userCred);
    if (JSON.parse(localStorage.getItem("userRecordStr")) == null) {
      toast.error("Please register first", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      if (session) {
        signOut();
      }
      const userRecord = JSON.parse(localStorage.getItem("userRecordStr"));
      const userLogged = userRecord.filter((record) => {
        return record.email == userCred.email && record.pwd == userCred.pwd;
      });

     if (userCred.remember) {
       
       localStorage.setItem("userLogged", JSON.stringify(userLogged));
       userLogged[0]?.email == userCred.email &&
       userLogged[0]?.pwd == userCred.pwd
         ? (toast.success("Login Successfull", {
             position: toast.POSITION.BOTTOM_RIGHT,
           }),
           router.push("/"))
         : toast.error("Login Failed!!", {
             position: toast.POSITION.BOTTOM_RIGHT,
           });
     }
     else{
      sessionStorage.setItem("userLogged", JSON.stringify(userLogged));
      userLogged[0]?.email == userCred.email &&
      userLogged[0]?.pwd == userCred.pwd
        ? (toast.success("Login Successfull", {
            position: toast.POSITION.BOTTOM_RIGHT,
          }),
          router.push("/"))
        : toast.error("Login Failed!!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
     }
    }
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      pwd: "",
      remember:false
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
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form
                        className="user"
                        noValidate
                        onSubmit={handleSubmit(async (data) => {
                          console.log(data);
                          handleLogin(data);
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
                        <div className="form-group">
                          <Controller
                            render={({ field }) => (
                              <>
                                <input
                                  type="password"
                                  className="form-control form-control-user"
                                  id="exampleInputPassword"
                                  {...field}
                                  placeholder="Password"
                                />
                                <ErrorMessage errors={errors} name="pwd" />
                              </>
                            )}
                            name="pwd"
                            control={control}
                          />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                          <Controller
                            render={({ field }) => (
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                             {...field}
                             onChange={(e) => field.onChange(e.target.checked)}
                             checked={field.value}
                            />
                            )}
                            name="remember"
                            control={control}
                          />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-user btn-block"
                        >
                          Login
                        </button>
                        <hr />

                        {Object.values(providers)?.map((provider, index) => {
                          return (
                            <a
                              key={index}
                              className={`btn btn-${provider.id} btn-user btn-block`}
                              onClick={() => {
                                signIn(provider.id, {
                                  callbackUrl: `${window.location.origin}/`,
                                });
                              }}
                            >
                              <i className={classnames[index]}></i> Login with{" "}
                              {provider.name}
                            </a>
                          );
                        })}
                      </form>
                      <hr />
                      <div className="text-center">
                        <Link href={"/login-screens/forgot-password"}>
                          <a className="small">Forgot Password?</a>
                        </Link>
                      </div>
                      <div className="text-center">
                        <Link href={"/login-screens/register"}>
                          <a className="small">Create an Account!</a>
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
    </div>
  );
}
export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}
export default Login;
