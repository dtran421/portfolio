"use client";

import { ReactNode, useMemo } from "react";
import { IconContext } from "react-icons";
import { cn } from "utils-toolkit";

type ContactLabelProps = {
  label: string;
  icon: ReactNode;
  special?: boolean;
};

const ContactLabel = ({ label, icon, special = false }: ContactLabelProps) => {
  const iconContext = useMemo(
    () => ({
      className: "dark:text-white",
    }),
    []
  );

  return (
    <IconContext.Provider value={iconContext}>
      <div className={cn("flex dark:text-white space-x-2", !special ? "items-center" : "items-start")}>
        <span className="bg-zinc-200/75 dark:bg-zinc-700/75 rounded-full p-2">{icon}</span>
        <p className={cn("text-sm lg:text-lg", special && "italic")}>{label}</p>
      </div>
    </IconContext.Provider>
  );
};

export default ContactLabel;
