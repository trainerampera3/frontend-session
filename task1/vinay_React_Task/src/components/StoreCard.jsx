import '../styles/ProductCard.css'

function StoreCard({ store }) {
    return (
        <div className='store-card'>
            <div className="store-info">
                <p><strong>Store Name :</strong>{store.name}</p>
                <p><strong>Location :</strong>{store.location}</p>
                <p><strong>Phone :</strong>{store.phone}</p>
                <p><strong>Email :</strong>{store.email}</p>
                <p><strong>Status :</strong>{store.status}</p>
            </div>
        </div> 
    );
}

export default StoreCard;
