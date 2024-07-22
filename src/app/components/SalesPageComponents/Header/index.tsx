import { useContext, useRef, useState, useEffect } from "react";
import ownerContext from "@/app/providers/Owner";
import { Notification } from "@/app/providers/Notification";
import AddItemModal from "../Modals/AddItem";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_FAVORITE, DELETE_FAVORITE } from "@/app/libs/auth/api/graphql/mutations";
import { GET_ME } from "@/app/libs/auth/api/graphql/queries";

interface ISaleHeaderProps {
  title: string;
  description: string;
  start: string;
  end: string;
}

interface Favorites {
  _id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export default function SaleHeader({ title, description, start, end }: ISaleHeaderProps) {
  const { isOwner } = useContext(ownerContext);
  const { setNotification } = useContext(Notification);
  const { id } = useParams();
  const [addFavorite] = useMutation(ADD_FAVORITE, {
    refetchQueries: [{ query: GET_ME }],
  });
  const [deleteFavorite] = useMutation(DELETE_FAVORITE, {
    refetchQueries: [{ query: GET_ME }],
  });
  const { data } = useQuery(GET_ME);
  const modalRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"additem" | "edititem" | "editsale">("additem");

  const favorites = data?.me?.favorites || [];
  const user = data?.me || {};
  const isFavorited = favorites.find((f: Favorites) => f._id === id);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setModalOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  const handleAddFavorite = async () => {
    try {
      const { data } = await addFavorite({
        variables: {
          saleId: id,
        },
      });
      if (data.errors) {
        throw new Error("Error adding favorite");
      } else {
        setNotification({
          message: "Sale favorited",
          type: "success",
        });
      }
    } catch (error) {
      setNotification({
        message: "Error adding favorite",
        type: "error",
      });
    }
  };

  const handleDeleteFavorite = async () => {
    try {
      const { data } = await deleteFavorite({
        variables: {
          saleId: id,
        },
      });
      if (data.errors) {
        throw new Error("Error deleting favorite");
      } else {
        setNotification({
          message: "Sale unfavorited",
          type: "success",
        });
      }
    } catch (error) {
      setNotification({
        message: "Error deleting favorite",
        type: "error",
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <>
      {user._id && (
        <div className="fixed right-0 top-[15%] z-[49] flex items-center">
          <motion.button className="absolute -left-5 z-[49] m-auto flex h-8 w-8 items-center justify-center rounded-full border border-teal-500 bg-black p-4 text-center hover:scale-105 hover:bg-white hover:text-black" onClick={() => setMenuOpen(!menuOpen)} animate={menuOpen ? { translateX: 100 } : { translateX: 10 }} transition={{ duration: 1, type: "tween" }}>
            <motion.p animate={menuOpen ? { rotate: 180 } : { rotate: 0 }} transition={{ duration: 1, type: "tween" }}>
              ➤
            </motion.p>
          </motion.button>
          <motion.div className="z-[48] flex h-fit w-fit flex-col justify-start rounded-lg border border-teal-500 bg-slate-800 p-4" animate={menuOpen ? { translateX: 100 } : { translateX: 10 }} transition={{ duration: 1, type: "tween" }}>
            {isOwner && (
              <>
                <p
                  className="cursor-pointer text-yellow-300 transition duration-500 hover:scale-105 hover:text-cyan-500"
                  onClick={() => {
                    setModalOpen(true);
                    setModalType("additem");
                    document.body.style.overflow = "hidden";
                  }}
                >
                  Add Item
                </p>
              </>
            )}
            {!isOwner && user._id && (
              <>
                {isFavorited ? (
                  <p className="cursor-pointer text-yellow-300 transition duration-500 hover:scale-105 hover:text-red-500" onClick={handleDeleteFavorite}>
                    Unfavorite
                  </p>
                ) : (
                  <p className="cursor-pointer text-yellow-300 transition duration-500 hover:scale-105 hover:text-green-500" onClick={handleAddFavorite}>
                    Favorite
                  </p>
                )}
              </>
            )}
          </motion.div>
        </div>
      )}
      <AnimatePresence>{modalOpen && modalType === "additem" && <AddItemModal ref={modalRef} setIsOpen={setModalOpen} />}</AnimatePresence>
      <div className="flex min-h-[50%] w-screen items-center justify-center">
        <div className="relative flex w-full flex-col items-center justify-center rounded-lg border border-teal-500 bg-slate-800 p-4 align-top lg:w-1/2">
          <div className="flex min-h-max flex-col flex-wrap items-center justify-center gap-2 p-4 text-center">
            <h2 className="text-4xl text-yellow-300">{title}</h2>
            <p className="text-center text-lg text-white">{description}</p>
            <small className="text-center text-sm text-gray-300">
              {start} - {end}
            </small>
          </div>
        </div>
      </div>
    </>
  );
}
