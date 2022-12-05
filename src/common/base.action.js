export class BaseAction {
    _store = {};
    _dispatch = () => {};
    constructor(store) {
        this._store = store;
        this._dispatch = store.dispatch;
    }

    _action = async (endpoint, reqBody) => await state.dispatch(
            endpoint.initiate(reqBody)
        );
}
