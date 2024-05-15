import "../../App.css";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { QUERY_SHOWS } from '../../utils/queries';


const PayPalPayment = () => {
    const location = useLocation();
    const pathId = location.pathname.split('/');
    const id = pathId[pathId.length - 1];
    const queryParams = new URLSearchParams(location.search);
    const price = queryParams.get('price');
    // Define productName as a variable or string literal
    //const ticketString = '<strong>Entry Pass to </strong>'; // HTML string for 'ticket'
    //console.log('ticketString:', ticketString); 

    const [currentShow, setCurrentShow] = useState({});
    const { loading: showsLoading, data: showsData } = useQuery(QUERY_SHOWS, {
        variables: { id },
    });

    useEffect(() => {
        if (showsData && showsData.shows) {
            const foundShow = showsData.shows.find((show) => show._id === id);
            setCurrentShow(foundShow || {});
        }
    }, [showsData, id]);

    const productName = currentShow.name || 'Show entry pass'; // show name or default
    //console.log('productName:', productName); // debugging
    //console.log('ticketString:', ticketString); // debugging

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    currency_code: 'AUD',
                    value: price // Payment amount from URL
                },
                description: `${productName}`, // Product name with 'ticket'
            }]
        });
    };

// ONCE PURCHASE COMPLETED, WRITE TICKET INTO USER MODEL (i.e. mutation update User), AND SEND USER TO THE TICKET CONFIRM PAGE
// ALSO ON ORDER HISTORY PAGE (USER PROFILE) GRAB (newly updated/made) user.ticket and display on their profile page in order history
// ALSO WHEN UPDATING USER MODEL CONSIDER ADDING A FIELD FOR STAR RATING (which will be a number 0-5)

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            // Handle successful payment
            // WRITING TICKET INTO USER MODEL WILL BE DONE HERE BELOW <<<<<<<<<<<
            console.log('Payment completed:', details);
            document.getElementById('result-message').innerText = 'Payment completed successfully!';
        });
    };

    if (showsLoading) {
        return <div>Loading...</div>; // Show a loading indicator while data is loading
    }

    return (
        <PayPalScriptProvider options={{
            "client-id": 'ASfVm9USLt1pIfj6gt7ix7hwjWbwG4Q5sebHmw0eeyIIRit-CNBQXmTUQHZZPLa1WWltlP_rvm1-eDCe',
            currency: "AUD"
        }}>
            <div>
                <div id="paypal-button-container">
                    <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        style={{ layout: 'horizontal' }} // Button layout
                    />
                </div>
                <p id="result-message"></p>
            </div>
        </PayPalScriptProvider>
    );
};

export default PayPalPayment;