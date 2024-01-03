import { Input } from "@material-tailwind/react";
import Button from "../button/Button";
import pay1 from "../../assets/images/paypal.png";
import pay2 from "../../assets/images/vnpay.png";
import pay3 from "../../assets/images/pay3.png";
import pay6 from "../../assets/images/shoppe.png";
import pay5 from "../../assets/images/zalopay.png";

const Footer = () => {
  return (
    <>
      <div className="flex items-end w-full mt-10 bg-white">
        <footer className="w-full text-gray-700 bg-gray-100 body-font">
          <div className="container flex flex-col flex-wrap px-5 py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
            <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
              <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
                  About
                </h2>
                <nav className="mb-10 list-none">
                  <li className="mt-3">
                    <a className="text-gray-500 cursor-pointer hover:text-gray-900">
                      Company
                    </a>
                  </li>
                  <li className="mt-3">
                    <a className="text-gray-500 cursor-pointer hover:text-gray-900">
                      Careers
                    </a>
                  </li>
                  <li className="mt-3">
                    <a className="text-gray-500 cursor-pointer hover:text-gray-900">
                      Blog
                    </a>
                  </li>
                </nav>
              </div>
              <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
                  Support
                </h2>
                <nav className="mb-10 list-none">
                  <li className="mt-3">
                    <a className="text-gray-500 cursor-pointer hover:text-gray-900">
                      Contact Support
                    </a>
                  </li>
                  <li className="mt-3">
                    <a className="text-gray-500 cursor-pointer hover:text-gray-900">
                      Help Resources
                    </a>
                  </li>
                  <li className="mt-3">
                    <a className="text-gray-500 cursor-pointer hover:text-gray-900">
                      Release Updates
                    </a>
                  </li>
                </nav>
              </div>
              <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
                  Platform
                </h2>
                <nav className="mb-10 list-none">
                  <li className="mt-3">
                    <a className="text-gray-500 cursor-pointer hover:text-gray-900">
                      Terms &amp; Privacy
                    </a>
                  </li>
                  <li className="mt-3">
                    <a className="text-gray-500 cursor-pointer hover:text-gray-900">
                      Pricing
                    </a>
                  </li>
                  <li className="mt-3">
                    <a className="text-gray-500 cursor-pointer hover:text-gray-900">
                      FAQ
                    </a>
                  </li>
                </nav>
              </div>
              <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
                  NEWSLETTER
                </h2>
                <nav className="mb-10 list-none">
                  <li className="mt-3">
                    <Input variant="static" placeholder="email@example.com" />
                  </li>
                  <li className="mt-3">
                    <Button className="rounded-full w-[160px] hover:bg-gray-800">
                      Subscribe
                    </Button>
                  </li>
                </nav>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <a href="">
              <img src={pay1} width="60px" alt="" />
            </a>
            <a href="">
              <img src={pay3} width="40px" alt="" />
            </a>
            <a href="" className="mx-2">
              <img src={pay2} width="22px" alt="" />
            </a>
            <a href="">
              <img src={pay5} width="30x" alt="" />
            </a>
            <a href="">
              <img src={pay6} width="40x" alt="" />
            </a>
          </div>
          <div className="">
            <div className="container px-5 py-4 mx-auto">
              <p className="text-sm text-gray-700 capitalize xl:text-center">
                Copyright ©2023 All rights reserved | Made with by Trần Hữu Hiếu
                & distributed by Trần Hữu Hiếu
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
