"use client";
import {signOut} from "next-auth/react";

export default function Profile({user}: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Profile</h1>
      <hr />
      <div className="my-3">
        <p>profile page</p>

        <h1>{user ? user.name : ""}</h1>
        <h1>{user ? user.email : ""}</h1>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
}
