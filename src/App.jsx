import React from 'react';
import { Outlet } from 'react-router-dom'; // <--- استيراد Outlet
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar'; 

function App() {
  return (
    <div className="flex flex-col min-h-screen" dir="rtl"> 
      <Header /> 

      <div className="flex flex-grow"> 
        <Sidebar /> 

        <main className="flex-grow mr-64 p-4"> 
          <Outlet /> {/* <--- هذا هو المكان الذي سيتم فيه عرض صفحاتك */}
        </main>
      </div>

      <Footer /> 
    </div>
  );
}

export default App;