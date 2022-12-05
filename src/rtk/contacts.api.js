import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./base.api";

export const contactsApi = createApi({
    baseQuery: axiosBaseQuery({
        baseUrl: "/contacts",
    }),
    tagTypes: ["Contacts"],
    endpoints: (build) => ({
        getContactList: build.query({
            query: (q) => ({ url: `?${q ? `q=${q}` : ""}` }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Contacts",
                              id,
                          })),
                          { type: "Contacts", id: "LIST" },
                      ]
                    : [{ type: "Contacts", id: "LIST" }],
        }),
        getContact: build.query({
            query: (id) => ({ url: `/${id}` }),
            providesTags: (result, error, id) => [{ type: "Contacts", id }],
        }),
        deleteContact: build.mutation({
            query: (id) => ({ url: `/${id}`, method: "DELETE" }),
            invalidatesTags: [{ type: "Contacts", id: "LIST" }],
        }),
        createContact: build.mutation({
            query: (data) => ({ url: "/", method: "post", data }),
            invalidatesTags: (result, error, arg) => [
                { type: "Contacts", id: arg.id },
                { type: "Contacts", id: "List" },
            ],
        }),
        updateContact: build.mutation({
            query: (data) => ({
                url: `/${data.id}`,
                method: "put",
                data,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Contacts", id: arg.id },
            ],
        }),
    }),
});

export const { useGetContactListQuery, useGetContactQuery } = contactsApi;
