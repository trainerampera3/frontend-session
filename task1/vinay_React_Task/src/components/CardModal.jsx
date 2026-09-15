
import useCardModal from "../hooks/useCardModal";
import "../styles/CardModal.css";

function CardModal() {
    const { selectedCard, closeCard } = useCardModal();

    if (!selectedCard) return null;

    return (
        <div className="modal-card">
            <div className="modal">
                <button className="close-button" onClick={closeCard}>
                    X
                </button>

                <h2>Details</h2>

                {Object.entries(selectedCard).map(([key, value]) => 
                    key != 'password'  && key != 'customer_id' && (
                    <p key={key}>
                        <strong>{key} :</strong> {String(value)}
                    </p>
                    
                ))}
            </div>
        </div>
    );
}

export default CardModal;