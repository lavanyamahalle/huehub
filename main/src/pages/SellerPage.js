import { useNavigate } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import SellerProducts from "../components/SellerProducts";
import Spinner from "../components/Spinner";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import toast from "react-hot-toast";
import AddProductPage from "../components/AddProductPage";
import { motion } from "framer-motion";
const SellerPage = (props) => {
  const user1 = props.user;
  console.log("in seller user", user1);

  const navigate = useNavigate();
  const [showAddPage, setShowAddPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  async function fetchProductData() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://huehub-vyrf-git-main-soham-lates-projects.vercel.app/api/v1/product/getsellerproduct",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log("in seller main", res);
      setPosts(res.data.pass.selectedProduct.products);
    } catch (error) {
      console.log("error in gallary");
      toast.error(error.response.data.message);
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  function addhandler() {
    setShowAddPage(!showAddPage);
  }

  return (
    <div className="flex-row justify-center h-screen overflow-y-auto bg-gradient-to-br pt-[3rem] from-sky-200 to-white">
      <div className="flex flex-row rounded-3xl border-2 justify-center mx-[25%]  py-[0.5rem] boder-2 border-black">
        <input
          className="w-[90%] py-[0.3rem] bg-inherit border-none focus:border-none focus:outline-none"
          type="text"
          placeholder="Explore your passion: Search for your favorite art style or artist here..."
          // value=""
        ></input>
        <div className="pt-2 text-xl">
          <CiSearch />
        </div>
      </div>
      <h1 className="font-bold text-xl ml-[34%] my-[2rem]">
        Welcome {user1.firstname} to huehub please add more new art{" "}
      </h1>

      <div>
        <button
          onClick={addhandler}
          className="ml-[43%] mb-[2rem] text-2xl px-[2rem] py-[0.4rem] text-white bg-blue-600 border-1 rounded-md mt-[2rem] h-[3rem] w-[13rem] block hover:bg-blue-500"
        >
          Add-Product
        </button>

        <h4 className="font-bold text-xl ml-[45%] mb-[2rem] mt-[1rem]">
          Your Product List
        </h4>
      </div>

      <div className="">
        {loading ? (
          <Spinner />
        ) : posts ? (
          <div className="flex flex-row justify-center item-center px-[15rem]  w-full h-[100vh] flex-wrap gap-x-5 gap-y-9">
            {posts.map((item) => (
              <SellerProducts key={item.id} item={item}></SellerProducts>
            ))}
          </div>
        ) : (
          <div>
            <p>No Product found</p>
          </div>
        )}
      </div>
      <motion.div
        initial={{ y: -100, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute top-0 left-[27%] z-30"
      >
        {showAddPage && (
          <AddProductPage
            setShowAddPage={setShowAddPage}
            showAddPage={showAddPage}
          />
        )}
      </motion.div>
    </div>
  );
};

export default SellerPage;
