
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SessionProvider from '@/components/SessionProvider'
import {getServerSession} from 'next-auth'
import {authOptions} from '@/pages/api/auth/[...nextauth]'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="ja">
      <body className={inter.className}>
      <SessionProvider session={session}>
        <div>
          <div>Hello World</div>
          <div className={"bg-[#343440] w-full"}>{children}</div>
        </div>
      </SessionProvider>

      </body>
    </html>
  )
}
