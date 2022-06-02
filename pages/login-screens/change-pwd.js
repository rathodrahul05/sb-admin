import Link from "next/link";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  Repassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password is required"),
});

function ChangePassword() {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: "",
      Repassword: "",
    },
  });

  const changePwd = (data) => {
    if (JSON.parse(localStorage.getItem("userRecordStr")) == null) {
      toast.error("There are currently no users registered!!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      router.push("/login-screens/register");
    } else {
      const userRecord = JSON.parse(localStorage.getItem("userRecordStr"));
      const resetEmail = JSON.parse(localStorage.getItem("resetEmail"));
      let index = userRecord.findIndex((record) => record.email == resetEmail);
      console.log(index);
      const usersPwdToChange = userRecord.filter((record) => {
        return record.email == resetEmail;
      });
      let [obj] = [...usersPwdToChange];
      console.log(obj);
      obj = { ...obj, pwd: data.password, repeatpwd: data.Repassword };
      userRecord[index] = obj;
      console.log(userRecord);
      localStorage.setItem("userRecordStr", JSON.stringify(userRecord));
      console.log(obj);
      toast.success("Password Changed Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      router.push("/login-screens/login");
    }
  };
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
                          Change Password
                        </h1>
                        {/* <p className="mb-4">
                          We get it, stuff happens. Just enter your email
                          address below and we'll send you a link to reset your
                          password!
                        </p> */}
                      </div>
                      <form
                        className="user"
                        noValidate
                        onSubmit={handleSubmit(async (data) => {
                          console.log(data);
                          changePwd(data);

                        })}
                      >
                        <div className="form-group">
                          <Controller
                            render={({ field }) => (
                              <>
                                <input
                                  {...field}
                                  type="password"
                                  className="form-control form-control-user"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  placeholder="New Password"
                                />
                                <ErrorMessage errors={errors} name="password" />
                              </>
                            )}
                            name="password"
                            control={control}
                          />
                        </div>

                        <div className="form-group">
                          <Controller
                            render={({ field }) => (
                              <>
                                <input
                                  {...field}
                                  type="password"
                                  className="form-control form-control-user"
                                  id="exampleInputEmail2"
                                  aria-describedby="emailHelp"
                                  placeholder="Repeat Password"
                                />
                                <ErrorMessage
                                  errors={errors}
                                  name="Repassword"
                                />
                              </>
                            )}
                            name="Repassword"
                            control={control}
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-user btn-block"
                        >
                          Change Password
                        </button>
                      </form>
                      <hr />
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

export default ChangePassword;
