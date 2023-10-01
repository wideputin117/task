import React, { Suspense } from 'react'
import TicketList from './ticketList'
import Loading from '../loading'
import Link from 'next/link'
// imported TicketList component //
// this is main page that overrides our global page.jsx in app directory//
 
export default function Tickets(){
  return (
     
    <main>
      <nav>
        <div>
          <h2>Details</h2>
          <p><small>Currently opened details</small></p>
        </div>
    
        </nav>
      {/** we will wrap this ticket-list with suspense to just render a loading while the data is being fetched**/}
      <Suspense fallback={<Loading />}> 
          <TicketList />
      </Suspense>
      
    </main>
  )
}

