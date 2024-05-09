import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import Carousel from "../components/Carousel";

const Home = () => {
  return (
    <div className="container">


      <p className="whats-on">What&apos;s On</p>

      <Carousel />

      <CategoryMenu />
      <ProductList />
      <Cart />

    </div>
  );
};

export default Home;
