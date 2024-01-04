'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import {signIn, signOut, useSession, getProviders} from "next-auth/react"



const Nav = () => {


    
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null)
    const [dropdown, setDropdown] = useState(false)


    const dropdownHandler = () => {
        setDropdown(!dropdown)
    }

    useEffect(() => {
       (async () => {
              const providers = await getProviders()
              setProviders(providers)
       })();

    }, [])

    useEffect(() => {
        dropdown && window.addEventListener("click", dropdownHandler)
        
        return () => {
            window.removeEventListener("click", dropdownHandler)
        }
    }, [dropdown])

  return (
    <nav className="flex justify-between w-full mb-16 pt-3 bg-slate-400 px-7"  >
        <Link href="/" className="flex gap-2 flex-center">
            <Image src="/logo.jpg" alt="Website Logo" width={40} height={40} className="object-contain"/>
        <p>Dota Mania</p>
        </Link>
        <div className="flex gap-32">
            <Link href="/heroes">Heroes</Link>
            <Link href="/items">Items</Link>
            <Link href="/players">Players</Link>
            <Link href="/news">News</Link>
        </div>


        {session?.user? (
            <div className="flex gap-3 md:gap-5" onClick={(e) => e.stopPropagation()} >
                {/* <button type="button" onClick={signOut} className="outline_btn">Sign Out</button> */}
                <Image src="/user.jpg" alt="User Pic" width={40} height={40} class="rounded-full"
                onClick={(dropdownHandler)}>
                </Image>
                {dropdown && (
                    <div className="dropdown" >
                        <Link href="/profile">Profile</Link>
                        <Link href="/profile">Settings</Link>
                        <button type="button" onClick={signOut}> Sign Out</button>
                    </div>
                )}

            </div>
        ) : (
            <div>
                {providers && Object.values(providers).map(
                    (provider) => (
                        <button type="button" key={provider.name}
                        onClick={()=> signIn(provider.id)} className="black_btn">
                            Sign In
                        </button>
                    )
                )}
            </div>
        )}


    </nav>
  )
}

export default Nav