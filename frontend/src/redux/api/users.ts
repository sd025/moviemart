import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
    }),
    getProfiles: builder.query({
      query: () => ({
        url: `${USERS_URL}/profiles`,
        method: "GET",
      }),
      providesTags: ["Profiles"],
    }),

    // Create a new profile
    createProfile: builder.mutation({
      query: (profileData) => ({
        url: `${USERS_URL}/profiles`,
        method: "POST",
        body: profileData,
      }),
      invalidatesTags: ["Profiles"],
    }),

    // Update an existing profile
    updateProfileById: builder.mutation({
      query: ({ profileId, profileData }) => ({
        url: `${USERS_URL}/profiles/${profileId}`,
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["Profiles"],
    }),

    // Delete a profile
    deleteProfile: builder.mutation({
      query: (profileId) => ({
        url: `${USERS_URL}/profiles/${profileId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profiles"],
    }),
    switchProfile: builder.mutation({
      query: (profileId) => ({
        url: `${USERS_URL}/switch-profile`,
        method: "POST",
        body: { profileId },
      }),
      invalidatesTags: ["Profiles"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileMutation,
  useGetUsersQuery,
  useGetProfilesQuery,
  useCreateProfileMutation,
  useUpdateProfileByIdMutation,
  useDeleteProfileMutation,
  useSwitchProfileMutation
} = userApiSlice;