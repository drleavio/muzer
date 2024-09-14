"use client";
import { signIn, signOut, useSession } from "next-auth/react";

console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);

export default function Home() {
  const session = useSession();
  return (
    <div>
      {session.data?.user && (
        <button
          onClick={() => {
            signOut();
          }}
        >
          signout
        </button>
      )}
      {!session.data?.user && (
        <button
          onClick={() => {
            signIn();
          }}
        >
          login
        </button>
      )}
    </div>
  );
}
