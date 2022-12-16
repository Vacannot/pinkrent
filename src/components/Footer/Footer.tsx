import { Box } from "@mui/system";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import { onAuthStateChanged } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { auth } from "../../backend/firebase";
import { useAuth } from "../../backend/Context";

export default function Footer() {
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      forceUpdate();
    });
  }, [forceUpdate]);
  const { width } = useWindowDimensions();
  let breakpoint = false;
  if (width < 971) {
    breakpoint = true;
  }
  

  const { getNotificationsByUserID } = useAuth();

  const notifbutton = document.getElementById(
    "notifbubtton"
  ) as HTMLButtonElement | null;

  const [disabledNotif, setDisabledNotif] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getNotificationsByUserID(user.uid).then(async (notifications) => {
          let arr = [];
          for (let notification of notifications) {
            arr.push({
              notification,
            });
            if (arr.length === 0 && notifbutton) {
              notifbutton.disabled = true;
              setDisabledNotif(true);
            }
            setDisabledNotif(false);
          }
        });
      }
    });
  });


  if (breakpoint as boolean) {
      return (
       <Box
         sx={{
           display: "flex",
           justifyContent: "space-evenly",
           width: "100%",
           alignItems: "center",
           position: "fixed",
           bottom: "3rem",
           zIndex: "10000",
         }}
       >
         <Link to="/catalog">
           <IconButton sx={{ border: 1, borderColor: "white" }}>
             <HomeIcon sx={{ color: "white" }} />
           </IconButton>
         </Link>
         {auth.currentUser ? (
           <>
             {disabledNotif ? (
               <>
                 <IconButton sx={{ border: 1, borderColor: "white" }}>
                   <NotificationsOffIcon sx={{ color: "white" }} />
                 </IconButton>
               </>
             ) : (
               <>
                 <Link to="/notifications">
                   <IconButton sx={{ border: 1, borderColor: "white" }}>
                     <NotificationsIcon sx={{ color: "white" }} />
                   </IconButton>
                 </Link>
               </>
             )}
           </>
         ) : (
           <></>
         )}
 
         {auth.currentUser ?  (
             
           <>
             <Link to="/add">
               <IconButton sx={{ border: 1, borderColor: "white" }}>
                 <AddCircleOutlineIcon sx={{ color: "white" }} />
               </IconButton>
             </Link>
             <Link to="/profile">
               <IconButton sx={{ border: 1, borderColor: "white" }}>
                 <AccountCircleIcon sx={{ color: "white" }} />
               </IconButton>
             </Link>
           </>
         ) : (
           <>
             <Link to="/register">
               <IconButton sx={{ border: 1, borderColor: "white" }}>
                 <AccountCircleIcon sx={{ color: "white" }} />
               </IconButton>
             </Link>
           </>
         )}
       </Box>
     );
        

  }
  

  return null;
}
