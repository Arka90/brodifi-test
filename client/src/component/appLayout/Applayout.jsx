import { Outlet } from "react-router-dom";
const Applayout = () => {
  return (
    <div className="App">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Applayout;
