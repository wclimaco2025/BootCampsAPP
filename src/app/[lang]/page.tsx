import Link from "next/link";
import { Footer, Header } from "../components";
import { BootCamp } from "@/types/BootCamps.types";

export default function Home() {
  // Datos de ejemplo para cursos destacados
  const featuredCourses: BootCamp[] = [
    {
      duration_weel: 8,
      price: 299,
      technology: "TYPESCRIPT",
      level: "INTERMEDIATE",
      image_url: "/api/placeholder/300/200",
      start_date: new Date("2024-04-15"),
      instructor: "María Rodríguez",
      max_students: 25,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      duration_weel: 12,
      price: 499,
      technology: "JAVASCRIPT",
      level: "BEGINNER",
      image_url: "/api/placeholder/300/200",
      start_date: new Date("2024-05-01"),
      instructor: "Carlos Méndez",
      max_students: 30,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      duration_weel: 10,
      price: 399,
      technology: "PYTHON",
      level: "ADVANCED",
      image_url: "/api/placeholder/300/200",
      start_date: new Date("2024-04-20"),
      instructor: "Ana López",
      max_students: 20,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header />
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Aprende habilidades tecnológicas con los mejores instructores
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Descubre cursos en línea de alta calidad en programación, diseño y
              más. Aprende a tu propio ritmo y avanza en tu carrera profesional.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/signup"className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Comenzar Ahora
              </Link> 
              {/* <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Comenzar ahora
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Explorar cursos
              </button> */}
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute top-20 left-20 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

              <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Vista previa del curso</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Curso Destacado</h3>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">$299</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-1"></div>
                    <span className="text-sm text-gray-600">8 semanas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Cursos Destacados
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Imagen del curso</span>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {course.technology}
                      </span>
                      <span className="text-sm text-gray-500">
                        {course.duration_weel} semanas
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">
                      Curso de {course.technology} - {course.level}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Instructor: {course.instructor}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-semibold">
                        ${course.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        Inicia: {course.start_date.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                Ver todos los cursos
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              ¿Por qué elegirnos?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Contenido de calidad</h3>
                <p className="text-gray-600">
                  Cursos creados por expertos en la industria con contenido
                  actualizado.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Comunidad activa</h3>
                <p className="text-gray-600">
                  Conecta con otros estudiantes y comparte conocimientos.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Acceso permanente</h3>
                <p className="text-gray-600">
                  Accede a los cursos cuando quieras y desde cualquier
                  dispositivo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <Footer/>
      </div>
    </>
  );
}
