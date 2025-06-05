"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface DbUser {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
}

const Dashboard = () => {
  const [dbData, setDbData] = useState<DbUser[] | null>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/alluser`);
      const result = await res.json();
      console.log(result);
      setDbData(result);
    };
    fetchUser();
  }, [session]);

  return (
    <div className="w-full">
      {/* card */}
      <div className="card w-full">
        <div className="flex flex-1/12 flex-wrap p-10 gap-5 items-center justify-center ">
          <div className=" p-3 rounded-md bg-white shadow-2xs shadow-dash-primary ">
            Total Courses
          </div>
          <div className="p-3  rounded-md bg-white shadow-2xs shadow-dash-primary ">
            Total Courses
          </div>
          <div className="p-3   rounded-md bg-white shadow-2xs shadow-dash-primary ">
            Total Courses
          </div>
          <div className="p-3 rounded-md bg-white shadow-2xs shadow-dash-primary ">
            Total Courses
          </div>
          <div className="p-3 rounded-md bg-white shadow-2xs shadow-dash-primary ">
            Total Courses
          </div>
          <div className="p-3 rounded-md bg-white shadow-2xs shadow-dash-primary ">
            Total Courses
          </div>
          <div className="p-3 rounded-md bg-white shadow-2xs shadow-dash-primary ">
            Total Courses
          </div>{" "}
          <div className="p-3 rounded-md bg-white shadow-2xs shadow-dash-primary ">
            Total Courses
          </div>
        </div>
      </div>
      <div className="w-full px-30">
        {/* users list */}
        <h1 className="text-lg capitalize font-semibold text-dash-primary">
          {" "}
          Recent Registered Users
        </h1>

        <div className="w-[50%] bg-white rounded-sm shadow-dash-primary shadow-2xs p-10">
          <Table className="text-[12px] font-semibold">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dbData &&
                dbData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {!user.image ? (
                        <img
                          src="/defaultuser.jpeg"
                          alt={user.name}
                          className="w-[30px] h-[30px] rounded-md "
                        />
                      ) : (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-[30px] h-[30px] rounded-md "
                        />
                      )}
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      {!user.role ? "Verified" : "Not verified"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        {/* courses list */}
        <div className="w-[50%]"></div>
      </div>
    </div>
  );
};

export default Dashboard;
