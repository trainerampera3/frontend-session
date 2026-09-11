import { useState, useEffect } from "react";
import "./StoresTable.css";
function StoresTable({ tableName }) {
    const [data, setData] = useState([]);
    useEffect(() => {

        fetch(`http://127.0.0.1:8000/${tableName}`)
            .then((response) => response.json())
            .then((result) => {
                setData(result);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });

    }, [tableName]);

    const columns = data.length > 0
        ? Object.keys(data[0])
        : [];


    return (
        <div className="table-container">
            <h1>{tableName}</h1>
            <table className="dynamic-table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column}>
                                {column}
                            </th>
                        ))}

                    </tr>
                </thead>

                <tbody>

                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>

                            {columns.map((column) => (
                                <td key={column}>
                                    {row[column]}
                                </td>
                            ))}

                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}

export default StoresTable;