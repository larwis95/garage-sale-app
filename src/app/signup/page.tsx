"use client";
import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { Notification } from "../providers/Notification";

import Auth from "../libs/auth/frontend";

import { ADD_USER } from "../libs/auth/api/graphql/mutations";

export default function Signup() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const { setNotification } = useContext(Notification);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
      if (data.errors) throw new Error("An error occurred, check all required fields and try again");
    } catch (e: any) {
      if (e.message.includes("null")) {
        setNotification({ message: "Please fill out all fields to sign up.", type: "error" });
      } else {
        setNotification({ message: e.message, type: "error" });
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="flex h-screen flex-col items-center">
      <div className="container py-20">
        <div className="text-center">
          <h2 className="m-2 p-2 text-xl font-bold text-yellow-300">SIGN UP</h2>
        </div>

        <form className="mx-auto max-w-sm rounded-lg border border-teal-500 bg-slate-800 p-4 shadow-md shadow-teal-500/50" onSubmit={handleFormSubmit}>
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-white dark:text-white">Username</label>
            <input className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Your username" name="username" type="text" value={formState.username} onChange={handleChange} />
          </div>
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-white dark:text-white">Email</label>
            <input className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Your email" name="email" type="email" value={formState.email} onChange={handleChange} />
          </div>
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-white dark:text-white">Password</label>
            <input className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="******" name="password" type="password" value={formState.password} onChange={handleChange} />
          </div>
          <button className="w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-md transition duration-500 hover:scale-105" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
