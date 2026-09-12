
import { createContext, useState } from "react";

export const CardContext = createContext();

function CardProvider({ children }) {
    const [selectedCard, setSelectedCard] = useState(null);

    const openCard = (card) => {
        setSelectedCard(card);
    };

    const closeCard = () => {
        setSelectedCard(null);
    };

    return (
        <CardContext.Provider value={{ selectedCard, openCard, closeCard }}>
            {children}
        </CardContext.Provider>
    );
}

export default CardProvider;