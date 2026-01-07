import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const OurStore = () => {
  return (
    <div className="w-full h-[620px] px-5 md:px-0 my-6 md:my-2">
      <div className="w-full text-center py-6 text-4xl font-semibold text-red-500">
        <h1>Our Store Location Information</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="md:px-10">
          <h1 className="font-bold text-2xl text-slate-900">Store Location </h1>
          <div className="">
            <p className="my-3">
              <strong>Store Name :</strong> Sporting Store
            </p>
            <p className="my-3">
              <strong>Address :</strong>
              <address className="inline-flex">
                123/B, Kadamtaly, Titas, Comilla, Bangladesh
              </address>
            </p>
            <p className="my-3">
              <strong>Phone :</strong> (+880) 1814-245427
            </p>
            <p className="my-3">
              <strong>Email :</strong> jamirali720@gmail.com
            </p>
            <p className="my-3">
              <strong>Hours :</strong> Monday - Friday: 9:00 AM - 5:00 PM
            </p>
            <p className="my-3">
              <strong>Postal Code :</strong> 3719
            </p>
            <p className="my-3">
              <strong>Store Manager :</strong> A. K. M. Abul khair
            </p>
          </div>
          <div className="md:my-20">
            <ul className="flex justify-center justify-items-center space-x-4">
              <li>
                <Link to="https://www.google.com" target="_blank">
                  <span className="text-[#EA4335] ">
                    <FcGoogle size={25} />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-[#1877F2] hover:text-[#4267B2] ease-in-out duration-300">
                    <FaFacebook size={25} />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.linkedin.com/in/jamir-ali-36755b1b7/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-[#0A66C2] hover:text-[#000000] ease-in-out duration-300">
                    <FaLinkedin size={25} />
                  </span>
                </Link>
              </li>
              <li>
                <Link to="https://www.instagram.com" target="_blank">
                  <span className="text-[##F58529] hover:text-[#E1306C] ease-in-out duration-300">
                    <FaInstagram size={25} />
                  </span>
                </Link>
              </li>
              <li>
                <Link to="https://www.twitter.com" target="_blank">
                  <span className="text-[#1DA1F2] hover:text-[#14171A] ease-in-out duration-300">
                    <FaTwitter size={25} />
                  </span>
                </Link>
              </li>
              <li>
                <Link to="https://www.youtube.com" target="_blank">
                  <span className="text-[#FF0000] hover:text-[#282828] ease-in-out duration-300">
                    <FaYoutube size={25} />
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="">
          <div className="md:mb-6 text-center">
            <address className="text-2xl font-bold text-slate-800">           
              Sporting Store Google Map Address
            </address>
          </div>
          <div className="w-full h-auto md:h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82772.91865515195!2d90.67864891014207!3d23.529597731549824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37545ae16659c48b%3A0x8b6204f519170228!2sGouripur%20Sporting%20Club!5e0!3m2!1sen!2sbd!4v1724327083320!5m2!1sen!2sbd"
              className="w-full h-full max-w-full"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStore;
