import {
    Outlet,
    useLoaderData,
    Form,
    useNavigation,
    useSubmit,
} from "react-router-dom";
import { useEffect } from "react";
import ContactList from "./contact-list";
import { useGetContactListQuery } from "../../rtk/contacts.api";

export default function ContactDashboard() {
    const { q } = useLoaderData();
    const { data: contacts } = useGetContactListQuery(q);
    const navigation = useNavigation();
    const submit = useSubmit();

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has("q");

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            className={searching ? "loading" : ""}
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            onChange={(event) => {
                                const isFirstSearch = q == null;
                                submit(event.currentTarget.form, {
                                  replace: !isFirstSearch,
                                });
                            }}
                            defaultValue={q}
                        />
                        <div
                            id="search-spinner"
                            hidden={!searching}
                            aria-hidden
                        />
                        <div className="sr-only" aria-live="polite"></div>
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    <ContactList contacts={contacts} />
                </nav>
            </div>
            <div
                id="detail"
                className={navigation.state === "loading" ? "loading" : ""}
            >
                <Outlet />
            </div>
        </>
    );
}
