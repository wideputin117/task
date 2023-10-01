 'use client'
import Link from "next/link"
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
export default function Navbar() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
 

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div>
  <nav className='flex-between w-full mb-16 pt-3'>
<div className='sm:flex hidden'>
  {session?.user ? (
    <div>
      <h3>{session.user.name}</h3>
      <button type='button' onClick={signOut}>
        Sign Out
  </button>

    </div>
  ) : (
    <>
      {providers &&
        Object.values(providers).map((provider) => (
          <button
            type='button'
            key={provider.name}
            onClick={() => {
              signIn(provider.id);
            }}
            className='black_btn'
          >
            Sign in
          </button>
        ))}
    </>
  )}
</div>

{/* Mobile Navigation */}

   
</nav>
    </div>
  )
}
