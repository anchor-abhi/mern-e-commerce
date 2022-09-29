import { Box } from "@mui/system";
import React from "react";
import GridCategories from "./GridCategories";
import ProdImageList from "./ProdImageList";

const Categories = () => {
  return (
    <>
      <Box
        // padding={"20px 45px"}
        padding={{ xs: "5px 0px", md: "10px 45px" }}
        display="flex"
        flexDirection={{ xs: "column-reverse", md: "column" }}
      >
        <img
          width="100%"
          src="https://sslimages.shoppersstop.com/sys-master/root/hb5/h60/27269490540574/web_hp_icon-strips_main_20220322.jpg"
        />
        <GridCategories />
        <ProdImageList />
      </Box>
    </>
  );
};

export default Categories;
