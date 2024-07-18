"use client";

import Auth from "../libs/auth/frontend";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../libs/auth/api/graphql/mutations";
import { useContext } from "react";
import { Notification } from "../providers/Notification";

export default function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const { notification, setNotification } = useContext(Notification);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      if (data.errors) throw new Error(data.errors[0].message);

      Auth.login(data.login.token);
    } catch (e: any) {
      setNotification({ message: e.message, type: "error" });
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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="font-extrabold text-white">LOGIN</h2>
      </div>
      <form className="mx-auto max-w-sm rounded-lg border border-teal-500 bg-slate-600 p-4" onSubmit={handleFormSubmit}>
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-white dark:text-white">Email address</label>
          <input className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Your email" name="email" type="email" value={formState.email} onChange={handleChange} />
        </div>
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-white dark:text-white">Password</label>
          <input className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="******" name="password" type="password" value={formState.password} onChange={handleChange} />
        </div>
        <button className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
