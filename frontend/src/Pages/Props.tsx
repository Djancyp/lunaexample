import Card from "../components/Card";
function Props() {
  const {title} = globalThis.props[window.location.pathname]
  return (
    <Card>
      <h1>Check frontend/Pages/Props</h1>
      {title}
    </Card>
  );
}

export default Props;
