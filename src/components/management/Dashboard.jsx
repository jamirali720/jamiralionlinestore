import { Card } from "antd";
import image from '../../assets/images/player-bg.png'
const Dashboard = () => {
  return (
    <div className="w-screen md:w-full ">
      <section className="w-full  h-full p-2 my-1 md:my-0 bg-[#EEEEEE]">
        <header className="w-full h-14 ">
          <h1 className="text-start text-2xl pt-3">Dashboard</h1>
        </header>
      </section>
      <section className="w-full h-full p-2  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
        <Card className="w-full md:w-64 h-24 shadow-lg bg-[#FFFFFF]">
          <div className="grid grid-cols-2 gap-4">
            <img src={image} alt="" className="w-24 h-14" />
            <div>
              <h1> 25000 </h1>
              <p> Total Sales </p>
            </div>
          </div>
        </Card>

        <Card className="w-full md:w-64 h-24 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <img src={image} alt="" className="w-24 h-14" />
            <div>
              <h1> 25000 </h1>
              <p> Total Sales </p>
            </div>
          </div>
        </Card>
        <Card className="w-full md:w-64 h-24 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <img src={image} alt="" className="w-24 h-14" />
            <div>
              <h1> 25000 </h1>
              <p> Total Sales </p>
            </div>
          </div>
        </Card>
        <Card className="w-full md:w-64 h-24 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <img src={image} alt="" className="w-24 h-14" />
            <div>
              <h1> 25000 </h1>
              <p> Total Sales </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
