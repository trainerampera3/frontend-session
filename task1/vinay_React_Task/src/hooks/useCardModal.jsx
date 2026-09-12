import { useContext } from "react";
import { CardContext } from "../context/CardContext.jsx";

function useCardModal() {
    return useContext(CardContext);
}

export default useCardModal;