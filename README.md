# ChatGPT-Clone-App
Next.js(13)を触れてみたくて、今回話題のChatGPTを作成することにした。<br>
開発期間は2日程度なので、UI/UXはまだまだですが暇な時にアップデートしていく。

作成したアプリの画像
![スクリーンショット 2023-10-09 0 59 43](https://github.com/kouhei-github/chat-gpt-clone-app/assets/49782052/2b9fd460-c949-4e9b-ad42-5707fea424da)


下記にデプロイしてますので確認ください。<br>
[ChatGPT-Clone-AppのURL](https://chat-gpt-clone-app-psi.vercel.app/)

プロジェクトはGitで管理してますので、クローンして使ってみてください。<br>
[ChatGPT-Clone-AppのURL](https://github.com/kouhei-github/chat-gpt-clone-app.git)

---

## 1.ローカルで確認したい時に必要なこと
### 1.1 Google OAuth Loginの設定
今回ログインに**Googleログイン**を使用した。

下記記事を参考に、IDとSECRET_KEYを.envファイルにセットする。<br>
[参考: WEBページに「Googleアカウントでログイン」を実装する](https://qiita.com/kmtym1998/items/768212fe92dbaa384c27)

```.dotenv
GOOGLE_ID=
GOOGLE_SECRET=
```

---

### 1.2 firebaseの有効化
ChatGPTは対話形式のWebアプリケーションなので、チャットアプリと親和性の高いFireBaseが相性が良いのではと思います。
下記記事を参考に、firebase-admin.jsonを作成してください。<br>
[参考: [実装編]Firebaseをセットアップしよう](https://zenn.dev/hisho/books/617d8f9d6bd78b/viewer/chapter3)

![e16c7a3702ed060d3dd262ad](https://github.com/kouhei-github/chat-gpt-clone-app/assets/49782052/8b694530-5167-4049-a4fa-0c5f43ea2efa)


このままuploadすると危険なので、.envファイルに移動させる。
```dotenv
NEXT_PUBLIC_FIRE_BASE_API_KEY=
NEXT_PUBLIC_FIRE_BASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIRE_BASE_PROJECT_ID=
NEXT_PUBLIC_FIRE_BASE_BUCKET=
NEXT_PUBLIC_FIRE_BASE_SENDER_ID=
NEXT_PUBLIC_FIRE_BASE_APP_ID=
NEXT_PUBLIC_FIRE_BASE_MEASUREMENT_ID=
```

---

### 1.3 OpenAIでAPIキーを取得

下記記事を参考に、firebase-admin.jsonを作成してください。<br>
[参考: [超初心者向け] ChatGPT(OpenAI)のAPI key取得手順](https://note.com/libproc/n/nc777ee0b3bf0)

このままuploadすると危険なので、.envファイルに移動させる。
```dotenv
OPENAI_API_KEY=
```

---

## 2. Next.jsのバージョン13について
App Routerを使用すると、今までのpageディレクトリに書く構成とは**異なり癖が強い**<br>
ただ慣れれば難しくないイメージです。<br>
ただ癖が強いとは言え、**Vue.js**の*option api*の書き方から*composition api*に変わったのに比べると優しい。<br>
下記にそれぞれメリットデメリットを書いてく<br>

---

### 2.1 Next.js version13のメリット

#### 2.1.1 画面レイアウトを共通ファイルで管理
**layout.tsx**という重要なファイルが追加された。<br>
これが最強で、画面のレイアウトが簡単になった。<br>
例えば、ログイン画面(*/login*)と管理画面(*/admin/user* or */admin/chat*)のグラフのページで、レイアウトを分けたいとする、
そう言った場合は、下記のような構成にできる
```text
├── favicon.ico
├── admin
│   ├── layout.tsx // 管理画面用のレイアウト
│   ├── page.tsx
│   ├── user
│   │   └── page.tsx
│   └── chat
│       └── page.tsx
├── globals.css
├── page.tsx
└── login
    ├── layout.tsx // ログイン画面用のレイアウト
    └── page.tsx
```

このような構成にすることで共通な画面構成をlayout.tsxにまとめることができる。

---

#### 2.1.2 API単位でのISR

今までNext.jsでISRを実装しようとすると、page単位だった。<br>
今回のアップデートで、API単位でISRの実装が可能になった。<br>

下記でご確認ください<br>
[公式ドキュメント](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration)

---


### 2.2 Next.js version13のデメリット

#### 2.2.1 pagesディレクトリの仕様変更

従来はpagesディレクトリにルーティングを記述していたが、<br>
今回のupdateからAPI を記述するようになったらしい。<br>
説明が難しいのでプロジェクトをご確認ください。<br>

**APIを呼び出してる箇所(*/api/askQuestion*)**<br>
```tsx
/* @/components/ChatInput.tsx */
"use client"

import { FormEvent, HTMLFormElement } from 'react'
import toast from 'react-hot-toast'

type Props = {
  chatId: string
}

const ChatInput = (props: Props) => {
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    // Toast notification
    const chatId = props.chatId
    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: input, chatId, model, session,
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
      <form onSubmit={(e) => sendMessage(e)} className={"p-5 space-x-5 flex"}>
        <input
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
  )
}

export default ChatInput
```
わかりやすくするために、コードの一部抜粋しています。<br>
[全文はここから確認お願いします。](https://github.com/kouhei-github/chat-gpt-clone-app/blob/main/components/ChatInput.tsx)<br><br>

**APIを呼び出してる箇所(*/api/askQuestion*)**<br>
```tsx
/* @/pages/api/askQuestion.ts */
import {NextApiRequest, NextApiResponse} from 'next'
import queryOpenAi from '@/lib/queryApi'

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


  res.status(200).json({ answer: "成功した" })
}

```
わかりやすくするために、コードの一部抜粋しています。<br>
[全文はここから確認お願いします。](https://github.com/kouhei-github/chat-gpt-clone-app/blob/main/pages/api/askQuestion.ts)<br><br>

pagesディレクトリに書いた処理はApiとして呼び出すことができる。
今まではViewに特化してた分違和感がある。

---
