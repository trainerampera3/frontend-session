import React, {
    useEffect,
    useState
} from "react";

import {
    useParams,
    useNavigate
} from "react-router";
import { useContext } from "react";
import { CustomerContext } from "../context/CustomerContext";


export default function CustomerEdit() {

    const { id } = useParams();

    const navigate = useNavigate();


const {
    getCustomer,
    updateCustomer
} = useContext(CustomerContext);


    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [phone, setPhone] =
        useState("");

    const [gender, setGender] =
        useState("");

    const [customerGroupId, setCustomerGroupId] =
        useState("");

    const [status, setStatus] =
        useState("");


    useEffect(() => {

        async function loadCustomer() {

            try {

                setLoading(true);

                setError("");


                const customer =
                    await getCustomer(id);


                setName(
                    customer.name
                );

                setEmail(
                    customer.email
                );

                setPhone(
                    customer.phone
                );

                setGender(
                    customer.gender
                );

                setCustomerGroupId(
                    customer.customer_group_id
                );

                setStatus(
                    customer.status
                );

            } catch (error) {

                console.log(error);

                setError(
                    "Failed to load customer"
                );

            } finally {

                setLoading(false);

            }

        }


        loadCustomer();

    }, [id]);


    async function handleSave() {

        const customerData = {

            name,

            email,

            phone,

            gender,

            customer_group_id:
                Number(customerGroupId),

            status

        };


        try {

            setError("");


            await updateCustomer(
                id,
                customerData
            );


            navigate(
                `/customers/${id}`
            );

        } catch (error) {

            console.log(error);

            setError(
                "Failed to update customer"
            );

        }

    }


    function handleCancel() {

        navigate(
            `/customers/${id}`
        );

    }


    if (loading) {

        return (
            <div>
                Loading customer...
            </div>
        );

    }


    if (error) {

        return (
            <div>
                Error: {error}
            </div>
        );

    }


    return (

        <div className="customer-edit">

            <h1>
                Edit Customer
            </h1>


            <div className="form-group">

                <label>
                    Name
                </label>

                <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

            </div>


            <div className="form-group">

                <label>
                    Email
                </label>

                <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

            </div>


            <div className="form-group">

                <label>
                    Phone
                </label>

                <input
                    type="text"
                    value={phone}
                    onChange={(e) =>
                        setPhone(e.target.value)
                    }
                />

            </div>


            <div className="form-group">

                <label>
                    Gender
                </label>

                <select
                    value={gender}
                    onChange={(e) =>
                        setGender(e.target.value)
                    }
                >

                    <option value="Male">
                        Male
                    </option>

                    <option value="Female">
                        Female
                    </option>

                    <option value="Other">
                        Other
                    </option>

                </select>

            </div>


            <div className="form-group">

                <label>
                    Customer Group ID
                </label>

                <input
                    type="number"
                    value={customerGroupId}
                    onChange={(e) =>
                        setCustomerGroupId(
                            e.target.value
                        )
                    }
                />

            </div>


            <div className="form-group">

                <label>
                    Status
                </label>

                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                >

                    <option value="active">
                        Active
                    </option>

                    <option value="inactive">
                        Inactive
                    </option>

                </select>

            </div>


            <div className="form-actions">

                <button
                    onClick={handleCancel}
                >
                    Cancel
                </button>


                <button
                    onClick={handleSave}
                >
                    Save Changes
                </button>

            </div>

        </div>

    );

}