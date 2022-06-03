import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import AddRecForm from "./AddRecForm";

const RecipeCard = ({ name, desc, image, data, country, add, likes }) => {
  const [updatePopup, setUpdatePopup] = useState(false);
  // console.log(data);
  // console.log(typeof likes, likes);

  const addLikesHandler = () => {
    likes = data.likes++;
    // console.log("add likes was clicked for:", data.id, "likes now:", data.likes);
    // console.log(`/api/recipes/edit/${data.id}`);
    axios.patch(`/api/recipes/edit/${data.id}`, { likes: likes });
    // window.location.reload();
  };
  const deleteHandler = () => {
    // axios.delete(`/api/recipes/remove/${data.id}`);
    // window.location.reload();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, please delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/recipes/remove/${data.id}`)
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Project deleted succesfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            window.location.reload();
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "An error occurred",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };
  const editHandler = () => {
    setUpdatePopup(true);
    // axios.patch(`/api/recipes/remove/${data.id}`);
    // window.location.reload();
  };

  return (
    <>
      {" "}
      {updatePopup && <AddRecForm extClass="extClass" addBut="save changes" />}
      <div className="card">
        <h2>{name}</h2>
        <p>{desc}</p>
        <img src={image} alt={name} />

        <img className="flag" src={country.flags.png} alt={country.name.common} />

        <span onClick={() => deleteHandler(data.id)} className="material-icons delBut">
          cancel
        </span>
        <span onClick={() => addLikesHandler(data.id)} className="material-icons likeBut">
          favorite
        </span>
        <span className="likes">{likes}</span>
        <span onClick={() => editHandler(data.id)} className="material-icons editBut">
          edit_note
        </span>

        {/* {updatePopup && <AddRecForm extClass="extClass" />} */}

        <div>
          <Link to={`/api/recipes/find/${data.id}`} state={{ data: data, country: country }}>
            See more
          </Link>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
