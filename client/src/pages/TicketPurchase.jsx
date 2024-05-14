import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import Carousel from "../components/Carousel";

const TicketPurchase = () => {
  return (
    <div className="container">


      <h1>BUY A TICKET</h1>

      <Carousel />

      <CategoryMenu />
      <ProductList />
      <Cart />

    </div>
  );
};

export default TicketPurchase;
