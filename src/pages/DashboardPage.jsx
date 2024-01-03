import axios from "../config/axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../redux/features/authSlice";
import { Option, Select } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Heading from "../components/heading/Heading";

const DashboardPage = () => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const [statisticByYear, setStatisticDataByYear] = useState([]);
  const [topAccount, setTopAccount] = useState([]);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalSale, setTotalTotalSale] = useState(0);
  const [totalOrder, setTotalTotalOrder] = useState(0);
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [month, setMonth] = useState("0");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/statistic/income?${month === "0" ? `year=${year}` : `year=${year}&month=${month}`
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStatisticDataByYear(response.data);
        console.log(response.data);
      } catch (error) {
        setStatisticDataByYear([]);
        console.log(error);
      }
    };
    fetchData();
  }, [month, token, year]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/account/CUSTOMER`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTotalCustomer(response["all-item"]);
      } catch (error) {
        setStatisticDataByYear([]);
        console.log(error);
      }
    };
    fetchData();
  }, [token]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/order?type=SUCCESSFUL`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const totalAmount = response.data
          .reduce((total, order) => total + order.orderDto.total, 0)
          .toFixed(2);
        setTotalTotalSale(totalAmount);
        setTotalTotalOrder(response["all-item"]);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/statistic/top-account`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        setTopAccount(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

  const handleChangeYear = (value) => {
    setYear(value);
  };
  const handleChangeMonth = (value) => {
    setMonth(value);
  };
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    const yearRange = Array.from(
      { length: currentYear - startYear + 1 },
      (_, index) => currentYear - index
    );

    return yearRange.map((year) => (
      <Option key={year} value={String(year)}>
        {year}
      </Option>
    ));
  };
  return (
    <>
      <div className="flex flex-col justify-center gap-3 lg:mr-16">
        <div className="flex flex-row flex-wrap">
          <div className="flex-shrink w-full max-w-full px-4">
            <p className="mt-3 mb-5 text-xl font-bold text-blue-gray-900">
              Statistics
            </p>
          </div>
          <div className="flex-shrink w-full max-w-full px-4 mb-6 sm:w-1/2 lg:w-1/4">
            <div className="h-full bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="relative px-6 pt-6 text-sm font-semibold">
                Total Orders
                <div className="text-green-500 ltr:float-right rtl:float-left">
                  +12%
                  <div
                    className="absolute top-auto mb-3 bottom-full"
                    style={{ display: "none" }}
                  >
                    <div className="z-40 w-32 p-2 -mb-1 text-sm leading-tight text-center text-white bg-black rounded-lg shadow-lg">
                      Since last month
                    </div>
                    <div className="absolute bottom-0 w-1 p-1 -mb-2 transform -rotate-45 bg-black ltr:ml-6 rtl:mr-6"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between px-6 py-4">
                <div className="relative self-center text-center text-pink-500 bg-pink-100 rounded-full w-14 h-14 dark:bg-pink-900 dark:bg-opacity-40">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bi bi-cart3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                  </svg>
                </div>
                <h2 className="self-center text-3xl">{totalOrder}</h2>
              </div>
              <div className="px-6 pb-6">
                <Link
                  className="text-sm hover:text-indigo-500"
                  to="/admin/order"
                >
                  View more...
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-shrink w-full max-w-full px-4 mb-6 sm:w-1/2 lg:w-1/4">
            <div className="h-full bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="relative px-6 pt-6 text-sm font-semibold">
                Total Sales
                <div className="text-green-500 ltr:float-right rtl:float-left">
                  +15%
                  <div
                    className="absolute top-auto mb-3 bottom-full"
                    style={{ display: "none" }}
                  >
                    <div className="z-40 w-32 p-2 -mb-1 text-sm leading-tight text-center text-white bg-black rounded-lg shadow-lg">
                      Since last month
                    </div>
                    <div className="absolute bottom-0 w-1 p-1 -mb-2 transform -rotate-45 bg-black ltr:ml-6 rtl:mr-6"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between px-6 py-4">
                <div className="relative self-center text-center text-yellow-500 bg-yellow-100 rounded-full w-14 h-14 dark:bg-yellow-900 dark:bg-opacity-40">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bi bi-credit-card"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"></path>
                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"></path>
                  </svg>
                </div>
                <h2 className="self-center text-3xl">
                  <span>$</span>
                  {user.path === 0 ? totalSale : "0"}
                </h2>
              </div>
              <div className="px-6 pb-6">
                <Link
                  className="text-sm hover:text-indigo-500"
                  to="/admin/order"
                >
                  View more...
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-shrink w-full max-w-full px-4 mb-6 sm:w-1/2 lg:w-1/4">
            <div className="h-full bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="relative px-6 pt-6 text-sm font-semibold">
                New Customers
                <div className="text-pink-500 ltr:float-right rtl:float-left">
                  -5%
                  <div
                    className="absolute top-auto mb-3 bottom-full"
                    style={{ display: "none" }}
                  >
                    <div className="z-40 w-32 p-2 -mb-1 text-sm leading-tight text-center text-white bg-black rounded-lg shadow-lg">
                      Since last month
                    </div>
                    <div className="absolute bottom-0 w-1 p-1 -mb-2 transform -rotate-45 bg-black ltr:ml-6 rtl:mr-6"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between px-6 py-4">
                <div className="relative self-center text-center text-green-500 bg-green-100 rounded-full w-14 h-14 dark:bg-green-900 dark:bg-opacity-40">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                  </svg>
                </div>
                <h2 className="self-center text-3xl">6</h2>
              </div>
              <div className="px-6 pb-6">
                <Link
                  className="text-sm hover:text-indigo-500"
                  to="/admin/account"
                >
                  View more...
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-shrink w-full max-w-full px-4 mb-6 sm:w-1/2 lg:w-1/4">
            <div className="h-full bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="relative px-6 pt-6 text-sm font-semibold">
                Total Users{" "}
                <span className="w-2 h-2 mt-1 bg-green-500 rounded-full ltr:float-right rtl:float-left animate-pulse"></span>
              </div>
              <div className="flex flex-row justify-between px-6 py-4">
                <div className="relative self-center text-center text-indigo-500 bg-indigo-100 rounded-full w-14 h-14 dark:bg-indigo-900 dark:bg-opacity-40">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bi bi-people"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
                  </svg>
                </div>
                <h2 className="self-center text-3xl">{totalCustomer}</h2>
              </div>
              <div className="px-6 pb-6">
                <Link
                  className="text-sm hover:text-indigo-500"
                  to="/admin/account"
                >
                  View more...
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {user.path === 0 && (
            <>
              <Heading className="text-center">
                Monthly or Annual Revenue Statistics
              </Heading>
              <div className="flex flex-col items-end justify-center gap-3">
                <div className="flex items-center justify-center gap-3 mr-10">
                  <Select
                    label="Select year"
                    value={year}
                    onChange={handleChangeYear}
                  >
                    {generateYearOptions()}
                  </Select>
                  <Select
                    label="Select month"
                    value={month}
                    onChange={handleChangeMonth}
                  >
                    <Option value="0">All</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value="5">5</Option>
                    <Option value="6">6</Option>
                    <Option value="7">7</Option>
                    <Option value="8">8</Option>
                    <Option value="9">9</Option>
                    <Option value="10">10</Option>
                    <Option value="11">11</Option>
                    <Option value="12">12</Option>
                  </Select>
                </div>
                <table className="w-full table-auto">
                  <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 font-medium text-gray-900">
                        ID
                      </th>
                      <th className="px-6 py-4 font-medium text-gray-900">
                        Total Product
                      </th>
                      <th className="px-6 py-4 font-medium text-gray-900">
                        Total Price
                      </th>
                      <th className="px-6 py-4 font-medium text-gray-900">
                        Total Order
                      </th>
                      <th className="px-6 py-4 font-medium text-gray-900">
                        {typeof month === "string" && month !== null
                          ? "Date"
                          : "Month"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {statisticByYear.map((item, index) => (
                      <tr key={index + 1}>
                        <td className="rc-table-cell">
                          <p className="flex items-center justify-center font-medium text-gray-700">
                            {index + 1}
                          </p>
                        </td>
                        <td className="p-3">
                          <p className="flex items-center justify-center font-medium text-gray-700">
                            {item.totalProducts}
                          </p>
                        </td>
                        <td className="p-3">
                          <p className="flex items-center justify-center font-medium text-gray-700">
                            {item.totalIncome}
                          </p>
                        </td>
                        <td className="p-3">
                          <p className="flex items-center justify-center font-medium text-gray-700">
                            {item.totalOrder}
                          </p>
                        </td>
                        <td className="p-3">
                          <p className="flex items-center justify-center font-medium text-gray-700">
                            {item.month ? item.month : item.date}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1072 2"
            fill="none"
            className="w-full h-1"
          >
            <path d="M0 1L1072 0.999887" stroke="#D1D5DB" />
          </svg>
          <Heading className="text-center">
            Top 10 Customers with the Highest Purchase Frequency
          </Heading>
          <div className="flex flex-col items-center justify-center gap-3">
            <table className="w-full table-auto">
              <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-100">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-900">ID</th>
                  <th className="px-6 py-4 font-medium text-gray-900">
                    Information
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-900">
                    Username
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-900">
                    Total Price
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-900">
                    Total Product
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {topAccount.map((item) => (
                  <tr key={item.id}>
                    <td className="rc-table-cell">
                      <p className="flex items-center justify-center font-medium text-gray-700">
                        {item.id}
                      </p>
                    </td>
                    <td className="rc-table-cell">
                      <div className="flex items-center justify-center gap-2">
                        <img
                          src={item.image}
                          alt="avatar"
                          className="object-cover w-10 h-10 rounded-full "
                          loading="lazy"
                        />
                        <div className="grid gap-0.5">
                          <p className="text-sm font-medium text-gray-900 font-lexend dark:text-gray-700">
                            {item.fullName}
                          </p>
                          <p className="text-[13px] text-gray-500">
                            {item.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <p className="flex items-center justify-center font-medium text-gray-700">
                        {item.username}
                      </p>
                    </td>
                    <td className="p-3">
                      <p className="flex items-center justify-center font-medium text-gray-700">
                        {item.totalOrders}
                      </p>
                    </td>
                    <td className="p-3">
                      <p className="flex items-center justify-center font-medium text-gray-700">
                        {item.totalProducts}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
