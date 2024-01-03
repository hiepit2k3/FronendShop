import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item, className }) => {
  const { name, rate, image, min_price, max_price, order_count, id } =
    item;
  const navigate = useNavigate();
  return (
    <Card className={className} onClick={() => navigate(`/product/${id}`)}>
      <CardHeader shadow={false} floated={false} className="h-80">
        <img
          src={`data:image/png;base64,${image}`}
          alt="card-image"
          className="object-cover w-full h-full"
        />
      </CardHeader>
      <CardBody>
        <Typography
          variant="small"
          color="black"
          className="w-full text-xl font-medium"
        >
          {name}
        </Typography>
        <Typography
          color="blue-gray"
          className="flex items-center justify-start gap-2 py-2 text-xl font-medium"
        >
          {min_price !== max_price ? (
            <>
              <span>${min_price} ~ </span>
              <span>${max_price}</span>
            </>
          ) : (
            <span>${min_price}</span>
          )}
        </Typography>
        <Typography
          color="blue-gray"
          className="flex items-center justify-between gap-8 font-medium"
        >
          <span className="flex items-center gap-1">
            <Rating
              name="half-rating-read"
              value={4}
              precision={0.1}
              readOnly
              size="small"
            />
            <span className="text-sm">{rate}</span>
          </span>
          <span className="text-xs">Purchased: {order_count}</span>
        </Typography>
      </CardBody>
    </Card>
  );
};

ProductCard.propTypes = {
  name: PropTypes.string,
  item: PropTypes.object.isRequired,
  img: PropTypes.string,
  min_price: PropTypes.number,
  max_price: PropTypes.number,
  rating: PropTypes.number,
  className: PropTypes.string,
  order_count: PropTypes.number,
};

export default ProductCard;
