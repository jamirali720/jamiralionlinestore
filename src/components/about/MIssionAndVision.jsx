import { Button } from "antd";

import image3 from "../../assets/images/p2.jpg";

import image5 from "../../assets/images/team1.png";
import image6 from "../../assets/images/sports.jpg";
import image7 from "../../assets/images/p3.jpg";

const MIssionAndVision = () => {
  return (
    <section className="w-screen h-full md:h-auto my-10">
      <div className="w-screen h-full px-1 md:px-16 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
          <div className="w-full h-full py-10 px-1">
            <div className="my-2">
              <h1 className="text-red-400 font-bold text-3xl">Our Mission</h1>
              <h1 className="text-5xl font-bold text-[#0D0E10] my-5">
                Innovating for Success:
              </h1>
              <h1 className="text-5xl font-bold text-[#0D0E10] my-4">
                Our Sports Mission
              </h1>
              <div className="">
                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta consectetur quod cum omnis fugit hic temporibus dolores
                  laudantium nulla dolorem rerum architecto, nesciunt voluptate
                  commodi necessitatibus recusandae adipisci, officia
                  consequatur id consequuntur eos. Minus rem, doloremque non
                  quae reiciendis ut? Nisi nihil nemo doloremque, eligendi
                  beatae minus ratione possimus adipisci?
                </p>
                <p className="my-5 text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequuntur velit sint praesentium blanditiis consequatur sed
                  placeat voluptatem sapiente dicta amet aspernatur, excepturi
                  accusamus, deleniti, cupiditate odit? Alias voluptatum nihil
                  aperiam pariatur iste quis sequi magni cum enim itaque minima
                  dolore dolorem eum corrupti, aspernatur totam provident
                  voluptatem suscipit similique quisquam?
                </p>
              </div>
            </div>
            <div>
              <Button type="default" className="py-6 px-8 uppercase">
                Know More
              </Button>
            </div>
          </div>
          {/* under visions part */}
          <div className="w-full h-full py-10">
            <img src={image5} className="size-full" alt="" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
          <div className="w-full h-full py-10">
            <div className="w-full h-auto my-3 ">
              <img src={image6} className="w-full h-[250px]" alt="" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <img src={image3} className="w-full h-[250px]" alt="" />
              </div>
              <div>
                <img src={image7} className="w-full h-[250px]" alt="" />
              </div>
            </div>
          </div>
          <div className="w-full h-full py-10 px-1">
            <div className="my-2">
              <h1 className="text-red-400 font-bold text-3xl">Our Vision</h1>
              <h1 className="text-5xl font-bold text-[#0D0E10] my-5">
                Driving Innovation :
              </h1>
              <h1 className="text-5xl font-bold text-[#0D0E10] my-4">
                Our Vision at Sporting Store
              </h1>
              <div className="">
                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta consectetur quod cum omnis fugit hic temporibus dolores
                  laudantium nulla dolorem rerum architecto, nesciunt voluptate
                  commodi necessitatibus recusandae adipisci, officia
                  consequatur id consequuntur eos. Minus rem, doloremque non
                  quae reiciendis ut? Nisi nihil nemo doloremque, eligendi
                  beatae minus ratione possimus adipisci?
                </p>
                <p className="my-5 text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequuntur velit sint praesentium blanditiis consequatur sed
                  placeat voluptatem sapiente dicta amet aspernatur, excepturi
                  accusamus, deleniti, cupiditate odit? Alias voluptatum nihil
                  aperiam pariatur iste quis sequi magni cum enim itaque minima
                  dolore dolorem eum corrupti, aspernatur totam provident
                  voluptatem suscipit similique quisquam?
                </p>
              </div>
            </div>
            <div>
              <Button type="default" className="py-6 px-8 uppercase">
                Know More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MIssionAndVision;
