import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

const HomeScreen = () => {
  const userData = useSelector((state) => state.auth);
  const { authData } = userData;
  const { isLoggedOut } = userData;

  //   console.log(authData);

  //   console.log(isLoggedOut);

  const { addToast } = useToasts();

  //   console.log(isLoggedOut);

  useEffect(() => {
    if (isLoggedOut) {
      addToast("Logged Out successfully", {
        appearance: "success",
        autoDismiss: "true",
      });
    }
  }, [authData?.result?.name]);

  return <div>home</div>;
};

export default HomeScreen;
