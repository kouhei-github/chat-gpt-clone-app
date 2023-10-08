"use client"

import {PaperAirplaneIcon} from '@heroicons/react/24/solid'
import React, {FormEvent, useState} from 'react'
import {useSession} from 'next-auth/react'
import {addDoc, collection, FieldValue, serverTimestamp} from '@firebase/firestore'
import {db} from '@/firebase'
import toast from 'react-hot-toast'
import ModelSelection from '@/components/ModelSelection'
import useSWR from 'swr'

type Props = {
  chatId: string
}

export type Message = {
  text: string,
  createdAt: FieldValue,
  user: {
    _id: string,
    name: string,
    avatar: string,
  }
}

const ChatInput = (props: Props) => {
  const {data: session} = useSession()
  const [prompt, setPrompt] = useState("")

  // TODO useSWR to get model
  const { data:model } = useSWR("model", {
    fallbackData: "gpt-3.5-turbo"
  })

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!prompt) return

    const input = prompt.trim()
    setPrompt("")
    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image!,
      }
    }

    await addDoc(
        collection(db, "users", session?.user?.email!, "chats", props.chatId, "messages"),
        message
    )

    // Toast loading
    const notification = toast.loading("ChatGPT is thinking ...")

    // Toast notification
    const chatId = props.chatId
    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      toast.success("ChatGPT has responded!", {
        id: notification
      })
      // aaa
      return ""
    })
  }
  return (
      <div className={"bg-gray-700/50 text-gray-400 rounded-lg text-sm "}>
        <form onSubmit={(e) => sendMessage(e)} className={"p-5 space-x-5 flex"}>
          <input
              value={prompt}
              className={"bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"}
              disabled={!session}
              type="text"
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={"Type your message here..."}
          />

          <button type={"submit"} disabled={!prompt || !session} className={"bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"}>
            <PaperAirplaneIcon className={"h-4 w-4 -rotate-45"} />
          </button>
        </form>

        <div className={"md:hidden"}>
          <ModelSelection />
        </div>
      </div>
  )
}

export default ChatInput
