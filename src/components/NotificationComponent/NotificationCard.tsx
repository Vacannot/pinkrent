import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {IconButton, Box} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import {useState, useEffect, useCallback, forwardRef} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {useAuth} from "../../backend/Context";
import {auth} from "../../backend/firebase";
import {useTranslation} from "react-i18next";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface SnackbarMessage {
  message: string;
  key: number;
}

export interface SnackbarType {
  variant: "string";
}

function NotificationCard() {
  const {t} = useTranslation();
  const {deleteNotification, setProductRented} = useAuth();
  const [accept, setAccept] = useState(false);
  const [decline, setDecline] = useState(false);

  const handleClick = (variant: string, product: any, notification: any) => {
    if (variant === "accept") {
      deleteNotification(notification.id).then(() => {
        setProductRented(product.id, true).then(() => {
          setAccept(true);
          updateNotifications();
        });
      });
      return;
    }

    if (variant === "decline") {
      deleteNotification(notification.id).then(() => {
        setDecline(true);
        updateNotifications();
      });
      console.log("decline");
      return;
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAccept(false);
    setDecline(false);
  };

  const {getNotificationsByUserID, getProductByID} = useAuth();

  const [notifications, setNotifications] = useState<any[]>([]);

  const updateNotifications = useCallback(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getNotificationsByUserID(user.uid).then(async (notifications) => {
          let arr = [];
          for (let notification of notifications) {
            const product = await getProductByID(notification.productID);
            arr.push({
              notification,
              product,
            });
          }
          setNotifications(arr);
        });
      }
    });
  }, [getNotificationsByUserID, getProductByID]);

  useEffect(() => {
    updateNotifications();
  }, [updateNotifications]);

  return (
    <>
      {notifications.map((item) => {
        const notification = item.notification;
        const product = item.product;
        return (
          <>
            <Card
              sx={{
                width: "100%",
                "@media screen and (min-width: 800px)": {display: "none"},
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "end",
                }}
              >
                <Box>
                  <Typography variant="h6">{notification.requester}</Typography>
                  <Typography>
                    {t("requests_to_rent")} {product.title}
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    aria-label="grant"
                    color="success"
                    onClick={() => handleClick("accept", product, notification)}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() =>
                      handleClick("decline", product, notification)
                    }
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              <hr
                style={{
                  height: ".1rem",
                  width: "80%",
                  backgroundColor: "black",
                  opacity: ".2",
                }}
              ></hr>
            </Card>

            <Card
              sx={{
                width: "80%",
                mb: ".1rem",
                mt: "1rem",
                display: "flex",
                mx: "auto",
                "@media screen and (max-width: 800px)": {display: "none"},
              }}
            >
              <Typography variant="h5" sx={{ml: "3.3rem"}}>
                {t("notifications")}
              </Typography>
            </Card>

            <Card
              sx={{
                width: "80%",
                mx: "auto",
                "@media screen and (max-width: 800px)": {display: "none"},
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  mt: ".5rem",
                }}
              >
                <Typography> {t("image")}</Typography>
                <Typography> {t("title")}</Typography>
                <Typography> {t("request_from")}</Typography>
                <Box sx={{display: "flex"}}>
                  <Typography> {t("approve")}</Typography>
                  <Typography sx={{ml: "1rem"}}> {t("deny")}</Typography>
                </Box>
              </Box>
              <hr
                style={{
                  height: ".1rem",
                  width: "90%",
                  backgroundColor: "black",
                  opacity: ".2",
                }}
              ></hr>

              <Box
                sx={{
                  display: "flex",
                  mx: "auto",
                  "@media screen and (max-width: 800px)": {display: "none"},
                }}
              >
                <CardContent
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{maxWidth: "100px"}}
                  />
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {notification.requester}
                  </Typography>
                  <CardActions>
                    <IconButton
                      aria-label="delete"
                      color="success"
                      sx={{mr: "2.5rem"}}
                      onClick={() =>
                        handleClick("accept", product, notification)
                      }
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() =>
                        handleClick("decline", product, notification)
                      }
                    >
                      <CloseIcon />
                    </IconButton>
                  </CardActions>
                </CardContent>
              </Box>

              <hr
                style={{
                  height: ".1rem",
                  width: "90%",
                  backgroundColor: "black",
                  opacity: ".2",
                }}
              ></hr>
            </Card>
          </>
        );
      })}

      <Snackbar open={accept} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{width: "100%"}}>
          {t("request_approved")}
        </Alert>
      </Snackbar>
      <Snackbar open={decline} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{width: "100%"}}>
          {t("request_denied")}
        </Alert>
      </Snackbar>
    </>
  );
}

export default NotificationCard;
