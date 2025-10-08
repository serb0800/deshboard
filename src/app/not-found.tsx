// app/not-found.tsx
import Link from 'next/link'
import { auth } from '../../auth'
import { redirect } from 'next/navigation'

export default async function NotFound() {
    const session = await auth()

    if (session?.user?.name !== 'Admin') redirect('/signIn')
    if (session?.user?.name === 'Admin') redirect('/statistic')
    return (
        <div>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/">Return Home</Link>
        </div>
    )
}
