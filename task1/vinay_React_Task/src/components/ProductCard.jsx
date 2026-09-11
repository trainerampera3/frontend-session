import '../styles/ProductCard.css'

function ProductCard(props){
    return(
        <div className='product-card'>
            <img className="product-image" src={props.product.image_url} alt={props.product.image_title} />
            <div className = "product-content">
                <h3>{props.product.name}</h3>
                <p> {props.product.short_desc}</p>
                <p> {props.product.description}</p>

                <p className='product-status'>
                    {props.product.status == 'active' ? 'In Stock': 'Out of Stock' }
                </p>
                
                <div className = 'product-specifications'>
                    <h4>Specifications</h4>
                    {
                        Object.entries(props.product.specifications).map(([key, value])=>
                            <p>
                                <strong>{key} :</strong> {value}
                            </p>
                        )
                    }
                </div>

                <div className = 'product-additional-data'>
                    <h4>Additional Data</h4>
                    {
                        Object.entries(props.product.additional_data).map(([key, value])=>
                            <p>
                                <strong>{key} :</strong> {value}
                            </p>
                        )
                    }
                </div>



                <p>{props.product.created_at}</p>
                <p>{props.product.updated_at}</p>

            </div>
        </div>
    )
}

export default  ProductCard