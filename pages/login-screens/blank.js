import React, { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BlankForm from "../../src/components/BlankForm";
import { httpHelper } from "../../src/helper/httpHelper";
import FullLayout from "../../src/layouts/FullLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// context
export const userStateContext = createContext({
  users: [],
  setUsers: () => {},
  fetchUsers: () => {},
  addUsers: () => {},
  deleteUsers: () => {},
  isedit: null,
  setIsEdit: () => {},
  register: {},
  handleSubmit: () => {},
  setValue: () => {},
  reset: () => {},
  editUsers: () => {},
  control: {},
  getValues: () => {},
  errors:{}
});

const schema = yup
  .object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be a valid email address"),
      gender: yup.string().required('gender is required'),
      location: yup.string().required('Location is required'),
      
  })
  .required();

export default function Blank() {
  const [isedit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      technicalSkills: [],
      location: "",
    },
    resolver: yupResolver(schema),
  });

  const [users, setUsers] = useState([]);

  const api = httpHelper();
  const url = process.env.NEXT_PUBLIC_URL;

  const fetchUsers = () => {
    api
      .get(url)
      .then((response) => {
        setUsers(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addUsers = (data) => {
    api.post(url, { body: data }).then(() => {
      fetchUsers();
    });
  };

  const deleteUsers = (id) => {
    api.del(`${url}/${id}`).then(() => {
      fetchUsers();
    });
  };
  const editUsers = (id, data) => {
    api.put(`${url}/${id}`, { body: data }).then(() => {
      fetchUsers();
    });
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <userStateContext.Provider
      value={{
        users,
        setUsers,
        fetchUsers,
        addUsers,
        deleteUsers,
        isedit,
        setIsEdit,
        register,
        handleSubmit,
        setValue,
        reset,
        editUsers,
        control,
        getValues,
        errors
      }}
    >
      <BlankForm />;
    </userStateContext.Provider>
  );
}

Blank.getLayout = function PageLayout(page) {
  return (
    <>
      <FullLayout>{page}</FullLayout>
    </>
  );
};
