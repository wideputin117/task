 // this page renders all the tickets in a list that are in database //
'use client'
 import Link from "next/link";
 

 // this used to fetch data from server
import { useState, useEffect } from "react";
 

async function getList() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        next: {
            revalidate: 0, //this will keep refreshing the data
        },
    });

    return res.json();
}

export default function TicketList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [tickets, setTickets] = useState([]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filterTickets = (ticket) => {
        const { id, name, username } = ticket;
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        return (
            id.toString().includes(lowerCaseSearchTerm) ||
            name.toLowerCase().includes(lowerCaseSearchTerm) ||
            username.toLowerCase().includes(lowerCaseSearchTerm)
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            const tickets = await getList();
            setTickets(tickets);
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by ID, Name, or Username"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            {tickets
                .filter(filterTickets)
                .map((ticket) => (
                    <div key={ticket.id} className="card my-5">
                        <Link href={`tickets/${ticket.id}`}>
                            <h3>id: {ticket.id}</h3>
                            <p>
                                Name: {ticket.name}
                                <br />
                                Email: {ticket.email} <br />
                                Phone: {ticket?.phone}
                                <br />
                                Address: {ticket?.address.street}
                            </p>

                            <div className={`pill`}>username: {ticket.username}</div>
                        </Link>
                    </div>
                ))}

            {tickets.length === 0 && (
                <p className="text-center">There are no opened tickets. YAY</p>
            )}
        </div>
    );
}
