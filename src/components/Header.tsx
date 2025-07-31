// import { useState } from "react";
import GetIDButton from "./GetIDButton";

const Header = () => {
  // const [isDateDropdownOpen, setDateDropdownOpen] = useState(false);
  // const [selectedDate, setSelectedDate] = useState("29 JUL 2025");

  // const dates = [
  //   "29 JUL 2025",
  //   "28 JUL 2025",
  //   "27 JUL 2025",
  //   "26 JUL 2025",
  //   "25 JUL 2025",
  // ];

  return (
    <header className="w-full text-center flex justify-between items-center mb-4">
      <div className="w-[50%] md:w-auto">
        <h1 className="typography_h1">Union Dashboard Stats</h1>
        <p className="typography_subtitle">Updated at: 29 JUL 2025</p>
      </div>

      <div>
        <GetIDButton />
      </div>
    </header>
  );
};

export default Header;
