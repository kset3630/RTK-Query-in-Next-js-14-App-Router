import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    baseUrl: "https://be.nyanlynnthitanalytica.org/api/v1/",
    // baseUrl: "/api/v1/",
  }),
  tagTypes: ["Clash", "Research"],
  endpoints: (builder) => ({
    logInAuth: builder.mutation({
      query: (account) => ({
        url: "/auth/login",
        method: "post",
        body: account,
        credentials: "include",
      }),
    }),
    getClash: builder.query({
      query: (query) => `/home`,
      transformResponse: (res) => res,
      providesTags: ["Clash"],
    }),
    uploadResource: builder.mutation({
      async queryFn(body, _queryApi, _extraOptions, fetchWithBQ) {
        // upload with multipart/form-data

        const formData = new FormData();
        formData.append("embed", body.embedded);
        formData.append("title", body.title);
        formData.append("date", body.date);
        formData.append("type", body.type);
        if (body.type !== "ADVOCACY") {
          for (let i = 0; i < body.image?.length; i++) {
            formData.append("image", body.image[i]);
          }
          formData.append("category", body.category);
          formData.append("pdf", body.pdf);
          formData.append("mmPDF", body.mmPDF);
        }
        const response = await fetchWithBQ({
          url: "/resources/",
          method: "POST",
          body: formData,
          credentials: "include",
        });
      },
      invalidatesTags: ["Clash"],
    }),
    updateResource: builder.mutation({
      query: (resource) => ({
        url: `resources/id/${resource._id}`,
        method: "PATCH",
        body: resource,
        credentials: "include",
      }),
      invalidatesTags: ["Clash"],
    }),
    deleteResource: builder.mutation({
      query: (id) => ({
        url: `/resources/id/${id}`,
        method: "delete",
        body: id,
        credentials: "include",
      }),
      invalidatesTags: ["Clash"],
    }),

    subscribeNewsLetter: builder.mutation({
      query: (subscriber) => ({
        url: "/home/subscribe",
        method: "post",
        body: subscriber,
        credentials: "include",
      }),
    }),
    getScribers: builder.query({
      query: (query) => "/home/subscribes",
      transformResponse: (res) => res,
      providesTags: ["Emails"],
    }),
    getDashboard: builder.query({
      query: (year) => `/dashboard?year=${year}`,
      transformResponse: (res) => res,
      providesTags: ["Research"],
    }),
    getDashboardById: builder.query({
      query: (id) => `/dashboard/state/${id}`,
      transformResponse: (res) => res,
      providesTags: ["Research"],
    }),
    uploadResearch: builder.mutation({
      query: (body) => ({
        url: `/dashboard/township/${body.state}`,
        method: "post",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Research"],
    }),
    updateResearch: builder.mutation({
      query: (body) => ({
        url: `/dashboard/township/${body.state}`,
        method: "PUT",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Research"],
    }),
    deleteResearch: builder.mutation({
      query: ({ stateId, name }) => ({
        url: `/dashboard/township/${stateId}?township=${name}`,
        method: "delete",
        credentials: "include",
      }),
      invalidatesTags: ["Research"],
    }),
  }),
});

export const {
  useGetClashQuery,
  useLogInAuthMutation,
  useUploadResourceMutation,
  useUpdateResourceMutation,
  useDeleteResourceMutation,
  useSubscribeNewsLetterMutation,
  useGetScribersQuery,
  useGetDashboardQuery,
  useGetDashboardByIdQuery,
  useUploadResearchMutation,
  useUpdateResearchMutation,
  useDeleteResearchMutation,
} = apiSlice;
