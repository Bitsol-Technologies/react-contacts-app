import {BaseLoader} from "../../common/base.loader";
import {contactsApi} from "../../rtk/contacts.api";

export class ContactsLoader extends BaseLoader {
    listLoader = async ({ request }) => {
        const url = new URL(request.url);
        const q = url.searchParams.get("q");
        const contacts = await this._loader(
            contactsApi.endpoints.getContactList,
            request,
            q
        );
        return { contacts, q };
    };

    detailLoader = async ({ params, request }) => {
        return await this._loader(
            contactsApi.endpoints.getContact,
            request,
            params.contactId
        );
    };
}
