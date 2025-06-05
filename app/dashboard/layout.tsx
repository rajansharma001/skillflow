import DashboardShell from "@/components/dashboardComponents/DashboardShell";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SessionProvider>
      <DashboardShell>{children}</DashboardShell>
    </SessionProvider>
  );
};
export default DashboardLayout;
