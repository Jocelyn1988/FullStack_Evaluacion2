import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/nosotros.css';

const pilaresValores = [
  {
    id: 1,
    emoji: "🍎",
    titulo: "Frescura del Campo",
    descripcion: "Cosechamos en el punto óptimo de madurez para asegurar el máximo sabor y nivel de nutrientes."
  },
  {
    id: 2,
    emoji: "🥦",
    titulo: "100% Orgánico & Natural",
    descripcion: "Cultivamos sin químicos ni pesticidas perjudiciales, garantizando un consumo seguro y libre de tóxicos."
  },
  {
    id: 3,
    emoji: "🥛",
    titulo: "Origen Local & Responsable",
    descripcion: "Colaboramos con granjas locales dedicadas a la producción ética, garantizando lácteos y alimentos de excelencia."
  },
  {
    id: 4,
    emoji: "♻️",
    titulo: "Sostenibilidad",
    descripcion: "Procesos y empaques pensados para cuidar el medio ambiente y reducir la huella ecológica."
  }
];

export default function Nosotros() {
  return (
    <>
      <Navbar />

      <main className="container my-5">
        
        {/* Hero Nosotros */}
        <section className="text-center py-4 mb-4">
          <h1 className="display-5 fw-bold mb-3 titulo-nosotros-verde">Sobre Huerto Hogar</h1>
          <p className="lead text-secondary mx-auto subtitulo-nosotros">
            Llevamos la frescura y la calidad del campo directamente a la mesa de tu hogar.
          </p>
        </section>

        {/* Sección Historia */}
        <section className="card shadow-sm border-0 border-start border-success border-4 p-4 p-md-5 mb-5 bg-white rounded-3">
          <h2 className="h3 fw-bold mb-3 titulo-nosotros-verde">Nuestra Historia</h2>
          <p className="text-secondary lh-lg mb-3">
            <strong className="text-dark">Huerto Hogar</strong> nació con el compromiso de promover una alimentación consciente, saludable y sostenible. Nos apasiona conectar a las familias con el origen de sus alimentos, ofreciendo productos cultivados y elaborados de manera responsable.
          </p>
          <p className="text-secondary lh-lg m-0">
            Trabajamos mano a mano con granjas y productores locales para garantizar que cada fruta, verdura, lácteo y producto orgánico conserve su sabor auténtico, su valor nutricional y la frescura que mereces en tu día a día.
          </p>
        </section>

        {/* Sección Misión y Visión */}
        <section className="row g-4 mb-5">
          <div className="col-12 col-md-6">
            <div className="card h-100 shadow-sm border-0 p-4 text-center rounded-3 bg-white tarjeta-nosotros">
              <div className="display-4 mb-3">🌱</div>
              <h3 className="h4 fw-bold mb-3 titulo-nosotros-verde">Nuestra Misión</h3>
              <p className="text-secondary small lh-base m-0">
                Proporcionar alimentos frescos, orgánicos y de alta calidad que aporten bienestar, salud y nutrición a las familias, fomentando un modelo de consumo respetuoso con el medio ambiente y apoyando al desarrollo local.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card h-100 shadow-sm border-0 p-4 text-center rounded-3 bg-white tarjeta-nosotros">
              <div className="display-4 mb-3">🌍</div>
              <h3 className="h4 fw-bold mb-3 titulo-nosotros-verde">Nuestra Visión</h3>
              <p className="text-secondary small lh-base m-0">
                Ser la tienda online referente en alimentación orgánica y responsable, inspirando un estilo de vida saludable en cada hogar y consolidando una red sostenible entre el campo y la ciudad.
              </p>
            </div>
          </div>
        </section>

        {/* Sección Valores / Pilares */}
        <section className="mb-5">
          <h2 className="text-center h3 fw-bold mb-4 titulo-nosotros-verde">Nuestros Pilares</h2>
          
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {pilaresValores.map((valor) => (
              <div className="col" key={valor.id}>
                <div className="card h-100 shadow-sm border-0 p-3 text-center rounded-3 bg-white tarjeta-valor">
                  <span className="display-6 mb-2">{valor.emoji}</span>
                  <h4 className="h6 fw-bold text-success mb-2">{valor.titulo}</h4>
                  <p className="text-secondary small m-0 lh-base">{valor.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}