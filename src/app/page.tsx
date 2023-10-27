import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">welcome, this is hongsoohyuk.com</h1>
      <Link className="text-3xl font-bold" href="/me">click this</Link>
    </main>
  )
}
