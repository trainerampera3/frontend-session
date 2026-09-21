import '../styles/Dashboard.css'

function Dashboard() {
  return (
    <main className="dashboard">
      <section className="hero">
        <p className="hero-label">WELCOME TO</p>

        <h1>Ampera</h1>

        <p className="hero-text">
          A simple platform to manage your products, customers,
          orders and stores.
        </p>

        <div className="hero-buttons">
          <a href="/products">Explore Products</a>
          <a href="/customers">View Customers</a>
        </div>
      </section>
    </main>
  )
}

export default Dashboard