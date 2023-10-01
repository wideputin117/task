import Link from "next/link";
 export default async function Home() {
 
  return (
 <html> 
    <main>
 
  <div> 
        <h2>Dashboard</h2>
      <p>This is the dashboard for all the users and their details in this database</p>
      <div className="flex justify-center my-8">
        <Link href="/tickets">
          <button className="btn-primary">View Details</button>
        </Link>
  </div>
  </div>
  </main>
  </html>
    )
}
