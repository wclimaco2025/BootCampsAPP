import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <>
    {/*Footer */}
      <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">
          ¿Listo para comenzar tu aprendizaje?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Únete a miles de estudiantes que están mejorando sus habilidades y
          avanzando en sus carreras.
        </p>
        <Link href="/signup" className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
      >Crear cuenta gratuita</Link>
      </div>
    </section>
    </>
  )
}
