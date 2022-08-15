import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

function CustomFooterTotalComponent(props) {
  return (
    <Box sx={{ padding: "10px", textAlign: "center", fontSize: "20px", bgcolor: "green" }}>Sub Total : {props.subtotal} ------ Impuesto: {props.impuesto} ------ Total : {props.total}</Box>
  );
}

CustomFooterTotalComponent.propTypes = {
    subtotal: PropTypes.string,
    impuesto: PropTypes.string,
    total: PropTypes.string,
};

export { CustomFooterTotalComponent };