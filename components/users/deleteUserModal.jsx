import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation } from "react-query";
import { postUser } from "@/lib/Helper";

export default function AddUserModal({ addUserModalOpen }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState("ADMIN");
  const [address, setAddress] = useState('');

  console.log(name, email, password, confirmPassword, role, address);

  const { mutate } = useMutation(postUser);


  return (
    <>
      <div className="flex items-center bg-opacity-70 bg-gray-300 fixed inset-0 z-50">
          <div className="grid grid-cols-1 bg-white rounded-md items-center relative mx-auto p-6 w-[20rem] h-[30rem] sm:w-[26rem] sm:h-[38rem]">
            <div className="flex justify-between pb-3">
            <span className="text-[#373737] font-semibold text-2xl">Add New User</span>
              <button className="opacity-80" onClick={() => addUserModalOpen(false)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div className="flex flex-col">
            <div className=" text-[#373737] font-medium text-sm space-x-1">
            <div className="font-medium text-lg">Name</div>
            <div className="flex items-center border-b-2 border-[#168636]">
            <input
              className="w-full h-10 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
              type="text"
              placeholder="Enter user name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /></div>
          </div>
          <div className=" text-[#373737] font-medium text-sm py-2 space-x-1">
            <div className="font-medium text-lg">Email</div>
            <div className="flex items-center border-b-2 border-[#168636]">
            <input
              className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
              type="text"
              placeholder="Enter user email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /></div>
          </div>
          <div className=" text-[#373737] font-medium text-sm py-2 space-x-1">
            <div className="font-medium text-lg">Password</div>
            <div className="flex items-center border-b-2 border-[#168636]">
            <input
              className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
              type="text"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /></div>
          </div>
          <div className=" text-[#373737] font-medium text-sm py-2 space-x-1">
            <div className="font-medium text-lg">Confirm Password</div>
            <div className="flex items-center border-b-2 border-[#168636]">
            <input
              className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
              type="text"
              placeholder="Enter confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            /></div>
          </div>
          <div className="flex items-center space-x-3 text-[#373737] font-medium text-sm py-2">
            <div className="font-medium text-lg">Role: </div>
            <select className="w-1/2 h-10 border border-[#168636] rounded-md p-2 ring-0 focus:ring-0 focus:outline-none" onChange={(e) => setRole(e.target.value)}>
                <option value="ADMIN">Admin</option>
                <option value="ENGINEER">Engineer</option>
              </select>
          </div>
          <div className=" text-[#373737] font-medium text-sm py-2 space-x-1">
            <div className="font-medium text-lg">Address</div>
            <div className="flex items-center border-b-2 border-[#168636]">
            <input
              className="w-full h-10 px-2 text-md text-[#373737] placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            /></div>
          </div>
            </div>
            <div className="flex justify-end items-center">
              <button className="px-2.5 py-1.5 text-md text-white font-semibold bg-[#39B54A] rounded-md" onClick={addNewUser}>
                Add User
              </button>
            </div>
          </div>
      </div>
    </>
  );
}
