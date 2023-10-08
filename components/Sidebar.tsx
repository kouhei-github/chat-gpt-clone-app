"use client"
import NewChat from '@/components/NewChat'
import {signOut, useSession} from 'next-auth/react'
import {collection, orderBy, query} from '@firebase/firestore'
import { useCollection } from "react-firebase-hooks/firestore"
import {db} from '@/firebase'
import ChatRow from '@/components/ChatRow'
import ModelSelection from '@/components/ModelSelection'
import React from 'react'
import Image from 'next/image'

const Sidebar = () => {

  const { data: session } = useSession()

  const [chats, loading, error] = useCollection(
      session && query(
          collection(db, "users", session.user?.email!, "chats"),
          orderBy("createdAt", "asc")
      )
  )

  return (
      <div className={"p-2 flex flex-col min-h-screen w-full"}>
        <div className={"flex-1"}>
          <div>
            {/* New Chat */}
            <NewChat />

            <div>
              {/* Model Selection */}
              <div className={"hidden sm:inline"}>
                <ModelSelection />
              </div>
            </div>

            <div className={"flex flex-col space-y-2 my-2"}>
              {loading && (
                  <div className={"animate-pulse text-center text-white"}>
                    <p>Loading Chats... </p>
                  </div>
              )}

              {chats?.docs.map((chat, index) => (
                  <div key={index}>
                    <ChatRow id={chat.id} />
                  </div>
              ))}
            </div>

          </div>
        </div>
        {session && (
            <Image
                width={12}
                height={12}
                onClick={() => signOut()}
                src={session.user?.image!}
                alt="user profile"
                className={"h-12 w-12 rounded-full cursor-pointer hover:opacity-50 mx-auto mb-2"}
            />
        )}
      </div>
  )
}

export default Sidebar
