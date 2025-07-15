import Footer from './components/footer/Footer';
import AppRouting from './routing/AppRouting';

function App() {
  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <main className='flex-grow'>
          <AppRouting />
        </main>
        <div></div>
        <Footer />
      </div>
    </>
  )
}

export default App;
