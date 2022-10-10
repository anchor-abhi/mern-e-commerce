import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import CartDetails from "./CartDetails";
import CartItem from "./CartItem";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <Stack
      margin={{ xs: "20px ", md: "20px 40px", xl: "20px 100px" }}
      direction={{ xs: "coloumn", md: "row" }}
      spacing={2}
    >
      <Stack
        width={{ xs: "100%", xl: "50%" }}
        margin={{ xs: "none", xl: "0 30px" }}
        height="500px"
        overflow="scroll"
        borderRadius="5px"
        boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
      >
        {cartItems.map((prod) => (
          <CartItem prod={prod.product} qty={prod.quantity} />
        ))}
      </Stack>
      <Box width={{ xs: "100%", xl: "50%" }}>
        <CartDetails cartItems={cartItems} />
        <Box
          width={{ xs: "100%", md: "80%", xl: "60%" }}
          display="flex"
          justifyContent="center"
        >
          <Button
            fullWidth
            size="large"
            variant="contained"
            id="primaryBgColor"
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default Cart;
