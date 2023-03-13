import Router from "next/router";

import { rudderStackTrack } from "../../utils/tracking";

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    "https://api-staging.allplants.com/v1/products?product_type=MEAL,PIZZA,BREAKFAST,SIDE,SMOOTHIE,TREAT,TRAYBAKE&shop_visibility=visible"
  );
  const products = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      products: products.data,
    },
  };
}

const handleOnProductClick = (handle) => {
  rudderStackTrack("Product Clicked", { handle });
  Router.push("/checkout");
};

const renderProduct = ({ title, handle }) => {
  return (
    <li>
      <button onClick={handleOnProductClick} key={handle}>
        {title}
      </button>
    </li>
  );
};

const Shop = ({ products = [] }) => {
  return <ul>{products.map(renderProduct)}</ul>;
};

export default Shop;
