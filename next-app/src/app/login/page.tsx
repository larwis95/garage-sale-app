"use client";

import Auth from "../libs/auth/frontend";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../libs/auth/api/graphql/mutations";

export default function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
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
    <div className="container py-20">
    <div className="text-center">
      <h2 className="font-extrabold">LOGIN</h2>
    </div>
    <form className="max-w-sm mx-auto" onSubmit={handleFormSubmit}>
      <div className='mb-5'>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder="Your email"
        name="email"
        type="email"
        value={formState.email}
        onChange={handleChange}/>
        <small id="emailHelp">We'll never shared your email.</small>
      </div>
      <div className='mb-5'>
        <label for='password' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="******"
        name="password"
        type="password"
        value={formState.password}
        onChange={handleChange}/>
      </div>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Submit</button>
    </form>
    </div>
  )
}
