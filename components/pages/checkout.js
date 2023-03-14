import { useEffect } from "react";
import { rudderstackTrack } from "../../utils/tracking";

const Checkout = () => {
  useEffect(() => {
    rudderstackTrack("Checkout Page Viewed");
  }, []);

  return <h1>this is the checkout page</h1>;
};

export default Checkout;
