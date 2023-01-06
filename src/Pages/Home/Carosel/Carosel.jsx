import React from "react";
import carosel1 from "./../../../assets/images/carosel1.jpg";
import carosel2 from "./../../../assets/images/carosel2.jpg";
import carosel3 from "./../../../assets/images/carosel3.jpg";
const Carosel = () => {
  return (
    <>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img src={carosel1} className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src={carosel2} className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src={carosel3} className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </>
    // <div id="default-carousel" className="relative" data-carousel="static">
    //   {/* Carousel wrapper  */}
    //   <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
    //     {/* <!-- Item 1 --> */}
    //     <div className="hidden duration-700 ease-in-out" data-carousel-item>
    //       <span className="absolute text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:text-3xl dark:text-gray-800">
    //         First Slide
    //       </span>
    //       <img
    //         src="https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/byktqcun7qgywk16_1593770994.jpeg"
    //         className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    //         alt="..."
    //       />
    //     </div>
    //     {/* <!-- Item 2 --> */}
    //     <div className="hidden duration-700 ease-in-out" data-carousel-item>
    //       <img
    //         src="https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/byktqcun7qgywk16_1593770994.jpeg"
    //         className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    //         alt="..."
    //       />
    //     </div>
    //     {/* <!-- Item 3 --> */}
    //     <div className="hidden duration-700 ease-in-out" data-carousel-item>
    //       <img
    //         src="https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/byktqcun7qgywk16_1593770994.jpeg"
    //         className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    //         alt="..."
    //       />
    //     </div>
    //   </div>
    //   {/* <!-- Slider indicators --> */}
    //   <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
    //     <button
    //       type="button"
    //       className="w-3 h-3 rounded-full"
    //       aria-current="false"
    //       aria-label="Slide 1"
    //       data-carousel-slide-to="0"
    //     ></button>
    //     <button
    //       type="button"
    //       className="w-3 h-3 rounded-full"
    //       aria-current="false"
    //       aria-label="Slide 2"
    //       data-carousel-slide-to="1"
    //     ></button>
    //     <button
    //       type="button"
    //       className="w-3 h-3 rounded-full"
    //       aria-current="false"
    //       aria-label="Slide 3"
    //       data-carousel-slide-to="2"
    //     ></button>
    //   </div>
    //   {/* <!-- Slider controls --> */}
    //   <button
    //     type="button"
    //     className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
    //     data-carousel-prev
    //   >
    //     <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
    //       <svg
    //         aria-hidden="true"
    //         className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
    //         fill="none"
    //         stroke="currentColor"
    //         viewBox="0 0 24 24"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           stroke-linecap="round"
    //           stroke-linejoin="round"
    //           stroke-width="2"
    //           d="M15 19l-7-7 7-7"
    //         ></path>
    //       </svg>
    //       <span className="sr-only">Previous</span>
    //     </span>
    //   </button>
    //   <button
    //     type="button"
    //     className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
    //     data-carousel-next
    //   >
    //     <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
    //       <svg
    //         aria-hidden="true"
    //         className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
    //         fill="none"
    //         stroke="currentColor"
    //         viewBox="0 0 24 24"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           stroke-linecap="round"
    //           stroke-linejoin="round"
    //           stroke-width="2"
    //           d="M9 5l7 7-7 7"
    //         ></path>
    //       </svg>
    //       <span className="sr-only">Next</span>
    //     </span>
    //   </button>
    // </div>
  );
};

export default Carosel;
