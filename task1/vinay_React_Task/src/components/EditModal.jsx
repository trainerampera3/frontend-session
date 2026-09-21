import "../styles/EditModal.css";

function EditModal({ title, fields, data, onChange, onSubmit, error, onClose }) {

    return (
        <div className="edit-modal-overlay">

            <div className="edit-modal">

                <h2>{title}</h2>

                {error && <p className="edit-error">{error}</p>}

                <form onSubmit={onSubmit}>

                    {fields.map((field) => (
                        <div className="edit-field" key={field.name}>

                            <label>{field.label}</label>

                            <input
                                type={field.type || "text"}
                                name={field.name}
                                value={data[field.name] ?? ""}
                                onChange={onChange}
                            />

                        </div>
                    ))}

                    <div className="edit-actions">

                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>

                        <button type="submit">
                            Update
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditModal;