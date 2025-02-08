
import Banner from "../../../assets/bike/electrical/bannerbike.jpg";



const BannerImg = {
    backgroundImage: `url(${Banner})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "250px",
    width: "100%",
   
  };
const Subscribe = () => {
  return (
    <div
    data-aos="zoom-in"
    className=" opacity-45"
    style={BannerImg}
  >
    <div className="container   py-15">
      <div className="space-y-6 pt-10 max-w-xl mx-auto">
        <h1 className="text-2xl text-gray-100 !text-center sm:text-left sm:text-4xl font-semibold">
          Get Notified About Our Update Version Bike !
        </h1>
        <input
          data-aos="fade-up"
          type="text"
          placeholder="Enter your email"
          className="w-full p-3 text-gray-900 bg-gray-100 "
        />
      </div>
    </div>
  </div>
  )
}

export default Subscribe