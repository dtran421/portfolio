import { ReactNode } from "react";

type ContactLabelProps = {
  label: string;
  special?: boolean;
  icon: ReactNode;
};

const ContactLabel = ({ label, special = false, icon }: ContactLabelProps) => (
  <div className={`flex ${!special ? "items-center" : "items-start"} space-x-2`}>
    <span className="bg-zinc-200/75 dark:bg-zinc-700/75 rounded-full p-2">{icon}</span>
    <p className={`text-sm lg:text-lg ${special ? "italic" : ""}`}>{label}</p>
  </div>
);

export default ContactLabel;
