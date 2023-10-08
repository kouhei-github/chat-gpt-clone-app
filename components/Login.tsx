"use client"
import Image from 'next/image'
import {signIn} from 'next-auth/react'

const Login = () => {
  return (
      <div className={"flex flex-col items-center justify-center min-h-screen bg-[#0FA27E]"}>
        <Image
            src={"/images/chatgpt.webp"}
            alt={"logo"}
            width={300}
            height={300}
        />
        <button onClick={() => signIn("google")} className={"text-white font-bold text-3xl animate-pulse"}>
          Sign In to use ChatGPT
        </button>
      </div>
  )
}

export default Login
