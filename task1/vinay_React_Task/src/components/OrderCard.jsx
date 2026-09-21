import { useState } from 'react'
import '../styles/ProductCard.css'
import useCardModal from '../hooks/useCardModal';
import EditModal from './EditModal';

function OrderCard({ order, onUpdate ,onDelete}) {

    const {openCard} = useCardModal();
    const [editOpen, setEditOpen] = useState(false);
    const [formData, setFormData] = useState(order);
    const [error, setError] = useState('');

    const fields = [
        { name: 'customer_id', label: 'Customer ID', type: 'number' },
        { name: 'store_id', label: 'Store ID', type: 'number' },
        { name: 'payment_type', label: 'Payment Type' },
        { name: 'status', label: 'Status' },
        { name: 'discount', label: 'Discount', type: 'number' }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("UPDATE CLICKED");
    console.log("FORM DATA:", formData);

        setError('');

        if (!formData.customer_id || !formData.store_id) {
            setError('Customer ID and Store ID are required');
            return;
        }

        const result = await onUpdate(order.order_id, {
            customer_id: Number(formData.customer_id),
            store_id: Number(formData.store_id),
            payment_type: formData.payment_type,
            status: formData.status,
            discount: Number(formData.discount)
        });

        if (result.success) {
            setEditOpen(false);
        } else {
            setError(result.message);
        }
    };

    return (
        <>
            <div className='order-card'>

                <div className="order-info">
                    <p><strong>Order ID :</strong>{order.order_id}</p>
                    <p><strong>Total Amount :</strong>${order.grand_total}</p>
                    <p><strong>Payment Type :</strong>{order.payment_type}</p>
                    <p><strong>Status :</strong>{order.status}</p>
                    <p><strong>Order Date :</strong>{new Date(order.created_at).toLocaleDateString()}</p>
                </div>

                <div className='order-operations'>
                    <button onClick={() => openCard(order)}>View</button>

                    <button onClick={() => {
                        setFormData(order);
                        setError('');
                        setEditOpen(true);
                    }}>
                        Edit
                    </button>

                    <button onClick={() => onDelete(order.order_id)}>Delete</button>
                </div>

            </div>

            {editOpen && (
                <EditModal
                    title="Edit Order"
                    fields={fields}
                    data={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    error={error}
                    onClose={() => setEditOpen(false)}
                />
            )}
        </>
    );
}

export default OrderCard;