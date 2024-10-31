import { Outlet } from "react-router-dom";
import { Link } from "../Link";
function Layout() {
  return (
    <div className="layout bg-gradient-to-br from-gray-900 to-black text-white h-screen overflow-hidden">
      <header className="h-24 sm:h-32 flex items-center z-30 w-full">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="uppercase text-gray-800 dark:text-white font-black text-3xl">
            Luna <span className="text-violet-600 text-[42px]">.</span>
          </div>
          <div className="flex items-center">
            <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
              <Link to={"/"} className="py-2 px-6 flex">
                Home
              </Link>
              <Link to={"/apipage"} className="py-2 px-6 flex">
                Api Example
              </Link>

              <Link to={"/propexample"} className="py-2 px-6 flex">
                Props Example
              </Link>
            </nav>
            <button className="lg:hidden flex flex-col ml-4">
              <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
              <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
              <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
            </button>
          </div>
        </div>
      </header>
      <main className="h-full overflow-y-auto container mx-auto">
      <Outlet />
      </main>
    </div>
  );
}

export default Layout;
