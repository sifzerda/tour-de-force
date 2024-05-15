import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import Carousel from "../components/Carousel";

const Home = () => {
  return (
    <div className="container">


      <h1>What&apos;s On</h1>

      <Carousel />



      <CategoryMenu />
      <ProductList />
      <Cart />

    </div>
  );
};

export default Home;
