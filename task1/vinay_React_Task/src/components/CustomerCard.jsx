
import '../styles/ProductCard.css'

import useCardModal from '../hooks/useCardModal'

function CustomerCard({ customer }){

    const {openCard} = useCardModal();

    return(
        <div className='customer-card' onClick={() =>openCard(customer)}>
            <div className="customer-info">
                <p><strong>Name :</strong>{customer.name}</p>
                <p><strong>Age :</strong>{customer.age}</p>
                <p><strong>Gender :</strong>{customer.gender}</p>
                <p><strong>Email :</strong>{customer.email}</p>
                <p><strong>Status :</strong>{customer.status}</p>
            </div>
        </div> 
    )
}


export default CustomerCard