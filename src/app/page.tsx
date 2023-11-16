import Index from './pages/index';

const renderPage = () => {
    return <Index />;
};

export default function Home() {
    return (
      <main >
        {renderPage()}
      </main>
    );
}
