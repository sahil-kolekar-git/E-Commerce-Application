import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { MdOutlineLightMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "../features/productSlice";
const Navbar = () => {
  let { theme, setTheme } = useContext(ThemeContext);
  let { searchData } = useSelector((state) => state.product);
  let dispatch = useDispatch();
  return (
    <nav className="flex px-4 py-2 w-full justify-between items-center">
      <div className="flex gap-4">
        <div>
          <span className="text-xl font-bold">Ecom-App</span>
        </div>
        <div className="flex gap-2 items-center">
          <Link to={"/"} className="text-[16px] font-medium">
            Home
          </Link>
          <Link to={"/add"} className="text-[16px] font-medium">
            Add Product
          </Link>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="search product"
            className="outline-none text-[13px] bg-gray-200 rounded-[5px] pl-3 flex items-center py-1.5 text-gray-700"
            onChange={(e) => {
              console.log(e.target.value);
              dispatch(setSearchData(e.target.value));
            }}
          />
          <button className="bg-black text-white rounded-[5px] px-2 text-[13px] ">
            Search
          </button>
        </div>
        <button
          onClick={() => {
            setTheme(!theme);
          }}
        >
          {theme ? <MdOutlineLightMode /> : <MdLightMode />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
