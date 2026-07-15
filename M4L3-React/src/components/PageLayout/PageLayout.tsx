interface PageLayoutProps {
    children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
    return (
        <div className="page-layout">
            <header className="header">
                <nav>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                </nav>
            </header>

            <main className="main-content">
                {children}
            </main>

            <footer className="footer">
                <p>2026 Mi App</p>
            </footer>
        </div>
    )
}

export default PageLayout