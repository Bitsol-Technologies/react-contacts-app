const CLIENT_ERROR = "Bad request";
const SERVER_ERROR = "Server error";
const UNKNOWN_ERROR = "Something went wrong";
const NOT_FOUND = "Contact not found";
const NONE = "";

export const getErrorMessage = (status = 403) => {
    if (!status) return UNKNOWN_ERROR;
    if (status < 300) return NONE;
    if (status === 404 && status < 500) return NOT_FOUND;
    if (status === 400 && status < 500) return CLIENT_ERROR;
    if (status >= 500) return SERVER_ERROR;
    return UNKNOWN_ERROR;
};

export class BaseLoader {
    _store = {};
    _dispatch = () => {};
    constructor(store) {
        this._store = store;
        this._dispatch = store.dispatch;
    }

    _loader = async (endpoint, request, query, queryOptions) => {
        const promise = this._store.dispatch(
            endpoint.initiate(query, queryOptions)
        );
        request.signal.onabort = promise.abort;
        const res = await promise;
        const { data, isError, error } = res;
        if (isError) {
            const { status = 403, data } = error;
            throw new Response("", {
                status,
                statusText: data?.message || getErrorMessage(status),
            });
        }
        return data;
    };
}
