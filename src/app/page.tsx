import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold">Bienvenido a Bootcamps</h1>
      <p className="mt-4">Explora programas intensivos para aprender desarrollo web.</p>
      <div className="flex gap-4 mt-6">
        <Link href="/login" className="bg-blue-500 text-white p-2 rounded">Login</Link>
        <Link href="/register" className="bg-green-500 text-white p-2 rounded">Registro</Link>
      </div>
    </div>
  );
}
