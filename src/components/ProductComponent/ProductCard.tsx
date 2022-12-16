import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import {useState, useEffect, FC} from "react";

import {useNavigate} from "react-router-dom";
import {useAuth} from "../../backend/Context";
import {useTranslation} from "react-i18next";
import React from "react";
import {LocationOnOutlined} from "@mui/icons-material";
interface Props {
  searchString: string;
}

export const ProductCard: FC<Props> = ({searchString}: Props) => {
  const {t} = useTranslation();
  const {getProducts, createNotification, filter} = useAuth();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
    });
  }, [getProducts]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(searchString.toLowerCase())
      )
    );
  }, [products, searchString]);

  const handleDetailedClick = (item: any) => {
    if (item.rented) {
      return;
    }
    navigate(`/details/${item.id}`);
  };

  const [request, setRequest] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setRequest(false);
  };

  return (
    <>
      {filteredProducts
        .filter((item) => {
          if (filter === null) return true;
          if (filter === "free") {
            return item.price === 0;
          } else {
            return item.category === filter;
          }
        })
        .map((item) => {
          return (
            <Box
              sx={{
                display: "flex",
              }}
              key={item.id}
              onClick={() => handleDetailedClick(item)}
            >
              <Card
                sx={{
                  width: "227px",
                  height: "330px",
                  m: "0.3rem",
                  "@media screen and (max-width: 600px)": {
                    width: "190px",
                    height: "auto",
                  },
                }}
              >
                <img
                  style={{width: "100%", height: "173px"}}
                  src={item.image}
                  alt={item.title}
                />
                <CardContent>
                  <Typography
                    sx={{fontFamily: "sans-serif"}}
                    aria-label="Medium sizes"
                    gutterBottom
                    component="div"
                  >
                    {item.title}
                  </Typography>
                  <Box sx={{display: "flex", flexDirection: "row", ml: "-3px"}}>
                    <LocationOnOutlined sx={{maxWidth: "20px"}} />
                    <Typography>{item.location}</Typography>
                  </Box>
                </CardContent>
                <CardActions
                  sx={{display: "flex", justifyContent: "space-between"}}
                >
                  <Typography>
                    {item.price === 0 ? (
                      <Typography> Free </Typography>
                    ) : (
                      item.price
                    )}
                    {item.price === 0 ? <></> : <>kr/{t("day")}</>}
                  </Typography>
                  {item.rented ? (
                    <Typography color="primary">Rented</Typography>
                  ) : (
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      sx={{
                        height: "1.5rem",
                        color: "white",
                        boxShadow: 3,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();

                        createNotification(item).then(() => {
                          console.log("Create Notification done");
                        });
                        setRequest(true);
                      }}
                    >
                      {t("request")}
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Box>
          );
        })}
      <Snackbar open={request} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{width: "100%"}}>
          {t("request_confirmed")}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;
