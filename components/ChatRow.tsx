import Link from 'next/link'
import {ChatBubbleLeftIcon, TrashIcon} from '@heroicons/react/24/outline'
import {usePathname, useRouter} from 'next/navigation'
import {useSession} from 'next-auth/react'
import {useEffect, useState} from 'react'
import {useCollection} from 'react-firebase-hooks/firestore'
import {collection, deleteDoc, doc, orderBy, query} from '@firebase/firestore'
import {db} from '@/firebase'

const ChatRow = (props: {id: string}) => {
  const pathName = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [active, setActive] = useState(false)

  const [messages] = useCollection(
      session && query(
          collection(
              db,
              "users",
              session?.user?.email!,
              "chats",
              props.id,
              "messages"
          )
      ),
  )

  useEffect(() => {
    if(!pathName) return

    setActive(pathName.includes(props.id))
  }, [pathName])

  const removeChat = async () => {
    await  deleteDoc(doc(db, "users", session?.user?.email!, "chats", props.id))
    router.replace("/")
  }

  return (
      <Link
          href={`/chat/${props.id}`}
          className={`chatRow justify-center ${active && 'bg-gray-700/50'}`}
      >
        <ChatBubbleLeftIcon className={"h-5 w-5"} />
        <div className={"flex-1 hidden md:inline-flex w-[300px]"}>
          <p className={"truncate px-3"}>
            {messages?.docs[0]?.data().text || "New Chat"}
          </p>
        </div>

        <TrashIcon
            onClick={() => removeChat()}
            className={"h-5 w-5 text-gray-700 hover:text-red-700"}
        />
      </Link>
  )
}

export default ChatRow
