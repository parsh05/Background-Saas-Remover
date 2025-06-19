import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useContext, useEffect } from "react";
import axios from "./../../node_modules/axios/lib/axios";
import toast from "react-hot-toast";

const UserSyncHandler = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const [synced, setSynced] = useState(false);
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    const saveUser = async () => {
      if (!isLoaded || !isSignedIn || synced) {
        return;
      }
      try {
        const token = await getToken();
        console.log("Token received from Clerk: ", token);

        const userData = {
          clerkId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
        };

        const response = await axios.post(backendUrl + "/users", userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);

        // if (response.data.success === true) {
        //   ("User Successfully created!");
        // } else {
        //   toast.error("User sync failed. Please try again");
        // }
        setSynced(true); // to prevent reposting

        // TODO : update the user credits
      } catch (error) {
        console.error("User sync failed", error);
        toast.error("User sync failed. Please try again");
      }
    };
    saveUser();
  }, [isLoaded, isSignedIn, getToken, user, synced, backendUrl]);

  return null;
};

export default UserSyncHandler;
