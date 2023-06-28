const todos: string[] = ['Learn React'];

export default function Home() {
  return (
    <main>
      <ul>
        {todos.map((task, index) => ( <li key={`bob-${index}`}>{task}</li>))}
      </ul>
    </main>
  )
}
