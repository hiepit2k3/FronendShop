import Footer from "../components/footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import PropTypes from "prop-types";

const SiteLayout = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </>
  );
};

SiteLayout.propTypes = {
  children: PropTypes.any,
};

export default SiteLayout;
