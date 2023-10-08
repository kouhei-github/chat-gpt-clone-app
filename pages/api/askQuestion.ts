import {NextApiRequest, NextApiResponse} from 'next'
import queryOpenAi from '@/lib/queryApi'
import {Message} from '@/components/ChatInput'
import {addDoc, collection, serverTimestamp} from '@firebase/firestore'
import {db} from '@/firebase'

type Data = {
  answer: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body

  if(!prompt){
    res.status(400).json({answer: "please provide a prompt!"})
  }

  if(!chatId){
    res.status(400).json({answer: "please provide a valid chat ID!"})
  }

  const response = await queryOpenAi(prompt, chatId, model)


  const message: Message = {
    text: response.content!,
    createdAt: serverTimestamp(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "/images/chatgpt.webp"
    }
  }

  await addDoc(
      collection(db, "users", session?.user?.email!, "chats", chatId, "messages"),
      message
  )
  res.status(200).json({ answer: message.text })
}
