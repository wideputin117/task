// this is custom 404 page component for just for tickets directory //

import Link from "next/link"

export default function NotFound() {
  return (
    <main className="text-center">
        <h2 className='text-3xl'>
            There was a problem while loading the page...
        </h2>
        <p>We could not find the page</p>
        <Link href="/tickets">Go back to Tickets</Link>
    </main>
  )
}