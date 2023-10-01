// this is global not-found if theres a request for not specified routes to fetch data this will show //

// regular component for 404 page //
// this will always show when the resource is not there //
// this page must be called not-found for this to work //

 import Link from "next/link"

export default function NotFound() {
  return (
    <main className="text-center">
        <h2 className='text-3xl'>
            There was a problem while loading the page...
        </h2>
        <p>We could not find the page</p>
        <Link href="/">Go back to Dashboard</Link>
    </main>
  )
}
