import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="bg-stone-50">
        <Outlet />
      </div>
    </>
  );
}

export default App;
