// src/components/Header.jsx
const Header = () => {
  return (
    <header className="w-full bg-gray-800 p-4 shadow-md fixed top-0 left-64 z-90">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Mi Aplicación</h1>
        {/* Aquí puedes agregar otros elementos */}
      </div>
    </header>
  );
};

export default Header;