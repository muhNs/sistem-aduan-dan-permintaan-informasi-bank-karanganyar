import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/routers";

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "formulir" | "keberatan"
  >("home");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* NAVBAR */}
      <Navbar />

      {/* ROUTING */}
      <AppRoutes currentPage={currentPage} onChangePage={setCurrentPage} />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
