import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import PropTypes from "prop-types";
import classes from "./MealItem.module.css";
import { Card, CardActionArea, CardContent } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { toast } from "react-toastify";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `${props.price.toLocaleString(0)}円 (税込)`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
      image: props.image,
    });
    toast.success("カートに追加しました");
  };

  //クリックすると追加するハンドラー
  const handleCardClick = () => {
    addToCartHandler(1);
  };

  return (
    <li className={classes.meal}>
      <Card sx={{ maxWidth: 500 }}>
        <CardActionArea onClick={handleCardClick}>
          <CardContent>
            <CardMedia
              component="img"
              className={classes.image}
              image={props.image}
              alt={props.name}
            />
            <Typography variant="h5" component="h2">
              {props.name}
            </Typography>
            <Typography variant="body2" component="p" color="textSecondary">
              {props.description}
            </Typography>
            <Typography variant="body1" color="#ad5502" component="p">
              {price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </li>
  );
};

MealItem.propTypes = {
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default MealItem;
