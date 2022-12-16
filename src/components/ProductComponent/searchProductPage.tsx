import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {Button, Card} from "@mui/material";
import {ChangeEvent, SetStateAction, useEffect, useState} from "react";
import {useAuth} from "../../backend/Context";
import {useTranslation} from "react-i18next";

const SearchIconWrapper = styled("div")(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

interface Props {
  setSearchString: SetStateAction<any>;
}

export default function SearchIconComponent({setSearchString}: Props) {
  const {t} = useTranslation();

  const {getCategories, setFilter} = useAuth();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, [getCategories]);

  const filterProducts = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchString(target.value);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Toolbar
        sx={{
          diplay: "flex",
          justifyContent: "space-around",
          "@media screen and (max-width: 850px)": {
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          },
        }}
      >
        <Button
          onClick={() => {
            setFilter(null);
          }}
        >
          {t("remove_filter")}
        </Button>
        {categories.map((item) => {
          return (
            <>
              <hr
                style={{
                  height: "1.7rem",
                  margin: "0",
                  backgroundColor: "pink",
                }}
              />
              <Button
                onClick={() => {
                  setFilter(item.id);
                }}
              >
                {item.name}
              </Button>
            </>
          );
        })}
        <hr
          style={{
            height: "1.7rem",
            margin: "0",
            backgroundColor: "pink",
          }}
        />
        <Button
          onClick={() => {
            setFilter("free");
          }}
        >
          Free
        </Button>
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            "@media screen and (max-width: 1110px)": {display: "none"},
          }}
        >
          <SearchIconWrapper>
            <SearchIcon sx={{color: "pink"}} />
          </SearchIconWrapper>
          <StyledInputBase
            onChange={filterProducts}
            placeholder="Search…"
            inputProps={{"aria-label": "search"}}
          />
        </Card>
      </Toolbar>
    </Box>
  );
}
