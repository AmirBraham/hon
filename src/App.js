import Footer from './Footer';
import Header from './Header';

function App() {
  return (
    <div className="App bg-gray-20">
      <Header />
      <div className="flex justify-center">
        <input type="search" className=" text-center shadow rounded border-0 p-3 outline-none" placeholder="Search by name..." />
      </div >

      <Footer />
    </div >
  );
}

export default App;
