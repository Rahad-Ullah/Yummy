import { Rating, Star } from "@smastrom/react-rating";

const RatingStar = ({ rating }: { rating: number }) => {
  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fbf1a9",
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
