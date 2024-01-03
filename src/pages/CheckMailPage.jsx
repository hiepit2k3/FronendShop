import logo from "../assets/images/4616089.png";

const CheckMailPage = () => {
  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen ">
        <div className="flex flex-col gap-2 items-center justify-center p-12 bg-white rounded-3xl w-[550px] shadow-3xl outline outline-2 outline-gray-700">
          <img src={logo} width="35%" alt="" className="" />
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-800">
              Thank you for choosing us!
            </h1>
            <h2 className="text-gray-600 ">
              Follow these simple steps to complete the account creation
              process:
            </h2>
            <div className="text-gray-400">
              <ol className="list-decimal">
                <li>
                  Visit your email account, open the email sent by The Trendy
                  Fashionista
                </li>
                <li>
                  Follow the instructions in the email to complete the account
                  registration process
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckMailPage;
