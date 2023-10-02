//Note//
// only one function can be exported by default // 
// this file contains route for dynamic routes i.e. 
// this loads a new page for every ticket we click on //

import Link from "next/link";
import { notFound } from "next/navigation";


// create a default 404 page for any id that is not in database i.e. if the route is wrong
export const dynamicParams = true;



// function for static rendering this boosts the app performance //

// this functions already fetches all tickets which makes site static render and boost the performance
 

 
async function ticketList(id){
   // creating a promise to make a delay
       // remove comments from this function to check out the loading page

       /*******************************************/
   //  await new Promise((resolve)=> setTimeout(resolve,3000));
   
       /*******************************************/

   // function below this run after 3 seconds this is just created to check our loading page will ommit it out later//

    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
    next: {
      revalidate: 0,
    }});
   if(!res.ok){
    notFound();  //this method loads the error page //
   }
    return res.json();
}
// this is a dynamic route 

export default async function  TicketDetails({ params }) {
    //we want to fetch by id
    const id = params.id;
    const ticket = await ticketList(id);
  return (
    <main>
        <nav>
            Ticket Details
            <Link href='/tickets'> 
            <button>Go to Main List</button>
            </Link>
        </nav>
        <div className="card">
        <h3>
               id: {ticket.id}
            </h3> 
            <p>
               Name: {ticket.name}<br/>
               Email: {ticket.email} <br/>
               Phone: {ticket?.phone}<br/>
               Address: {ticket?.address.street}, Suite:{ticket?.address.suite}, City:{ticket?.address.city}, Zipcode:{ticket?.address.zipcode}, Latitude:{ticket?.address.geo.lat}, Longitude:{ticket?.address.geo.lng} <br/>
               Website: {ticket.website}<br/>
               Company: {ticket?.company.name}, Phrase:{ticket?.company.catchPhrase}<br/>
               Bs: {ticket?.company.bs}

            </p>
             
            <div className={`pill`}>
              username: {ticket.username}  
            </div>
        </div>
    </main>
  )
}
