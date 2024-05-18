import "../../App.css";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { QUERY_SHOWS } from '../../utils/queries';
import { CREATE_TICKET } from '../../utils/mutations';
import spinner from '../../assets/spinner.gif';

const PayPalPayment = () => {
    const location = useLocation();
    const pathId = location.pathname.split('/');
    const id = pathId[pathId.length - 1];
    const queryParams = new URLSearchParams(location.search);
    const venue = queryParams.get('venue');
    const time = queryParams.get('date');

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

    const [createTicket, { loading: ticketLoading }] = useMutation(CREATE_TICKET);

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    currency_code: 'AUD',
                    value: currentShow.price // Payment amount from URL
                },
            }]
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(async function (details) {
            console.log('Payment completed:', details);
            document.getElementById('result-message').innerText = 'Payment completed successfully!';
            await handleCreateTicket(); // Create ticket once payment is successful
            window.location.href = '/tickets/purchase/confirm';
        });
    };

    const handleCreateTicket = async () => {
        try {
            console.log('Current show:', currentShow); // Log the current show object
            console.log('Show ID:', id); // Log the show ID
            console.log('Show price:', currentShow.price); // Log the show price
            console.log('Venue:', venue); // Log the venue value
            console.log('Time:', time); // Log the time value

            // Convert Unix timestamp to milliseconds and then create a Date object
            const formattedTime = new Date(parseInt(time)).toLocaleDateString('en-AU');
            console.log('formatted date:', formattedTime); // Log the time value
            // Pass show name and price as variables to the mutation
            await createTicket({
                variables: {
                    showId: id,
                    purchaseDate: new Date(), // Set purchaseDate to current date
                    show: {
                        _id: currentShow._id,
                        name: currentShow.name, // Set show name
                        price: currentShow.price, // Set show price
                        description: currentShow.description,
                        image: currentShow.image,
                        // these are taken from the current page URL query params
                        venue: venue,
                        time: formattedTime
                    }
                },
            });

            console.log('Ticket created successfully!');
            document.getElementById('result-message').innerText = 'Ticket created successfully!';
        } catch (error) {
            console.error('Failed to create ticket:', error);
            document.getElementById('result-message').innerText = 'Failed to create ticket.';
        }
    };

    if (showsLoading || ticketLoading) {
        return (
            <div>
                <img src={spinner} alt="loading" />
                Loading...
            </div>
        );
    }

    return (
        <PayPalScriptProvider options={{ "client-id": 'ASfVm9USLt1pIfj6gt7ix7hwjWbwG4Q5sebHmw0eeyIIRit-CNBQXmTUQHZZPLa1WWltlP_rvm1-eDCe', currency: "AUD" }}>
            <div>
                <div id="paypal-button-container">
                    <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        style={{ layout: 'horizontal' }} />
                </div>
                <button onClick={handleCreateTicket}>Create Ticket</button>
                <p id="result-message"></p>
            </div>
        </PayPalScriptProvider>
    );
};

export default PayPalPayment;