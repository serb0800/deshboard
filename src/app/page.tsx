import { Button } from 'antd'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button type="primary">Button</Button>
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </main>
  )
}