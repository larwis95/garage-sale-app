"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../libs/auth/api/graphql/queries";
import { ADD_SALE, UPDATE_SALE, DELETE_SALE, DELETE_FAVORITE } from "../libs/auth/api/graphql/mutations";
import { format } from "date-fns";
import Link from "next/link";
import { Notification } from "../providers/Notification";
import Auth from "../libs/auth/frontend";

interface ISale {
  _id: string;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
}

interface IFormState {
  saleId?: string | null;
  title?: string;
  description?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  discount?: number;
  recurring?: boolean;
}

interface iFavorite {
  _id: string;
  title: string;
  description: string;
}

export default function Profile() {
  const { data, loading } = useQuery(GET_ME);
  const userSales = data?.me?.sales || [];
  const [formState, setFormState] = useState<IFormState>({ saleId: null, title: "" });
  const { setNotification } = useContext(Notification);
  const ref = useRef<HTMLFormElement>(null);

  const [addSale] = useMutation(ADD_SALE, {
    refetchQueries: [{ query: GET_ME }],
  });

  const [updateSale] = useMutation(UPDATE_SALE, {
    refetchQueries: [{ query: GET_ME }],
  });

  const [deleteSale] = useMutation(DELETE_SALE, {
    refetchQueries: [{ query: GET_ME }],
  });

  const [deleteFavorite] = useMutation(DELETE_FAVORITE, {
    refetchQueries: [{ query: GET_ME }],
  });

  useEffect(() => {
    if (!Auth.loggedIn()) {
      window.location.replace("/login");
    }
  });

  if (loading) return <p className="h-screen py-20 text-center">Loading...</p>;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState);
    try {
      if (formState.saleId) {
        const { data } = await updateSale({ variables: { ...formState } });
        if (data.errors) {
          throw new Error("Error updating sale!");
        }
        setNotification({ type: "success", message: "Sale update success!" });
      } else {
        const { data } = await addSale({ variables: { ...formState } });
        if (data.errors) {
          throw new Error("Error adding sale!");
        }
        setNotification({ type: "success", message: "Sale added success!" });
      }
      setFormState({ title: "", description: "", startDate: "", endDate:"", location: "", saleId: null });
    } catch (err: any) {
      setNotification({ type: "error", message: err.message });
    }
  };

  return (
    <div className="h-screen w-screen">
      <div className="py-20">
        <div className="flex flex-col">
          <div className="md:mx-20 items-center justify-center rounded-lg border border-teal-500 bg-slate-800 p-4 text-center shadow-md shadow-teal-500/50">
            <h2 className="text-3xl font-bold text-yellow-300">{data.me.username} profile</h2>
            <p className="py-2 text-center text-xl font-bold text-yellow-300">Your Email: {data.me.email}</p>
          </div>
        </div>
        {/* Sales and Favorite container */}
        <div className="m-5 flex flex-col sm:flex-col md:flex-row">
          {/* Sales container */}
          <div className="m-1 max-h-fit min-h-fit rounded-lg border border-teal-500 bg-slate-800 p-4 shadow-md shadow-teal-500/50 sm:w-full md:w-1/2">
            <p className="m-2 p-2 text-xl font-bold text-yellow-300">Your Sales: </p>
            {userSales.map((sale: ISale) => (
              <div key={sale._id} className="my-3 max-h-fit min-h-fit rounded-lg border border-teal-500 bg-slate-700 p-2 shadow-md shadow-teal-500/50">
                <h3 className="py-1 text-white">Title: {sale.title}</h3>
                <p className="py-1 text-white">Description: {sale.description}</p>
                <p className="py-1 text-white">Start-date: {format(new Date(sale.startDate).toLocaleString([], { timeZone: "UTC" }), "MM/dd/yy")}</p>
                <p className="py-1 text-white">End-date: {format(new Date(sale.endDate).toLocaleString([], { timeZone: "UTC" }), "MM/dd/yy")}</p>
                <p className="py-1 text-white">Location: {sale.location}</p>
                <Link className="rounded-lg border border-solid border-teal-500 bg-slate-800 p-1 text-yellow-500 shadow-md shadow-teal-500/50 transition duration-500 hover:scale-110 hover:bg-slate-400 hover:font-bold hover:text-black hover:shadow-lg hover:shadow-teal-500/50" href={`/sales/${sale._id}`}>
                  View Sale
                </Link>
                <div className="flex justify-end">
                  <button className="m-1 rounded bg-blue-500 p-2 shadow-md shadow-slate-300/50 transition duration-500 hover:scale-110 hover:bg-blue-700 hover:font-bold"
                  onClick={() => {setFormState({ saleId: sale._id, title: sale.title, description: sale.description, startDate: sale.startDate, endDate: sale.endDate, location: sale.location })
                  ref?.current?.scrollIntoView({ behavior: 'smooth'})
                  }}
                  >
                    Edit
                  </button>
                  <button
                    className="m-1 rounded bg-red-500 p-1 shadow-md shadow-slate-300/50 transition duration-500 hover:scale-110 hover:bg-red-700 hover:font-bold"
                    onClick={async () => {
                      try {
                        const { data } = await deleteSale({ variables: { _id: sale._id } });
                        if (data.errors) {
                          throw new Error("Error deleting sale!");
                        }
                        setNotification({ type: "success", message: "Delete sale success!" });
                      } catch (err: any) {
                        setNotification({ type: "error", message: err.message });
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* favorite container */}
          <div className="m-1 max-h-fit min-h-fit rounded-lg border border-teal-500 bg-slate-800 p-4 shadow-md shadow-teal-500/50 sm:w-full md:w-1/2">
            <p className="m-2 p-2 text-xl font-bold text-yellow-300">Favorites: </p>
            {data.me.favorites.map((favorite: iFavorite) => (
              <div key={favorite._id} className="my-3 max-h-fit min-h-fit rounded-lg border border-teal-500 bg-slate-700 p-2 shadow-md shadow-teal-500/50">
                <h3 className="py-1 text-white">Title: {favorite.title}</h3>
                <p className="py-1 text-white">Description: {favorite.description}</p>
                <Link className="rounded-lg border border-solid border-teal-500 bg-slate-800 p-1 text-yellow-500 shadow-md shadow-teal-500/50 transition duration-500 hover:scale-105 hover:bg-slate-400 hover:font-bold hover:text-black hover:shadow-lg hover:shadow-teal-500/50" href={`/sales/${favorite._id}`}>
                  View Favorite
                </Link>
                <div className="flex justify-end">
                  <button
                    className="m-1 rounded bg-red-500 p-1 shadow-md shadow-slate-300/50 transition duration-500 hover:scale-110 hover:bg-red-700 hover:font-bold"
                    onClick={async () => {
                      try {
                        const { data } = await deleteFavorite({ variables: { _id: favorite._id } });
                        if (data.errors) {
                          throw new Error("Error deleting sale!");
                        }
                        setNotification({ type: "success", message: "Delete sale success!" });
                      } catch (err: any) {
                        setNotification({ type: "error", message: err.message });
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* add edit sales container */}
        <div className="flex w-full flex-row justify-center p-4 mb-20">
          <div className="w-full rounded-lg border border-teal-500 bg-slate-800 p-4 shadow-md shadow-teal-500/50 md:w-1/2 lg:w-1/2">
            <form ref={ref} onSubmit={handleSubmit} className="m-2 flex flex-col">
              <p className="m-2 p-2 text-xl font-bold text-yellow-300">{formState.saleId ? "Edit Sale:" : "Add Sale:"} </p>
              {/* Title input */}
              <input type="text " value={formState.title} onChange={(e) => setFormState({ ...formState, title: e.target.value })} placeholder="Sale title" required className="my-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
              {/* Description Input */}
              <textarea value={formState.description} onChange={(e) => setFormState({ ...formState, description: e.target.value })} placeholder="Sale description" required className="my-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
              {/* Start date Input */}
              <input type="date" value={formState.startDate} onChange={(e) => setFormState({ ...formState, startDate: e.target.value })} placeholder="Start Date" required className="my-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
              {/* End date Input */}
              <input type="date" value={formState.endDate} onChange={(e) => setFormState({ ...formState, endDate: e.target.value })} placeholder=" End Date" required className="my-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
              {/* Location Input */}
              <input type="text" value={formState.location} onChange={(e) => setFormState({ ...formState, location: e.target.value })} placeholder="Location" required className="my-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
              {/* button for submit */}
              <button type="submit" className="m-2 rounded bg-blue-500 py-2 text-white shadow-md shadow-slate-300/50 transition duration-500 hover:scale-105 hover:bg-blue-600 hover:font-bold hover:shadow-md hover:shadow-slate-300/50">
                {formState.saleId ? "Update Sale" : "Add Sale"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
