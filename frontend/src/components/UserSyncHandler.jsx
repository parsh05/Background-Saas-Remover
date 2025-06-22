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
  const { backendUrl, loadUserCredits } = useContext(AppContext);

  useEffect(() => {
    const saveUser = async () => {
      if (!isLoaded || !isSignedIn || synced) {
        return;
      }
      try {
        const token = await getToken();
        // console.log("Token received from Clerk: ", token);

        const userData = {
          clerkId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          photoUrl: user.imageUrl
        };

         await axios.post(backendUrl + "/users", userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log(response);

        setSynced(true); // to prevent reposting

        await loadUserCredits();
      } catch (error) {
        console.error("User sync failed", error);
        toast.error("User sync failed. Please try again");
      }
    };
    saveUser();
  }, [isLoaded, isSignedIn, getToken, user, synced, backendUrl, loadUserCredits]);

  return null;
};

export default UserSyncHandler;
