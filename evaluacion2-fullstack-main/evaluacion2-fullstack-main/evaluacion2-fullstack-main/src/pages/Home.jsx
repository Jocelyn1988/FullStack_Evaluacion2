import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/home.css';

const productos = [
  {
    id: 1,
    nombre: "Manzanas Fuji",
    descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o postres.",
    precio: "$1.200 CLP / kg",
    imagen: "/imagenes/Manzanas Fuji.jpg"
  },
  {
    id: 2,
    nombre: "Naranjas Valencia",
    descripcion: "Jugosas y ricas en vitamina C, ideales para zumos frescos y refrescantes.",
    precio: "$1.000 CLP / kg",
    imagen: "/imagenes/Naranjas Valencia.jpg"
  },
  {
    id: 3,
    nombre: "Plátanos Cavendish",
    descripcion: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético rico en potasio.",
    precio: "$800 CLP / kg",
    imagen: "/imagenes/Platanos.jpg"
  },
  {
    id: 4,
    nombre: "Zanahorias Orgánicas",
    descripcion: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A.",
    precio: "$900 CLP / kg",
    imagen: "/imagenes/Zanahoria.jpg"
  },
  {
    id: 5,
    nombre: "Espinacas",
    descripcion: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes.",
    precio: "$700 CLP / kg",
    imagen: "/imagenes/Espinacas.jpg"
  },
  {
    id: 6,
    nombre: "Pimentones Tricolores",
    descripcion: "Pimientos rojos, amarillos y verdes, ideales para salteados. Ricos en antioxidantes.",
    precio: "$1.500 CLP / kg",
    imagen: "/imagenes/Pimientos.jpg"
  },
  {
    id: 7,
    nombre: "Miel Orgánica",
    descripcion: "Miel pura y orgánica producida por apicultores locales. Perfecta para endulzar de manera natural.",
    precio: "$5.000 CLP / kg",
    imagen: "/imagenes/miel.jpg"
  },
  {
    id: 8,
    nombre: "Quinoa Orgánica",
    descripcion: "Quinoa premium 100% natural, libre de gluten y excelente fuente de proteína vegetal.",
    precio: "$3.200 CLP / kg",
    imagen: "/imagenes/Quinua.jpg"
  },
  {
    id: 9,
    nombre: "Leche Fresca",
    descripcion: "Lácteo pasteurizado que conserva intacto su auténtico sabor a campo, vitaminas y calcio.",
    precio: "$1.200 CLP / litro",
    imagen: "/imagenes/Leche.jpg"
  }
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="container my-4">
        {/* Hero Banner */}
        <section className="card border-0 shadow-sm p-4 p-md-5 mb-5 bg-white rounded-3">
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-6">
              <h1 className="display-6 fw-bold mb-3 titulo-hero">TIENDA ONLINE</h1>
              <p className="lead fs-6 text-muted mb-4">
                Nuestra tienda ofrece los mejores productos orgánicos y frescos directamente para tu hogar. ¡Descubre nuestras ofertas especiales descargando nuestro catálogo o visitando la tienda ahora mismo!
              </p>
              <a href="/productos" className="btn btn-success px-4 py-2 fw-semibold">
                📥 Ver productos
              </a>
            </div>
            <div className="col-12 col-md-6 text-center">
              <img src="/imagenes/logo.jpg" alt="Logo Huerto Hogar" className="img-fluid rounded-3 hero-img" />
            </div>
          </div>
        </section>

        {/* Sección Institucional */}
        <section className="card border-0 shadow-sm p-4 mb-5 bg-white rounded-3">
          <div className="mb-4">
            <h2 className="h4 titulo-seccion">Enunciado</h2>
            <p className="text-muted m-0">
              HuertoHogar es una tienda online dedicada a llevar la frescura y calidad de los productos del campo directamente a la puerta de nuestros clientes en Chile. Con más de 6 años de experiencia, operamos en más de 9 puntos a lo largo del país, incluyendo ciudades clave como Santiago, Puerto Montt, Villarrica, Nacimiento, Viña del Mar, Valparaíso y Concepción. Nuestra misión es conectar a las familias chilenas con el campo, promoviendo un estilo de vida saludable y sostenible.
            </p>
          </div>

          <div className="mb-4">
            <h2 className="h4 titulo-seccion">Misión</h2>
            <p className="text-muted m-0">
              Nuestra misión es proporcionar productos frescos y de calidad directamente desde el campo hasta la puerta de nuestros clientes, garantizando la frescura y el sabor en cada entrega. Nos comprometemos a fomentar una conexión más cercana entre los consumidores y los agricultores locales, apoyando prácticas agrícolas sostenibles y promoviendo una alimentación saludable en todos los hogares chilenos.
            </p>
          </div>

          <div>
            <h2 className="h4 titulo-seccion">Visión</h2>
            <p className="text-muted m-0">
              Nuestra visión es ser la tienda online líder en la distribución de productos frescos y naturales en Chile, reconocida por nuestra calidad excepcional, servicio al cliente y compromiso con la sostenibilidad. Aspiramos a expandir nuestra presencia a nivel nacional e internacional, estableciendo un nuevo estándar en la distribución de productos agrícolas directos del productor al consumidor.
            </p>
          </div>
        </section>

        {/* Grilla de Productos */}
        <section className="row g-4 mb-5">
          {productos.map((prod) => (
            <div key={prod.id} className="col-12 col-md-6 col-lg-4">
              <article className="card h-100 shadow-sm border-0 tarjeta-producto">
                <a href="/detalle_producto">
                  <img 
                    src={prod.imagen} 
                    alt={prod.nombre} 
                    className="card-img-top img-producto-card" 
                  />
                </a>
                <div className="card-body d-flex flex-column">
                  <a href="/detalle_producto" className="text-decoration-none">
                    <h5 className="card-title text-center titulo-producto">{prod.nombre}</h5>
                  </a>
                  <p className="card-text small text-muted flex-grow-1">{prod.descripcion}</p>
                  <div className="mt-3 text-end">
                    <span className="fw-bold text-success fs-5">{prod.precio}</span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}