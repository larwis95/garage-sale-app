"use client";
import { useContext, createContext, useState } from "react";

interface INotiFication {
  message: string | null;
  type: "error" | "success";
}

type NotificationContext = {
  notification: INotiFication;
  setNotification: React.Dispatch<React.SetStateAction<INotiFication>>;
};

export const Notification = createContext<NotificationContext>({
  notification: { message: null, type: "success" },
  setNotification: () => {},
});

export default function NotificationProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [notification, setNotification] = useState<INotiFication>({ message: "", type: "success" });

  return <Notification.Provider value={{ notification, setNotification }}>{children}</Notification.Provider>;
}
