

function Home() {
    return (
        <div className="home">

            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome Jayanth</h1>

                    <p>
                        Manage and explore dashboard in one place.
                    </p>

        
                </div>
            </section>

            <section className="features">

                <div className="feature-card">
                    <h2> Our Stores</h2>
                    <p>
                        Browse all available store branches and
                        view their details.
                    </p>
                </div>

                <div className="feature-card">
                    <h2>Our Customers</h2>
                    <p>
                        Find information about CUstomers
                        and contact details.
                    </p>
                </div>

                <div className="feature-card">
                    <h2>Products</h2>
                    <p>
                        Easily access product information whenever
                        you need to.
                    </p>
                </div>

            </section>

        </div>
    );
}

export default Home;