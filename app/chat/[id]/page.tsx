import Chat from '@/components/Chat'
import ChatInput from '@/components/ChatInput'

type Props = {
  params: {
    id: string
  }
}
const ChatPage = (props: Props) => {
  return (
      <div className={"flex flex-col min-h-screen overflow-hidden"}>
        {/* Chat */}
        <Chat chatId={props.params.id} />
        {/* ChatInput */}
        <ChatInput chatId={props.params.id} />
      </div>
  )
}

export default ChatPage
