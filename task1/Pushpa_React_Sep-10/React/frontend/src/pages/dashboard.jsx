import { useEffect, useState } from "react";
import { getCustomers } from "../api";
import Table from "../component/table";
import { getcustomer_address} from "../api";
import "../component/table.css";

function Dashboard() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getCustomers()
            .then((result) => {
                setCustomers(result.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    const [customer_address, setcustomer_address] = useState([]);

            useEffect(() => {
                getcustomer_address()
                    .then((result) => {
                        setcustomer_address(result.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }, []);
   return (
    <div className="dashboard">

        <div className="dashboard-header">
            <h1>Dashboard</h1>
            <p>Manage and view your application data</p>
        </div>

        <Table title="Customers" data={customers} />

        <Table title="Customer_address" data={customer_address} />

    </div>
);
}

export default Dashboard;