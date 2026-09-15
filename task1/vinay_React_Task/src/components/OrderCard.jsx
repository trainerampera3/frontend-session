
import '../styles/ProductCard.css'
import useCardModal from '../hooks/useCardModal';

function OrderCard({ order }) {

    const {openCard} = useCardModal();

    return (
        <div className='order-card'>
            <div className="order-info">
                <p><strong>Order ID :</strong>{order.order_id}</p>
                <p><strong>Total Amount :</strong>${order.grand_total}</p>
                <p><strong>Payment Type :</strong>{order.payment_type}</p>
                <p><strong>Status :</strong>{order.status}</p>
                <p><strong>Order Date :</strong>{new Date(order.created_at).toLocaleDateString()}</p>
            </div>

            <div className='order-operations'>
                <button  onClick={() => openCard(order)}>View</button> 
                <button >Edit</button>
                <button>Delete</button>   
            </div>

        </div> 
    );
}

export default OrderCard;
