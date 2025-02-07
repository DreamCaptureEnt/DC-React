import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
function Admin() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/admin-login");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const [images, setImages] = useState([]);
  const urlRef = useRef();
  const tagRef = useRef();
  const fetchTagRef = useRef();
  function addImage(e) {
    e.preventDefault();
    const url = urlRef.current.value;
    const tag = tagRef.current.value;
    const imageData = {
      url: url,
      tag: tag,
    };
    urlRef.current.value = "";
    tagRef.current.value = "";
    fetch(
      "https://graphtersdesign-c3750-default-rtdb.firebaseio.com/images.json",
      {
        method: "POST",
        body: JSON.stringify(imageData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add image");
        }
        return res.json();
      })
      .then(() => {
        fetchImage(tag);
      })
      .catch((error) => {
        console.error("Error adding image:", error);
      });
  }

  const fetchImage = (tag) => {
    fetchTagRef.current.value = "";
    fetch(
      "https://graphtersdesign-c3750-default-rtdb.firebaseio.com/images.json"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const imageData = [];
        for (let key in data) {
          if (data[key].tag == tag) {
            imageData.push({ ...data[key], id: key });
          }
        }
        setImages(imageData);
      });
  };

  const deleteImage = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (confirm) {
      fetch(
        `https://graphtersdesign-c3750-default-rtdb.firebaseio.com/images/${id}.json`,
        {
          method: "DELETE",
        }
      ).then((res) => {
        console.log(res);
      });
    }
  };

  return (
    <section className="w-full h-screen bg-background grid place-items-center">
      <div className="container w-full flex items-center justify-end">
      <button
        className="bg-gradient-to-r font-sora from-red-500 to-red-600 text-white font-medium py-1 md:py-2 px-2 md:px-4 rounded-md mt-3 transition-all ease-in-out duration-300 shadow-lg shadow-red-500/50 hover:scale-105 hover:from-red-500 hover:to-red-600"
        onClick={handleLogOut}
      >
        Logout
      </button>
      </div>
      <div className="container flex flex-col md:flex-row items-end space-y-10 w-4/5 mt-10">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-4 font-sora">
            Add Image
          </h2>
          <form className="flex flex-col w-full" onSubmit={addImage}>
            <label
              htmlFor="url"
              className="text-sm md:text-lg text-text-light font-poppins mb-2"
            >
              Image URL
            </label>
            <input
              placeholder="Enter Image URL"
              name="url"
              id="url"
              className="font-poppins bg-gray-100 text-text-light border border-text/20 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150"
              type="text"
              required
              ref={urlRef}
            />

            <label
              htmlFor="tag"
              className="text-sm md:text-lg text-text-light font-poppins mb-2"
            >
              Tag
            </label>
            <select
              className="font-poppins bg-background p-2 text-text-light focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150 rounded-md  border border-text/20"
              ref={tagRef}
            >
              <option value="" disabled selected>
                Select a Tag
              </option>
              <option value="Advertisement">Social Media Posts</option>
              <option value="Film Posters">Posters</option>
              <option value="3D Animation">Brochures</option>
              <option value="logo-design">Logo Design</option>
              <option value="film-Film Posters">Film Posters</option>
            </select>
            <button
              className="bg-gradient-to-r font-sora from-primary to-blue-500 text-white font-medium py-2 px-4 rounded-md mt-4  transition-all ease-in-out duration-300 shadow-lg shadow-primary/50 hover:scale-105 hover:from-primary/90 hover:to-blue-500"
              type="submit"
            >
              Add Image
            </button>
          </form>
        </div>
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-4 font-sora">
            Fetch Image
          </h2>
          <form
            className="flex flex-col w-full"
            onSubmit={(e) => {
              e.preventDefault();
              fetchImage(fetchTagRef.current.value);
            }}
          >
            <label
              htmlFor="tag"
              className="text-sm md:text-lg text-text-light font-poppins mb-2"
            >
              Tag
            </label>
            <select
              className="font-poppins bg-background p-2 text-text-light focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-primary transition ease-in-out duration-150 rounded-md  border border-text/20"
              ref={fetchTagRef}
            >
              <option value="" disabled selected>
                Select a Tag
              </option>
              <option value="Advertisement">Social Media Posts</option>
              <option value="Film Posters">Posters</option>
              <option value="3D Animation">Brochures</option>
              <option value="logo-design">Logo Design</option>
              <option value="film-Film Posters">Film Posters</option>
            </select>
            <button
              className="bg-gradient-to-r font-sora from-primary to-blue-500 text-white font-medium py-2 px-4 rounded-md mt-4  transition-all ease-in-out duration-300 shadow-lg shadow-primary/50 hover:scale-105 hover:from-primary/90 hover:to-blue-500"
              type="submit"
            >
              Fetch Images
            </button>
          </form>
        </div>
      </div>
      <div className="container w-full grid grid-cols-2 md:grid-cols-3 gap-5 mt-10 p-5">
        {images.map((image) => (
          <div
            className="h-auto max-w-full aspect-square flex items-center flex-col bg-slate-400 relative"
            key={image.id}
          >
            <img
              src={image.url}
              key={image.id}
              alt={image.tag}
              className="w-full h-full object-cover"
            />
            <button
              className="group absolute top-1 right-2  bg-red-400 hover:bg-background transition-all duration-300 font-poppins text-text p-1 md:p-2 rounded-md"
              onClick={() => deleteImage(image.id)}
            >
              <MdDelete className="text-background group-hover:text-red-400" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Admin;
