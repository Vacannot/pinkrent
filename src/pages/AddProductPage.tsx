import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Card,
} from "@mui/material";
import * as yup from "yup";
import {useFormik} from "formik";
import {collection} from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "../backend/firebase";
import {useAuth} from "../backend/Context";
import {useNavigate} from "react-router";

const initialValues = {
  location: "",
  title: "",
  price: 0,
  description: "",
  phoneNumber: "",
  category: "",
  image: "",
};
const districts = [
  "Askim",
  "Backa",
  "Bergsjön",
  "Biskopsgården",
  "Centrum",
  "Frölunda",
  "Gunnared",
  "Härlanda",
  "Högsbo",
  "Kortedala",
  "Linnestaden",
  "Lundby",
  "Lärjedalen",
  "Majorna",
  "Styrsö",
  "Torslanda",
  "Tuve-Säve",
  "Tynnered",
  "Älvsborg",
  "Örgryte",
];
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = yup.object({
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "number is not valid")
    .min(6)
    .max(12)
    .required("please add phone number"),
  location: yup.string().required("Product needs a location"),
  title: yup.string().required("Product needs a title"),
  price: yup.number().max(10000).required("Product needs a price"),
  description: yup.string().required("Product needs a description"),
  category: yup.string().required("Product needs a category"),
  image: yup.string().required("image is required"),
});

export const uuid = () => {
  let dt = new Date().getTime();

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

function AddProductPage() {
  const {createProduct} = useAuth();

  const navigate = useNavigate();

  const storage = getStorage();

  const categoriesCol = collection(db, "categories");
  const [snapshot] = useCollection(categoriesCol);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createProduct(values);
      formik.resetForm();
      navigate("/catalog");
    },
  });

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "660px",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "auto",
        marginLeft: "auto",
        gap: 3,
        "@media screen and (max-width: 600px)": {
         marginBottom:"15rem"
        },
        
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <Input
          id="image"
          name="Image"
          type="file"
          placeholder="Add Image file"
          inputProps={{accept: "image/*"}}
          error={formik.touched.title && Boolean(formik.errors.title)}
          onChange={(event) => {
            const file = (event.currentTarget as HTMLInputElement).files![0];
            const storageRef = ref(storage, uuid() + " " + file.name);
            uploadBytes(storageRef, file).then((snapshot) => {
              getDownloadURL(snapshot.ref).then((downloadURL) => {
                formik.setFieldValue("image", downloadURL);
              });
            });
          }}
        />
        <TextField
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          variant="standard"
        />
        <TextField
          id="price"
          name="price"
          label="Price"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          variant="standard"
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          multiline
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          variant="standard"
        />
        <TextField
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          variant="standard"
        />
        <FormControl sx={{minWidth: 120}} required>
          <InputLabel id="location-label">Location</InputLabel>
          <Select
            labelId="location-label"
            id="location"
            name="location"
            label="Location"
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            variant="standard"
          >
            {districts.map((item, i) => {
              return (
                <MenuItem value={item} key={i}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{minWidth: 120}} required>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            name="category"
            label="Category"
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
            variant="standard"
          >
            {snapshot &&
              snapshot.docs.map((item: any) => {
                return (
                  <MenuItem value={item.id} key={item.id}>
                    {item.data()["name"]}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <Button color="primary" variant="text" type="submit">
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default AddProductPage;
