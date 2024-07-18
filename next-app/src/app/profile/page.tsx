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

  if (loading) return <p>Loading...</p>;

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
    <div className="container py-20">
      <div className="p-2 text-center">
        <h2 className="text-xl">{data.me.username} profile</h2>
      </div>
      <div className="mx-auto max-w-sm">
        <p>Your Email: {data.me.email}</p>
        <p>Sales: </p>
        {userSales.map((sale: ISale) => (
          <div key={sale._id} className="mb-4">
            <h3>{sale.title}</h3>
            <p>{sale.description}</p>
            <button onClick={() => setFormState({ saleId: sale._id, title: sale.title })}>Edit</button>
            <button
              onClick={async () => {
                await deleteSale({ variables: { _id: sale._id } });
              }}
            >
              Delete
            </button>
          </div>
        ))}

        <p>Favorites: </p>
        {data.me.favorites.map((favorite: iFavorite) => (
          <div key={favorite._id} className="mb-4">
            <h3>{favorite.title}</h3>
            <p>{favorite.description}</p>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="mt-4">
          <input type="text" value={formState.title} onChange={(e) => setFormState({ ...formState, title: e.target.value })} placeholder="Sale title" required className="mb-2 block w-full border p-2 text-black" />
          <button type="submit" className="block w-full bg-blue-500 py-2 text-white">
            {formState.saleId ? "Update Sale" : "Add Sale"}
          </button>
        </form>
      </div>
    </div>
  );
}
