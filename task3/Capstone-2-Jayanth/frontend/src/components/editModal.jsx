import { useState } from "react";

function EditModal({data, fields, onClose, onSave}){
    const [formData, setFormData] = useState(data);
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData((prev) =>({
            ...prev, 
            [name]:value
        }))
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        onSave(formData);
    }

    return <>
     <div className="modal-overlay">
        <div className="edit-modal">
            <div className="modal-header">
                <h2>Edit</h2>
                <button  className="modal-close" onClick={onClose}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <div className="form-group" key={field}>
                        <label>{field}</label>
                        <input type="text" name={field} value={formData[field] ?? ""} onChange={handleChange}/>
                    </div>
                ))}
                <div className="modal-actions">
                    <button type='button' className="cancel-btn" onClick={onClose}>Cancel</button>
                    <button type="submit" className="save-btn">Save</button>
                </div>
            </form>
        </div>
     </div>
    </>
}
export default EditModal