import React from 'react';
import ProductList from './ProductList';
import BottomHeader from './BottomHeader';

const headphones = [
    { id: 1, img: "/images/airpods_w.png", title: "Apple S852I", price: 2927, oldPrice: 3527, rate: 4.7 },
    { id: 2, img: "/images/EarPods.png", title: "Apple EarPods", price: 2327, oldPrice: 0, rate: 4.5 },
    { id: 3, img: "/images/earpods_box.png", title: "Apple EarPods", price: 2327, oldPrice: 0, rate: 4.5 },
    { id: 4, img: "/images/airpods_w.png", title: "Apple S852I", price: 2927, oldPrice: 3527, rate: 4.7 },
    { id: 5, img: "/images/EarPods.png", title: "Apple EarPods", price: 2327, oldPrice: 0, rate: 4.5 },
    { id: 6, img: "/images/earpods_box.png", title: "Apple EarPods", price: 2327, oldPrice: 0, rate: 4.5 },
    { id: 7, img: "/images/airpods_w.png", title: "Apple BYZ S852I", price: 2927, oldPrice: 3527, rate: 4.7 },
    { id: 8, img: "/images/EarPods.png", title: "Apple EarPods", price: 2327, oldPrice: 0, rate: 4.5 },
    { id: 9, img: "/images/earpods_box.png", title: "Apple EarPods", price: 2327, oldPrice: 0, rate: 4.5 },
    { id: 10, img: "/images/airpods_w.png", title: "Apple BYZ S852I", price: 2927, oldPrice: 3527, rate: 4.7 },
    { id: 11, img: "/images/EarPods.png", title: "Apple EarPods", price: 2327, oldPrice: 0, rate: 4.5 },
    { id: 12, img: "/images/earpods_box.png", title: "Apple EarPods", price: 2327, oldPrice: 0, rate: 4.5 },
];

const wirelessHeadphones = [
    { id: 13, img: "/images/AppleAir.png", title: "Apple AirPods", price: 9527, oldPrice: 11000, rate: 4.7 },
    { id: 14, img: "/images/ApplePro.png", title: "GERLAX GH-04", price: 6527, oldPrice: 0, rate: 5.0 },
    { id: 15, img: "/images/Bor.png", title: "BOROFONE BO4", price: 7527, oldPrice: 0, rate: 4.8 },
    { id: 16, img: "/images/AppleAir.png", title: "Apple AirPods", price: 9527, oldPrice: 11000, rate: 4.7 },
    { id: 17, img: "/images/ApplePro.png", title: "GERLAX GH-04", price: 6527, oldPrice: 0, rate: 5.0 },
    { id: 18, img: "/images/Bor.png", title: "BOROFONE BO4", price: 7527, oldPrice: 0, rate: 4.8 },
  
];

const Main: React.FC = () => {
  return (
    <div className="main-page">
      <div className="category">
        <h2>Наушники</h2>
        <ProductList products={headphones} />
      </div>
      <div className="category">
        <h2>Беспроводные наушники</h2>
        <ProductList products={wirelessHeadphones} />
      </div>
      <BottomHeader />
    </div>
  );
};

export default Main;
