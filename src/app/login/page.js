'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react"

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginInProgress, setLoginInProgress] = useState(false)
    const [error, setError] = useState(false)

     async function handleFormSubmit (ev) {
        ev.preventDefault();
        setLoginInProgress(true)
        setError(false)
       
        const result = await signIn('credentials', {email, password, redirect: false})

        if(result.error) {
          setError(true)
        }
        

        setLoginInProgress(false)
    }
    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
            <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            disabled={loginInProgress}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            disabled={loginInProgress}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button type="submit" disabled={loginInProgress}>
            Login
          </button>
          <div className="my-4 text-center text-gray-500">
            Login with provider
          </div>
          <button onClick={async (ev) => { ev.preventDefault(); setError(false); signIn('google', {callbackUrl: '/'})
            setLoginInProgress(false)}}
            disabled={loginInProgress} 
            className="flex gap-4 justify-center">
            <Image src={"/google-icon.png"} alt="" width={24} height={24} />
            Login with google
          </button>
          <div className="text-center my-4 text-gray-500">
            Dont have an account?{' '} <Link className="underline text-blue-500" href={'/register'}>Register here &raquo;</Link>
          </div>
            </form>
        </section>
    )
}