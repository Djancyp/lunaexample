import Card from "../components/Card";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
declare const props: any;

function Props() {
  const { todos }: { todos: Todo[] } = props;
  return (
    <Card>
      <div>
        <h1 className="mb-2">Check frontend/Pages/Props & main.go</h1>
        {todos.map((todo) => (
          <div key={todo.id} className="flex mb-2 bg-gray-950/90 backdrop-blur flex-col px-4 py-2 rounded">
            <h1 className="text-xl">{todo.title}</h1>
            <p>{todo.completed ? "completed" : "not completed"}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default Props;
