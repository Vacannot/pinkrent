import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Box } from "@mui/material";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useAuth } from "../../backend/Context";
import { useTranslation } from "react-i18next";
import { LocationOnOutlined } from "@mui/icons-material";
import { LocalPhoneOutlined } from "@mui/icons-material";

const ProductDetails = ({ product }: { product: any }) => {
  const { t } = useTranslation();
  const { createNotification } = useAuth();

  const { width } = useWindowDimensions();

  let breakpoint = false;
  if (width < 971) {
    breakpoint = true;
  }

  if (breakpoint)
    return (
      <Box
        key={product.id}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "8rem",
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="240"
            image={product.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              sx={{ fontSize: "1rem" }}
              gutterBottom
              variant="h6"
              component="div"
            >
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.location}
            </Typography>
            <Box
              sx={{
                fontWeight: "bold",
                fontSize: 16,
                paddingTop: "10px",
              }}
            >
              {product.price === 0 ? (
                <Typography> Free </Typography>
              ) : (
                product.price
              )}
              {product.price === 0 ? <></> : <>kr/{t("day")}</>}
            </Box>
          </CardContent>
        </Card>
        <Box
          sx={{
            "@media screen and (max-width: 430px)": {
              width: "240px",
            },
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ marginBottom: 3, marginTop: 3 }}
            >
              {t("description")}
            </Typography>
            <Typography
              variant="body2"
              sx={{ maxWidth: "21rem", marginBottom: 3 }}
            >
              {product.description}
            </Typography>
          </Box>

          <Box sx={{ gap: "10px", display: "flex" }}>
            <Button
              size="medium"
              sx={{
                color: "white",
                background: "#F06A6A",
                "@media screen and (max-width: 430px)": {
                  width: "80px",
                  fontSize: "12px",
                },
              }}
              variant="contained"
            >
              {t("report")}
            </Button>
            <Button
              sx={{
                color: "white",
                padding: "6px 40px",
                "@media screen and (max-width: 430px)": {
                  width: "80px",
                  height: "3rem",
                  fontSize: "12px",
                },
              }}
              variant="contained"
              onClick={() => {
                createNotification(product.id).then(() => {
                  console.log("Create Notification done");
                });
              }}
            >
              {t("request_rental")}
            </Button>
          </Box>
        </Box>
      </Box>
    );
  // desktop
  return (
    <Box
      key={product.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "8rem",
      }}
    >
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          image={product.image}
          alt="green iguana"
          sx={{ width: "20rem" }}
        />
        <CardContent>
          <Typography
            sx={{ fontSize: "1.8rem", fontWeight: "400" }}
            gutterBottom
            variant="h6"
            component="div"
          >
            {product.title}
          </Typography>

          <Box>
            <Typography
              variant="body2"
              sx={{
                maxWidth: "30rem",
                marginBottom: "-66px",
                fontSize: "1.1rem",
              }}
            >
              {product.description}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                marginTop: "7rem",
              }}
              variant="body2"
              color="text.secondary"
            >
              <LocationOnOutlined />
              {product.location}
            </Typography>
            <Typography>
              <LocalPhoneOutlined />
              {product.phoneNumber}
            </Typography>
            <Box
              sx={{
                fontWeight: "bold",
                fontSize: 25,
                paddingTop: "10px",
              }}
            >
              <Typography>{t("price")}:</Typography>{" "}
              {product.price === 0 ? (
                <Typography variant="h6"> Free </Typography>
              ) : (
                product.price
              )}
              {product.price === 0 ? <></> : <>kr/{t("day")}</>}
            </Box>
          </Box>
          <Box sx={{ gap: "60px", display: "flex", marginTop: "2rem" }}>
            <Button
              sx={{
                color: "white",
                padding: "6px 40px",
              }}
              variant="contained"
              onClick={() => {
                createNotification(product).then(() => {
                  console.log("Create Notification done");
                });
              }}
            >
              {t("request_rental")}
            </Button>
            <Button
              size="medium"
              sx={{ color: "white", background: "#F06A6A" }}
              variant="contained"
            >
              {t("report")}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default ProductDetails;
