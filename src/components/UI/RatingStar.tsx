import { Rating, Star } from "@smastrom/react-rating";

const RatingStar = ({ rating }: { rating: number }) => {
  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#ff9900",
    inactiveFillColor: "#ffd699",
  };

  return (
    <Rating
      readOnly
      itemStyles={myStyles}
      style={{ maxWidth: 100 }}
      value={rating}
    />
  );
};

export default RatingStar;
