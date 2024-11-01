import { useState } from "react";
import Card from "../components/Card";
function ApiPage() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  return (
    <div>
      <Card>
        <h1>API Pages</h1>
        <button
          onClick={fetchData}
          className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring mb-5"
        >
          Fetch data
        </button>

        <ul>
          {data.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default ApiPage;
