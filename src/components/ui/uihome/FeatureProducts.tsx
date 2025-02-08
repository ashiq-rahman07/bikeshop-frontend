import Img1 from "../../../assets/bike/electrical/MXV-e1708594139730.png"
import Img2 from "../../../assets/bike/road/Gallery_1920x1080_2-WEB.jpg";
import Img3 from "../../../assets/bike/hybrid/new-ultraviolette-4.jpeg";
import { FaStar } from "react-icons/fa";
const ProductsData = [
    {
      id: 1,
      img: Img1,
      title: "Casual Wear",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      img: Img2,
      title: "Printed shirt",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      img: Img3,
      title: "Women shirt",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 4,
      img: Img1,
      title: "Casual Wear",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 5,
      img: Img2,
      title: "Printed shirt",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 6,
      img: Img3,
      title: "Women shirt",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];
const FeatureProducts = () => {
  return (
    <div className="" >
    <div className="container  pt-10">
      {/* Header section */}
      <div className="mb-6 text-center">
        <p data-aos="fade-up" className="text-sm text-primary">
          Top Rated Products for you
        </p>
        <h1 data-aos="fade-up" className="text-3xl font-bold">
          Best Products
        </h1>
        <p data-aos="fade-up" className="text-xs text-gray-400">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
          asperiores modi Sit asperiores modi
        </p>
      </div>
      {/* Body section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  md:gap-10 place-items-center">
        {ProductsData.map((data) => (
         
         
            <div data-aos="zoom-in" className="rounded-2xl bg-gray-100  dark:bg-gray-500 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 mb-20 group   m-10 flex w-full max-w-xs flex-col overflow-hidden  border border-gray-100  ">
    <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
      <img
        className="object-cover"
        src={data.img}
        alt="product image"
      />
      <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
        39% OFF
      </span>
    </a>
    <div className="mt-4 px-5 pb-5">
      <a href="#">
        <h5 className="text-xl tracking-tight">{data.title}</h5>
      </a>
      <div className="mt-2 mb-5 flex items-center justify-between">
        <p>
          <span className="text-3xl font-bold">$449</span>
          <span className="text-sm line-through">$699</span>
        </p>
        <div className="flex items-center">
         <FaStar className="text-yellow-300"/>
         <FaStar  className="text-yellow-300"/>
         <FaStar  className="text-yellow-300"/>
          <span className="mr-2 ml-3 rounded bg-yellow-200 text-gray-500 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
        </div>
      </div>
      <a
        href="#"
        className="flex items-center justify-center rounded-md bg-primary/40 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Add to cart
      </a>
    </div>
            </div>
         
        ))}
      </div>
    </div>
  </div>
  )
}

export default FeatureProducts