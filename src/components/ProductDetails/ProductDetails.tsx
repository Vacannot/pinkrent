import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {Button, Box, IconButton} from "@mui/material";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {useAuth} from "../../backend/Context";
import {LocationOnOutlined, LocalPhoneOutlined} from "@mui/icons-material";
import {  useNavigate } from "react-router-dom";
import Person2Icon from '@mui/icons-material/Person2';


  const ProductDetails = ({product}: {product: any}) => {
  const {createNotification} = useAuth();
  const {width} = useWindowDimensions();
  const navigate = useNavigate();

  let breakpoint = false;
  if (width < 971) {
    breakpoint = true;
  }

  if (breakpoint)
    return (
     <Box sx={{ "@media screen and (max-width: 971px)": { marginBottom:"15rem"}, display:"flex", justifyContent:"center"}} >
      <Card sx={{maxWidth: 345, marginTop:"1rem"}}>
      <Box
        key={product.id}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
          <CardMedia
            component="img"
            height="200"
            image={product.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              sx={{fontSize: "1rem"}}
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
              {product.price} kr
            </Box>
          </CardContent>
        <Box>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{marginBottom: 1, marginTop: 1, marginLeft: 1}}
              >
              DESCRIPTION
            </Typography>
            <Typography
              variant="body2"
              sx={{maxWidth: "21rem", marginBottom: 1, marginLeft: 2}}
              >
              {product.description}
            </Typography>
          </Box>
          <IconButton onClick={() => {
                navigate(`/productUserPage/${product.userID}`);
              }}>
            <Person2Icon />
          </IconButton>
          <Box sx={{gap: "10px", display: "flex"}}>
            <Button
              size="medium"
              sx={{color: "white", background: "#F06A6A"}}
              variant="contained"
              >
              REPORT
            </Button>
            <Button
              sx={{
                color: "white",
                padding: "6px 40px",
              }}
              variant="contained"
              onClick={() => {
                createNotification(product.id).then(() => {
                  console.log("Create Notification done");
                });
              }}
              >
              REQUEST RENTAL
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
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
      }}
    >
      <Card sx={{display: "flex"}}>
        <CardMedia
          component="img"
          image={product.image}
          alt="green iguana"
          sx={{width: "20rem"}}
        />
        <CardContent>
          <Typography
            sx={{fontSize: "1.8rem", fontWeight: "400"}}
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
            <IconButton onClick={() => {
                navigate(`/productUserPage/${product.userID}`);
              }}>
            <Person2Icon />
          </IconButton>
            <Box
              sx={{
                fontWeight: "bold",
                fontSize: 25,
                paddingTop: "10px",
              }}
            >
              <Typography>Price: {product.price} kr/day</Typography>
            </Box>
          </Box>
          <Box sx={{gap: "60px", display: "flex", marginTop: "2rem"}}>
            <Button
              sx={{
                color: "white",
                padding: "6px 40px",
              }}
              variant="contained"
            >
              REQUEST RENTAL
            </Button>
            <Button
              size="medium"
              sx={{color: "white", background: "#F06A6A"}}
              variant="contained"
              onClick={() => {
                createNotification(product.id).then(() => {
                  console.log("Create Notification done");
                });
              }}
            >
              REPORT
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
           
};
export default ProductDetails;
