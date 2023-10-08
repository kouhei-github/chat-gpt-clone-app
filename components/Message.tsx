import {firestore} from 'firebase-admin'
import DocumentData = firestore.DocumentData
import Image from 'next/image'

type props =  {
  message: DocumentData
}
const Message = (props: props) => {
  const isChatGPT = props.message.user.name === "ChatGPT"
  return (
      <div className={`py-5 text-white ${isChatGPT && 'bg-[#434654]'}`}>
        <div className={"flex space-x-5 px-10 max-w-2xl mx-auto"}>
          <Image width={8} height={8} src={props.message.user.avatar} alt="アバター" className={"h-8 w-8"} />
          <p className={"pt-1 text-sm"}>{props.message.text}</p>
        </div>
      </div>
  )
}

export default Message
