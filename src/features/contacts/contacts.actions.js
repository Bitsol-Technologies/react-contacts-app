import { redirect } from "react-router-dom";
import { contactsApi } from "../../rtk/contacts.api";

export const addContactRedirect = () => {
    return redirect(`/contacts/add`);
};

export const toggleFavContactAction =
    (state) =>
    async ({ request, params }) => {
        const { data: prevData } = contactsApi.endpoints.getContact.select(
            params.contactId
        )(state.getState());
        let formData = await request.formData();
        return await state.dispatch(
            contactsApi.endpoints.updateContact.initiate({
                ...(prevData || {}),
                favorite: formData.get("favorite") === "true",
                id: params.contactId,
            })
        );
    };

export const createContactAction =
    (dispatch) =>
    async ({ request }) => {
        const formData = await request.formData();
        const updates = Object.fromEntries(formData);
        await dispatch(contactsApi.endpoints.createContact.initiate(updates));
        return redirect(`/`);
    };

export const editContactAction =
    (dispatch) =>
    async ({ params, request }) => {
        const formData = await request.formData();
        let updates = Object.fromEntries(formData);
        updates = { ...updates, id: params.contactId };
        await dispatch(contactsApi.endpoints.updateContact.initiate(updates));
        return redirect(`/contacts/${params.contactId}`);
    };

export const deleteContactAction =
    (dispatch) =>
    async ({ params }) => {
        await dispatch(
            contactsApi.endpoints.deleteContact.initiate(params.contactId)
        );
        return redirect("/");
    };
