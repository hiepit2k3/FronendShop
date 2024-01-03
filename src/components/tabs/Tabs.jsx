import PropTypes from "prop-types";

const Tabs = ({ activeTab, onChange, tabs }) => {
  return (
    <div className="inline-flex flex-row">
      {tabs.map((tab) => (
        <div
          key={tab.value}
          className={`cursor-pointer p-3 w-full border text-center ${
            activeTab === tab.value
              ? "text-gray-800 border-b-2 border-blue-500 border-r-blue-gray-100 border-l-blue-gray-100 border-t-blue-gray-100"
              : ""
          }`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string,
  tabs: PropTypes.array,
  onChange: PropTypes.func,
};

export default Tabs;
