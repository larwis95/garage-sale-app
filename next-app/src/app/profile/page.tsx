'use client';
import React, { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../libs/auth/api/graphql/queries";
import { ADD_SALE, UPDATE_SALE, DELETE_SALE } from "../libs/auth/api/graphql/mutations";

export default function Profile() {
  const { data, loading, refetch } = useQuery(GET_ME);
  const [formState, setFormState] = useState({ title: '', id: null });
  
  const [addSale] = useMutation(ADD_SALE, {
    onCompleted: () => refetch(),
  });

  const [updateSale] = useMutation(UPDATE_SALE, {
    onCompleted: () => refetch(),
  });

  const [deleteSale] = useMutation(DELETE_SALE, {
    onCompleted: () => refetch(),
  });

  if (loading) return <p>Loading...</p>;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formState.id) {
      await updateSale({ variables: { id: formState.id, title: formState.title} });
    } else {
      await addSale({ variables: { title: formState.title} });
    }
    setFormState({ title: '', id: null });
  };

  const handleEdit = (sale) => {
    setFormState({ title: sale.title, id: sale._id });
  };

  const handleDelete = async (id) => {
    await deleteSale({ variables: { id } });
  };

  return (
    <div className="container py-20">
      <div className="text-center p-2">
        <h2 className="text-xl">{data.me.username} profile</h2>
      </div>
      <div className="max-w-sm mx-auto">
        <p>Your Email: {data.me.email}</p>
        <p>Sales: </p>
        {data.me.sales.map((sale) => (
          <div key={sale._id} className="mb-4">
            <h3>{sale.title}</h3>
            <p>{sale.description}</p>
            <button onClick={() => handleEdit(sale)}>Edit</button>
            <button onClick={() => handleDelete(sale._id)}>Delete</button>
          </div>
        ))}

        <p>Favorites: </p>
        {data.me.favorites.map(favorite => (
          <div key={favorite._id} className="mb-4">
            <h3>{favorite.title}</h3>
            <p>{favorite.description}</p>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            value={formState.title}
            onChange={(e) => setFormState({ ...formState, title: e.target.value })}
            placeholder="Sale title"
            required
            className="block w-full p-2 mb-2 border text-black"
          />
          <button type="submit" className="block w-full py-2 bg-blue-500 text-white">
            {formState.id ? 'Update Sale' : 'Add Sale'}
          </button>
        </form>
      </div>
    </div>
  );
}
