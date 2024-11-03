import { useState } from "react";
import reactLogo from "../assets/react.svg";
import GoLogo from "../assets/go.svg";
import EchoLogo from "../assets/echo.svg";
import Card from "../components/Card";
import { useUser } from "../StoreProvider";

function HomePage() {
  const [count, setCount] = useState(0);
  const { user } = useUser();

  return (
    <>
      <Card>
        <div className="flex items-center">
          <a href="https://go.dev/" target="_blank" className="w-[130px] mr-5">
            <img src={GoLogo} className="logo react" alt="React logo" />
          </a>

          <a
            href="https://echo.labstack.com/"
            target="_blank"
            className="w-[160px] mr-5"
          >
            <img src={EchoLogo} alt="React logo" className="w-full" />
          </a>
          <a href="https://reactjs.org" target="_blank" className="w-[80px]">
            <img src={reactLogo} alt="React logo" className="w-full" />
          </a>
        </div>
      </Card>
      <Card>
        <div className="flex justify-center flex-col ">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring mb-5"
          >
            count is {count}
          </button>
          <p className="mb-5">
            {user ? `Hello ${user.name}` : "Hello, please login"}
          </p>
          <p className="mb-5">
            Edit <code>src/Pages/Home.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Go,Echo and React logos to learn more.
        </p>
      </Card>
    </>
  );
}

export default HomePage;
