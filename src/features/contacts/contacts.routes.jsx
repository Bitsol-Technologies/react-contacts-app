import { createBrowserRouter } from "react-router-dom";
import ContactDetail from "./contact-detail";
import ContactDashboard from "./contact-main";
import {
    addContactRedirect,
    createContactAction,
    deleteContactAction,
    editContactAction,
    toggleFavContactAction,
} from "./contacts.actions";
import {
    DefaultContactElement,
    DeleteContactErr,
    ErrorPage,
} from "./contacts.elements";
import { ContactsLoader } from "./contacts.loaders";
import CreateContact from "./create-contact";
import EditContact from "./edit-contact";

export const getContactsRouter = (store) => {
    const contactsLoader = new ContactsLoader(store);
    return createBrowserRouter([
        {
            path: "/",
            element: <ContactDashboard />,
            loader: contactsLoader.listLoader,
            action: addContactRedirect,
            children: [
                {
                    errorElement: <ErrorPage />,
                    children: [
                        { index: true, element: <DefaultContactElement /> },
                        {
                            path: "contacts/:contactId",
                            element: <ContactDetail />,
                            loader: contactsLoader.detailLoader,
                            action: toggleFavContactAction(store),
                        },
                        {
                            path: "contacts/:contactId/edit",
                            element: <EditContact />,
                            loader: contactsLoader.detailLoader,
                            action: editContactAction(store.dispatch),
                        },
                        {
                            path: "contacts/add",
                            element: <CreateContact />,
                            action: createContactAction(store.dispatch),
                        },
                        {
                            path: "contacts/:contactId/destroy",
                            action: deleteContactAction(store.dispatch),
                            errorElement: <DeleteContactErr />,
                        },
                    ],
                },
            ],
        },
    ]);
};
