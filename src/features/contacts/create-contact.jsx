import { Form, useNavigate } from "react-router-dom";

export default function CreateContact() {
    const navigate = useNavigate();

    return (
        <Form method="post" id="contact-form">
            <p>
                <span>Name</span>
                <input
                    placeholder="First"
                    aria-label="First name"
                    type="text"
                    name="first"
                />
                <input
                    placeholder="Last"
                    aria-label="Last name"
                    type="text"
                    name="last"
                />
            </p>
            <label>
                <span>Twitter</span>
                <input type="text" name="twitter" placeholder="@jack" />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL"
                    type="text"
                    name="avatar"
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea name="notes" rows={6} />
            </label>
            <p>
                <button type="submit">Save</button>
                <button
                    type="button"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Cancel
                </button>
            </p>
        </Form>
    );
}
