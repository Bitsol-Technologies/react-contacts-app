import React from "react";
import { NavLink } from "react-router-dom";

const ContactList = ({ contacts }) => {
    return (
        <nav>
            {contacts.length ? (
                <ul>
                    {contacts.map((contact) => (
                        <li key={contact.id}>
                            <NavLink
                                to={`contacts/${contact.id}`}
                                className={({ isActive, isPending }) =>
                                    isActive
                                        ? "active"
                                        : isPending
                                        ? "pending"
                                        : ""
                                }
                            >
                                {contact.first || contact.last ? (
                                    <>
                                        {contact.first} {contact.last}
                                    </>
                                ) : (
                                    <i>No Name</i>
                                )}{" "}
                                {contact.favorite && <span>★</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    <i>No contacts</i>
                </p>
            )}
        </nav>
    );
};
export default ContactList;
