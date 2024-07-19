import { createContext } from "react";

interface IOwnerContext {
  isOwner: boolean;
  sale: string | null;
}

const ownerContext = createContext<IOwnerContext>({ isOwner: false, sale: null });

export default ownerContext;
