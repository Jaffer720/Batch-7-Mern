import axios from 'axios';
import { useEffect, useState } from 'react';

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/orders');
        
        // Safeguard for unexpected response structure
        if (response.data && response.data.data) {
          setOrders(response.data.data);
        } else {
          console.error('Unexpected response structure:', response);
          setError('Unexpected response structure from server.');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Error fetching orders.');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const removeOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8000/api/order/${orderId}`);
      
      // Update orders state after removal
      setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error removing order:', error);
      setError('Error removing order.');
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              Order #{order.id} - Total: ${order.totalPrice}
              <button onClick={() => removeOrder(order.id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
};

export default MyOrder;
