import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import ApiPage from "./Pages/Api";
import Layout from "./Layout/default";
import Props from "./Pages/Props";
import { TokenProvider } from "./StoreProvider";

function R() {
  return (
    <TokenProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/apipage" element={<ApiPage />} />
          <Route
            path="/propexample"
            element={
                <Props />
            }
          />
        </Route>
      </Routes>
    </TokenProvider>
  );
}

export default R;
