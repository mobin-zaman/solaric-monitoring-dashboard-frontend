import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation } from "react-query";
import { getUsers, deleteUser } from "@/lib/Helper";
import AddUserModal from "./addUserModal";
import { useState } from "react";

export default function Users() {
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);

  const { data, isLoading } = useQuery("users", () => getUsers(), {
    enabled: true, //enable query
  });

  console.log(data, isLoading);
  return (
    <>
      <div className="w-full pb-80 bg-white rounded-md p-4">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-[#373737] font-semibold text-xl">
                User Management
              </h1>
              <p className="text-[#373737] text-sm bg-gray-200 p-1 rounded-md">
                {data?.length} {data?.length < 2 ? "user" : "users"}
              </p>
            </div>
            <button
              className="px-3 py-1.5 text-md text-white font-semibold bg-[#39B54A] rounded-md"
              onClick={() => setAddUserModalOpen(true)}
            >
              Add User
            </button>
            {addUserModalOpen && (
              <AddUserModal addUserModalOpen={setAddUserModalOpen} />
            )}
          </div>
          <div className="space-y-1 border-y-[0.1rem] border-[#C1C0C0]">
            <div className="grid grid-cols-5 items-center h-9">
              <div className="flex justify-center font-medium">Name</div>
              <div className="flex items-center justify-center font-medium space-x-1.5">
                <span>Status</span>
                <FontAwesomeIcon icon={faArrowDown} />
              </div>
              <div className="flex justify-center font-medium">
                Email
              </div>
              <div className="flex justify-center font-medium">Role(s)</div>
              <div className=""></div>
            </div>
          </div>
        </div>
        {data?.map((user) => (
          <div
            className="space-y-2 border-b-[0.1rem] border-[#C1C0C0]"
            key={Math.random()}
          >
            <div className="grid grid-cols-5 items-center h-9">
              <div className="flex justify-center font-semibold">
                {user.name}
              </div>
              <div className="flex justify-center">
                {user.status ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#38EB1A] rounded-full"></div>
                    <span className="text-[#38EB1A] font-medium">Active</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#9EA09E] rounded-full"></div>
                    <span className="text-[#9EA09E] font-semibold">
                      Inactive
                    </span>
                  </div>
                )}
              </div>
              <div className="flex justify-center">{user.email}</div>
              <div className="flex justify-center">
                {user.role === "ADMIN" ? (
                  <div className="px-2 bg-[#9AA95C] text-white font-medium rounded-md">
                    Admin
                  </div>
                ) : null}
                {user.role === "ENGINEER" ? (
                  <div className="px-2 bg-[#BC4880] font-medium text-white rounded-md">
                    Engineer
                  </div>
                ) : null}
              </div>
              <div className="flex justify-center space-x-20">
                <button onClick={() => deleteUser(user.id)}>
                  <FontAwesomeIcon icon={faTrashCan} /> Delete
                </button>
                {deleteUserModalOpen && <deleteUserModalOpen deleteUserModalOpen={setDeleteUserModalOpen} />}
                <div>
                  <FontAwesomeIcon icon={faPenToSquare} /> Edit
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
