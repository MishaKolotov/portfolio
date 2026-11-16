import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="wrap" id="main" style={{ textAlign: 'center', padding: '120px 0' }}>
      <h1>Page not found</h1>
      <p className="lead">There is nothing at this address.</p>
      <div className="cta" style={{ justifyContent: 'center' }}>
        <Link className="btn primary" href="/">
          Back to the page
        </Link>
      </div>
    </main>
  );
}
