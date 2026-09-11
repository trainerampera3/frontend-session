import React, { useState } from "react";
import "../styles/CustomerCard.scss";

export default function CustomerCard({
    customer,
    onUpdate,
    onDelete
}) {
    const [showEditModal, setShowEditModal] = useState(false);

    const [name, setName] = useState(customer.name);
    const [email, setEmail] = useState(customer.email);
    const [phone, setPhone] = useState(customer.phone);
    const [gender, setGender] = useState(customer.gender);
    const [customerGroupId, setCustomerGroupId] =
        useState(customer.customer_group_id);
    const [status, setStatus] = useState(customer.status);

    function handleEdit() {
        setName(customer.name);
        setEmail(customer.email);
        setPhone(customer.phone);
        setGender(customer.gender);
        setCustomerGroupId(customer.customer_group_id);
        setStatus(customer.status);

        setShowEditModal(true);
    }

    function handleCancel() {
        setShowEditModal(false);
    }

    async function handleSave() {
        const customerData = {
            name,
            email,
            phone,
            gender,
            customer_group_id: Number(customerGroupId),
            status
        };

        try {
            await onUpdate(
                customer.customer_id,
                customerData
            );

            setShowEditModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    function handleDelete() {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${customer.name}?`
        );

        if (confirmed) {
            onDelete(customer.customer_id);
        }
    }

    return (
        <>
            <div className="customer-card">

                <h2>{customer.name}</h2>

                <p>
                    <strong>Email:</strong> {customer.email}
                </p>

                <p>
                    <strong>Phone:</strong> {customer.phone}
                </p>

                <p>
                    <strong>Gender:</strong> {customer.gender}
                </p>

                <p>
                    <strong>Status:</strong> {customer.status}
                </p>

                <div className="card-actions">

                    <button
                        className="edit-btn"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>

                    <button
                        className="delete-btn"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>

                </div>

            </div>


            {showEditModal && (

                <div className="modal-overlay">

                    <div className="edit-modal">

                        <div className="modal-header">

                            <h2>Edit Customer</h2>

                            <button
                                className="close-btn"
                                onClick={handleCancel}
                            >
                                ×
                            </button>

                        </div>


                        <div className="modal-body">

                            <div className="form-group">

                                <label>Name</label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                />

                            </div>


                            <div className="form-group">

                                <label>Email</label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />

                            </div>


                            <div className="form-group">

                                <label>Phone</label>

                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(e.target.value)
                                    }
                                />

                            </div>


                            <div className="form-group">

                                <label>Gender</label>

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

                                <label>Status</label>

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

                        </div>


                        <div className="modal-footer">

                            <button
                                className="cancel-btn"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                            <button
                                className="save-btn"
                                onClick={handleSave}
                            >
                                Save Changes
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}