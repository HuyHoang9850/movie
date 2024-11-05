import IconRating from "../assets/rating.png";
import IconRatingHalf from "../assets/rating-half.png";
import ImgTemp from "../assets/temp-1.jpg";
import IconPlay from "../assets/play-button.png";


const Banner = () => {
  return <div className="w-full h-[700px] bg-banner bg-center bg-no-repeat bg-cover relative">
    <div className="absolute w-full top-0 left-0 bg-black opacity-40"/>
    <div className="w-full h-full flex items-center justify-center space-x-[30px] p-4 relative z-20">
      <div className="p-5 flex flex-col space-y-5 items-baseline w-[50%]">
        <p className="text-white bg-gradient-to-r from-red-600 to-red-300 text-md py-2 px-3">TV Show</p>
        <div className="flex flex-col space-y-4"></div>
        <h2 className="text-white text-[40px] font-bold">Queens Of Tears</h2>
        <div className="flex items-centerc space-x-3">
          <img src={IconRating} alt="rating"
          className="w-8 h-8" />
          <img src={IconRating} alt="rating"
          className="w-8 h-8" />
          <img src={IconRating} alt="rating"
          className="w-8 h-8" />
          <img src={IconRating} alt="rating"
          className="w-8 h-8" />
          <img src={IconRatingHalf} alt="rating-half"
          className="w-8 h-8" />
        </div>
        <p className="text-white">Queen of Tears là một bộ phim truyền hình Hàn Quốc trên Netflix kể về cuộc hôn nhân
           sóng gió giữa Hong Hae-in, nữ thừa kế giàu có của tập đoàn Queens Group, và Baek 
           Hyun-woo, con trai trưởng làng từ vùng nông thôn. Khi đối mặt với khủng hoảng hôn
           nhân, họ khám phá lại tình yêu và sự gắn kết của mình. Phim có sự tham gia của Kim
           Soo-hyun và Kim Ji-won, do biên kịch Park Ji-eun (Crash Landing on You) chấp bút
        </p>
        <div className="flex items-center space-x-4">
            <button className="p-3 text-white bg-black font-bold text-sm">Chi tiết</button>
            <button className="p-3 text-white bg-red-500 font-bold text-sm">Xem phim</button>
        </div>
      </div>
      <div className="w-[50%] flex items-center justify-center">
        <div className="w-[300px] h-[400px] relative group cursor-pointer">
          <img
           src={ImgTemp}
           alt="temp"
           className="w-full h-full object-cover"
          />
          <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              <img src={IconPlay} alt="play" className="w-16 h-16" />
          </div>
        </div>
      </div>
    </div>
    </div>;
};

export default Banner;