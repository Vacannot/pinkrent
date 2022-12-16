import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  CheckOutlined,
  DeleteOutlineOutlined,
  EditOutlined,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {useAuth} from "../../backend/Context";
import {auth} from "../../backend/firebase";
import {useFormik} from "formik";
import * as yup from "yup";
import {useTranslation} from "react-i18next";

const getCategoryById = (categories: any[], id: string) => {
  for (let category of categories) {
    if (category.id === id) {
      return category;
    }
  }

  return "ERROR";
};

const RemoveProductConfirmation = ({
  product,
  open,
  close,
}: {
  product: any;
  open: boolean;
  close: () => void;
}) => {
  const {deleteProduct} = useAuth();
  const {t} = useTranslation();

  const handleClose = () => {
    close();
  };

  const handleDeleteItem = () => {
    deleteProduct(product.id);
    // TODO: something... should happen pls :)))))))))))))))))))
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="responsive-dialog-title">
        {t("are_you_sure_remove")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{t("this_action_cannot_revert")}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          {t("no_caps")}
        </Button>
        <Button onClick={handleDeleteItem} autoFocus>
          {t("yes_caps")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ProductInfo = ({
  product,
  category,
  setEditing,
}: {
  product: any;
  category: any;
  setEditing: (edit: boolean) => void;
}) => {
  const {t} = useTranslation();
  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <>
      <Typography sx={{mb: ".7rem", mt: ".5rem"}}>
        {product.description}
      </Typography>
      <Typography sx={{mb: ".7rem", mt: ".5rem"}}>
        {t("category")}: {category.name}
      </Typography>
      <Typography sx={{mb: ".7rem", mt: ".5rem"}}>
        Rented: {product.rented ? "true" : "false"}
      </Typography>
      <ButtonGroup sx={{position: "absolute", right: 0, bottom: 0}}>
        <Button
          startIcon={<EditOutlined />}
          color="info"
          variant="contained"
          sx={{color: "white"}}
          onClick={() => setEditing(true)}
        >
          {t("edit")}
        </Button>
        <Button
          endIcon={<DeleteOutlineOutlined />}
          color="error"
          variant="contained"
          onClick={() => setOpenConfirm(true)}
        >
          {t("delete")}
        </Button>
      </ButtonGroup>

      <RemoveProductConfirmation
        product={product}
        open={openConfirm}
        close={() => {
          setOpenConfirm(false);
          window.location.reload();
        }}
      />
    </>
  );
};

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.string().required(),
  category: yup.string().required(),
});

const EditProduct = ({
  product,
  categories,
  setEditing,
}: {
  product: any;
  categories: any[];

  setEditing: (edit: boolean) => void;
}) => {
  const {t} = useTranslation();

  const {setProduct} = useAuth();

  const [openConfirm, setOpenConfirm] = useState(false);

  const initialValues = {
    title: product.title,
    description: product.description,
    price: product.price,
    category: getCategoryById(categories, product.category).id,
    rented: product.rented,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      await setProduct(product, values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        required
        id="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        // helperText={formik.touched.description && formik.errors.description}
        variant="standard"
        sx={{width: "25rem"}}
        inputProps={{style: {fontSize: ".9rem"}}}
        InputLabelProps={{style: {fontSize: ".9rem"}}}
      />
      <TextField
        required
        multiline
        id="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        // helperText={formik.touched.description && formik.errors.description}
        variant="standard"
        sx={{width: "25rem"}}
        inputProps={{style: {fontSize: ".9rem"}}}
        InputLabelProps={{style: {fontSize: ".9rem"}}}
      />
      <TextField
        required
        multiline
        id="price"
        label="Price"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.touched.price && Boolean(formik.errors.price)}
        // helperText={formik.touched.description && formik.errors.description}
        variant="standard"
        sx={{width: "25rem"}}
        inputProps={{style: {fontSize: ".9rem"}}}
        InputLabelProps={{style: {fontSize: ".9rem"}}}
      />

      <FormControl sx={{mt: ".5rem", width: "13rem"}} variant="standard">
        <InputLabel sx={{fontSize: ".9rem"}} id="category-label">
          {t("category")}*
        </InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          label="Category"
          value={formik.values.category}
          onChange={(event) => {
            console.log("Change");
            console.log(event.target.value);
            formik.setFieldValue("category", event.target.value);
          }}
        >
          {categories.map((item, i) => {
            return (
              <MenuItem key={i} value={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Switch
            id="rented"
            checked={formik.values.rented}
            onChange={(event) => {
              formik.setFieldValue("rented", event.target.checked);
            }}
          />
        }
        label="Rented"
      />
      <ButtonGroup sx={{position: "absolute", right: 0, bottom: 0}}>
        <Button
          startIcon={<CheckOutlined />}
          color="success"
          variant="contained"
          sx={{color: "white"}}
          onClick={() => {
            setEditing(false);
            formik.handleSubmit();
          }}
        >
          {t("save")}
        </Button>
        <Button
          endIcon={<DeleteOutlineOutlined />}
          color="error"
          variant="contained"
          onClick={() => setOpenConfirm(true)}
        >
          {t("delete")}
        </Button>
      </ButtonGroup>

      <RemoveProductConfirmation
        product={product}
        open={openConfirm}
        close={() => {
          setOpenConfirm(false);
          window.location.reload();
        }}
      />
    </form>
  );
};

interface props {
  product: any;
}

export const ProductListing = ({product}: props) => {
  const {getCategories} = useAuth();

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getCategories().then((categories) => {
          setCategories(categories);
        });
      }
    });
  }, [getCategories]);

  const getCategoryById = (id: string) => {
    for (let category of categories) {
      if (category.id === id) {
        return category;
      }
    }

    return "ERROR";
  };
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const category = getCategoryById(product.category);
  return (
    <TableRow
      key={product.id}
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr .5fr",
      }}
    >
      <TableCell>
        <img src={product.image} alt={product.title} height={60} />
      </TableCell>
      <TableCell sx={{mt: "1.5rem"}}>{product.title}</TableCell>
      <TableCell sx={{mt: "1.5rem"}}>{product.price}kr</TableCell>
      <TableCell sx={{mt: "1rem"}}>
        {open ? (
          <IconButton
            onClick={() => setOpen(false)}
            sx={{width: "2rem", height: "2rem", margin: "auto"}}
          >
            <ExpandLess />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => setOpen(true)}
            sx={{width: "2rem", height: "2rem", margin: "auto"}}
          >
            <ExpandMore />
          </IconButton>
        )}
      </TableCell>
      <Collapse
        in={open}
        sx={{
          gridColumn: "1/5",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "25em",
            columnGap: "2rem",
            mt: ".5rem",
          }}
        >
          {editing ? (
            <EditProduct
              product={product}
              categories={categories}
              setEditing={setEditing}
            />
          ) : (
            <ProductInfo
              product={product}
              category={category}
              setEditing={setEditing}
            />
          )}
        </Box>
      </Collapse>
    </TableRow>
  );
};
