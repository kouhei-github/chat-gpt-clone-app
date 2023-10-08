'use client'
import {useCollection} from 'react-firebase-hooks/firestore'
import {useSession} from 'next-auth/react'
import {collection, orderBy, query} from '@firebase/firestore'
import {db} from '@/firebase'
import Message from '@/components/Message'
import {ArrowDownCircleIcon} from '@heroicons/react/24/solid'

type Props = {
  chatId: string
}
const Chat = (props: Props) => {
  const {data: session} = useSession()

  const [ message ] = useCollection(
      session && query(
          collection(
              db,
              "users",
              session?.user?.email!,
              "chats",
              props.chatId,
              "messages"
          ),
          orderBy("createdAt", "asc")
      )
  )

  return (
      <div className={"flex-1 overflow-y-auto overflow-x-hidden"}>
        {message?.empty && (
            <>
              <p className={"mt-10 text-center text-white"}>
                Type a prompt in below to get started!
              </p>
              <ArrowDownCircleIcon className={"h-10 w-10 mx-auto mt-5 text-white animate-bounce"} />
            </>
        )}

        {message?.docs.map((message, index) => (
            <div key={index}>
              <Message message={message.data()} />
            </div>

        ))}
      </div>
  )
}

export default Chat
