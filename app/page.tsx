import {BoltIcon, ExclamationTriangleIcon, SunIcon} from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className={"text-white min-h-screen flex flex-col items-center justify-center w-full"}>
      <h1 className={"text-5xl font-bold mb-20"}>ChatGPT</h1>

      <div className={"flex space-x-2 text-center md:flex-row flex-col"}>
        <div className={""}>
          <div className={"flex flex-col items-center justify-center"}>
            <SunIcon className="h-8 w-8" />
            <h2>Example</h2>
          </div>
          <div className={"space-y-2"}>
            <p className={"infoText"}>Explain Something to me</p>
            <p className={"infoText"}>What is difference between a dog and a cat?</p>
            <p className={"infoText"}>What is the color of the sun?</p>
          </div>
        </div>

        <div className={""}>
          <div className={"flex flex-col items-center justify-center"}>
            <BoltIcon className="h-8 w-8" />
            <h2>Capabilities</h2>
          </div>
          <div className={"space-y-2"}>
            <p className={"infoText"}>Change the ChatGPT Model to use</p>
            <p className={"infoText"}>Messages are stored in Firebase Firestore</p>
            <p className={"infoText"}>How Toast notifications when ChatGPT is thinking!</p>
          </div>
        </div>

        <div className={""}>
          <div className={"flex flex-col items-center justify-center"}>
            <ExclamationTriangleIcon className="h-8 w-8" />
            <h2>limitation</h2>
          </div>
          <div className={"space-y-2"}>
            <p className={"infoText"}>May occasionally generate incorrect information</p>
            <p className={"infoText"}>May occasionally produce harmful instructions or biased content</p>
            <p className={"infoText"}>limited knowledge of world and events after 2021</p>
          </div>
        </div>
      </div>
    </div>
  )
}
