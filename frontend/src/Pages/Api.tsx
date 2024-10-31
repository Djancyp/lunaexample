import { useState } from "react";
import Card from "../components/Card";
function ApiPage() {
  const [data, setData] = useState([]);
  return (
    <div>
      <Card>
        <h1>API Pages for me this is test</h1>
        <p>API pages</p>
      </Card>
    </div>
  );
}

export default ApiPage;
