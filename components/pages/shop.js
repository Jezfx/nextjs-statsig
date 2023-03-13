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

const renderProduct = ({ title, handle }) => {
  return <h1 key={handle}>{title}</h1>;
};

const Shop = ({ products = [] }) => {
  return <div>{products.map(renderProduct)}</div>;
};

// export default Shop;

// const Shop = () => <h1>foo</h1>;

export default Shop;
