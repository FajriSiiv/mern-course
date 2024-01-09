import { Login } from "../components/Login";

export default function Home() {
  return (
    <div className="w-full flex-col flex justify-center items-center h-screen">
      <h1 className="mb-10 text-3xl font-semibold">Login</h1>
      <div className="max-w-[600px] w-full mx-auto border p-10">
        <Login />
      </div>
    </div>
  );
}
