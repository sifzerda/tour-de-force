import '../App'
import Cart from "../components/Cart";

function TicketConfirm() {
  return (

    <div className="container my-1-XYZ">
      <div className="card">
        <div className="card-header">
          <h2> <span><img src="../../public/images/mic.png" alt="Confetti" />
</span> Ticket Purchase Confirmed! <span><img src="../../public/images/guitar.png" alt="Confetti" />
</span> </h2>

        </div>
        <div className="card-body">
          <div className="ticket-details">
            <p className='p-white'>
              Thank you for purchasing a ticket! You will shortly receive an email with a copy of your ticket and instructions on how to access the show.
            </p>
           
          </div>
        </div>

        <Cart />
      </div>
    </div>
  );
}

export default TicketConfirm;