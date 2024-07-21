// this page renders all the tickets in a list that are in database //
'use client'
import Link from "next/link";
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
    const [sortOrder, setSortOrder] = useState({
        name: "none",
        username: "none",
    });

    // to search  for an value
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // to sort the list in ascending or descending
    const handleSort = (property) => {
        const newSortOrder = { ...sortOrder };
        if (newSortOrder[property] === "none" || newSortOrder[property] === "desc") {
            newSortOrder[property] = "asc";
        } else {
            newSortOrder[property] = "desc";
        }
        setSortOrder(newSortOrder);
    };

    // function to reset the search bar
    const handleReset = () => {
        setSortOrder({
            name: "none",
            username: "none",
        });
    };

    // helper func to filter the tickets
    const filterTickets = (ticket) => {
        const { address, name, username } = ticket;
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        return (
            address.city.toLowerCase().includes(lowerCaseSearchTerm) ||
            name.toLowerCase().includes(lowerCaseSearchTerm) ||
            username.toLowerCase().includes(lowerCaseSearchTerm)
        );
    };

    const sortTickets = (tickets, property, order) => {
        if (order === "asc") {
            return [...tickets].sort((a, b) => a[property].localeCompare(b[property]));
        } else if (order === "desc") {
            return [...tickets].sort((a, b) => b[property].localeCompare(a[property]));
        } else {
            return tickets;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const tickets = await getList();
            setTickets(tickets);
        };

        fetchData(); // calling the function to fetch the data
    }, []);

    return (
        <div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Username, Name, or City"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <div className="flex-auto mb-3">
                <button
                    className="flex btn btn-primary me-2"
                    onClick={() => handleSort("name")}
                >
                    Sort by Name {sortOrder.name === "asc" && <span>&uarr;</span>}
                    {sortOrder.name === "desc" && <span>&darr;</span>}
                </button>
                <button
                    className="btn btn-primary flex"
                    onClick={() => handleSort("username")}
                >
                    Sort by Username {sortOrder.username === "asc" && <span>&uarr;</span>}
                    {sortOrder.username === "desc" && <span>&darr;</span>}
                </button>
                <button
                    className="btn btn-secondary ms-2 flex"
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>

            {sortTickets(tickets.filter(filterTickets), "name", sortOrder.name).filter(filterTickets)
                .map((ticket) => (
                    <div key={ticket.id} className="card my-5">
                        <Link href={`tickets/${ticket.id}`}>      {/* this line makes all the shown tickets here a dynamic route */}
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
