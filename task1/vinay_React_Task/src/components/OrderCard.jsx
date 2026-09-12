
import '../styles/ProductCard.css'

function OrderCard({ order }) {
    return (
        <div className='order-card'>
            <div className="order-info">
                <p><strong>Order ID :</strong>{order.order_id}</p>
                <p><strong>Total Amount :</strong>${order.grand_total}</p>
                <p><strong>Payment Type :</strong>{order.payment_type}</p>
                <p><strong>Status :</strong>{order.status}</p>
                <p><strong>Order Date :</strong>{new Date(order.created_at).toLocaleDateString()}</p>
            </div>
        </div> 
    );
}

export default OrderCard;
