"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";

import Auth from "../libs/auth/frontend";

import { ADD_USER } from "../libs/auth/api/graphql/mutations";

export default function Signup() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
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
    <>
    <div className="text-center">
      <h2 className="font-extrabold text-white">SIGN UP</h2>
    </div>

    <form onSubmit={handleFormSubmit} className="max-w-sm mx-auto">
      <div className='mb-5'>
        <label for='email' className="block mb-2 text-sm font-medium text-white dark:text-white">Username</label>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your username"
        name="username"
        type="text"
        value={formState.username}
        onChange={handleChange}/>
      </div>
      <div className='mb-5'>
        <label for='password' className="block mb-2 text-sm font-medium text-white dark:text-white">Email</label>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your email"
        name="email"
        type="email"
        value={formState.email}
        onChange={handleChange}/>
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-white dark:text-white">Password</label>
        <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="******"
        name="password"
        type="password"
        value={formState.password}
        onChange={handleChange} />
      </div>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Submit</button>
    </form>
    </>
  );
}
