import image1 from "../../assets/images/Image-9-1.png";

import image4 from "../../assets/images/player-bg.png";

import image7 from "../../assets/images/p3.jpg";

import { GiCornerFlag } from "react-icons/gi";
import { FaRunning } from "react-icons/fa";
import { MdOutlineSportsHandball } from "react-icons/md";

import Contact from "../contact/Contact";
import MIssionAndVision from "./MIssionAndVision";
import OurTeam from "./OurTeam";
import OurStore from "./OurStore";
import MetaData from "../MetaData/MetaData";

const About = () => {
  return (
    <main className="my-2 md:my-0 relative ">
      <MetaData title="About Us" />
      <section className="w-screen h-full md:h-[420px] relative">
        <div className="w-full h-full bg-[#1f1d1d] bg-opacity-20">
          <img
            src={image7}
            alt="sports-image"
            className="size-full object-content"
          />
        </div>
        <div className="absolute top-40 w-full h-full">
          <h1 className="text-7xl font-bold text-center text-red-500 ">
            About Us
          </h1>
        </div>
      </section>
      <section className="w-full h-auto md:h-[850px] border p-1">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="w-full h-full  relative py-10 md:py-16">
            <img
              className=" w-full h-[700px] rounded-lg "
              src={image1}
              alt=""
            />
            <div className="w-56 h-56 md:w-72 md:h-72  flex-col justify-items-center justify-center rounded-full bg-red-500 border-8 border-white p-8 md:p-14 absolute ml-10 translate-x-64 md:translate-x-80 -translate-y-48 md:-translate-y-72 sm:translate-x-72">
              <img className="size-8 md:size-16 mx-auto " src={image4} alt="" />
              <h1 className="text-center text-xl md:text-5xl text-white my-2">
                20 +
              </h1>
              <h1 className="text-center text-white text-xl my-2">
                Years of experience
              </h1>
            </div>
          </div>
          <div className="w-full h-full p-5 md:py-16 md:px-20">
            <div className="mb-8">
              <h1 className="text-start font-semibold text-2xl text-red-500">
                About Us
              </h1>
            </div>
            <div className="text-5xl text-[#3F3F3F] font-bold">
              <h1> We Are The Best Sports Academy</h1>
            </div>
            <div className="text-justify my-10">
              <p>
                Welcome to SportsMI, where we are committed to transforming
                athletes into champions. Founded on the principles of
                excellence, dedication, and passion, SportsMI aims to provide a
                supportive and dynamic environment for athletes of all ages and
                skill levels.
              </p>
            </div>
            {/*  right site */}
            <div className="my-6 ">
              <div className="flex justify-start justify-items-center my-4  ">
                <div className="w-14 h-14 border rounded-md flex justify-center justify-items-center p-2 mr-4">
                  <span>
                    <GiCornerFlag size={30} color="red" />
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-semibold text-[#3F3F3F] ">
                    Professional Team
                  </h1>
                  <p className="text-md text-gray-500 ">
                    Modern & latest equipment with expert coaching
                  </p>
                </div>
              </div>
              <div className="flex justify-start justify-items-center my-4">
                <div className="w-14 h-14 border rounded-md flex justify-center justify-items-center p-2 mr-4">
                  <span>
                    <MdOutlineSportsHandball size={30} color="red" />;
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-semibold text-[#3F3F3F]">
                    Professional Trainings
                  </h1>
                  <p className="text-md text-gray-500">
                    Modern & latest equipment with expert coaching
                  </p>
                </div>
              </div>
              <div className="flex justify-start justify-items-center my-4">
                <div className="w-14 h-14 border rounded-md flex justify-center justify-items-center p-2 mr-4">
                  <span>
                    <FaRunning size={30} color="red" />
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-semibold text-[#3F3F3F]">
                    Practice Facilities
                  </h1>
                  <p className="text-md text-gray-500">
                    Modern & latest equipment with expert coaching
                  </p>
                </div>
              </div>
              <div className="w-full h-28 flex justify-end">
                <img src={image4} alt="" className="w-32 h-32 md:h-48" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* our mission and vision section */}
      <MIssionAndVision />

      {/* Contact SECTION  */}
      <section>
        <Contact />
      </section>

      {/* OUR TEAM SECTION start from here */}
      <section>
        <OurTeam />
      </section>
      <section>
        <OurStore />
      </section>
    </main>
  );
};

export default About;
