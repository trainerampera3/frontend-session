import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import KPICards from "./Component/KPICards";
import CustomerDetails from "./Component/CustomerDetails";
import CustomerEdit from "./Component/CustomerEdit";
import NotFound from "./Component/NotFound";

import CustomerProvider from "./context/CustomerContext";

export default function App() {
    return (

        <CustomerProvider>
        
        <BrowserRouter>

            <Routes>

           
                <Route
                    path="/customers"
                    element={<KPICards/>}
                />

             
                <Route
                    path="/customers/:id"
                    element={<CustomerDetails />}
                />

               
                <Route
                    path="/customers/:id/edit"
                    element={<CustomerEdit />}
                />

                
                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/customers"
                            replace
                        />
                    }
                />

               
                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>
        </CustomerProvider>
    );
}