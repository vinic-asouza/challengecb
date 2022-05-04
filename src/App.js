import React from 'react'

import Header from './components/Header/';
import Footer from './components/Footer/';
import Showcase from './components/Showcase';
import Banner from './components/Banner';

export default function App() {
  return (
    <>
      <Header />
      <Banner />
      <Showcase name="Mais Vendidos" />
      <Footer />
    </>
  )
}
