"use client";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../libs/auth/api/graphql/queries";
import { ADD_SALE, UPDATE_SALE, DELETE_SALE } from "../libs/auth/api/graphql/mutations";

interface ISale {
  _id: string;
  title?: string;
  description?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  discount?: number;
  recurring?: boolean;
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

  const [addSale] = useMutation(ADD_SALE, {
    refetchQueries: [{ query: GET_ME }],
  });

  const [updateSale] = useMutation(UPDATE_SALE, {
    refetchQueries: [{ query: GET_ME }],
  });

  const [deleteSale] = useMutation(DELETE_SALE, {
    refetchQueries: [{ query: GET_ME }],
  });

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  if (loading) return <p className="h-screen text-center py-20 ">Loading...</p>;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState);
    if (formState.saleId) {
      await updateSale({ variables: { saleId: formState.saleId, title: formState.title } });
    } else {
      await addSale({ variables: { title: formState.title } });
    }
    setFormState({ title: "", saleId: null });
  };

  return (
    <div className="h-screen w-screen">
      <div className="py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-yellow-300">{data.me.username} profile</h2>
        </div>

        <div className="grid m-5">
          <p className="py-2 text-xl font-bold text-yellow-300 text-center">Your Email: {data.me.email}</p>
          <div className="container max-w-md my-2 rounded border-solid border-2 border-white">
            <p className="m-2 p-2 text-xl font-bold text-yellow-300">Your Sales: </p>
            {userSales.map((sale: ISale) => (
              <div key={sale._id} className="p-2 m-2 rounded border-solid border-white border-2">
                <h3 className="py-1 text-xl font-bold text-yellow-300">{sale.title}</h3>
                <p className="py-1">{sale.description}</p>
                <button
                  className="m-1 p-1 rounded bg-blue-500 hover:bg-blue-600"
                  onClick={() => setFormState({ saleId: sale._id, title: sale.title })}>Edit</button>
                <button
                  className="m-1 p-1 rounded bg-red-500 hover:bg-red-600"
                  onClick={async () => {
                    await deleteSale({ variables: { _id: sale._id } });
                  }}
                  >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="container my-2 border-solid border-2 border-white rounded">
            <p className="m-2 p-2 text-xl font-bold text-yellow-300">Favorites: </p>
            {data.me.favorites.map((favorite: iFavorite) => (
              <div key={favorite._id} className="mb-4">
                <h3>{favorite.title}</h3>
                <p>{favorite.description}</p>
              </div>
            ))}
          </div>

          <div className="container text-center my-2 py-2 border-solid border-2 border-white rounded">
            <form onSubmit={handleSubmit} className="flex flex-col m-2">
              <p className="py-2 text-xl font-bold text-yellow-300">{formState.saleId ? "Edit Sale:" : "Add Sale:"} </p>
              <input type="text " value={formState.title} onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                placeholder="Sale title" required
                className="py-2 m-2 border text-black rounded" />
              <button type="submit" className="m-2 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
                {formState.saleId ? "Update Sale" : "Add Sale"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
