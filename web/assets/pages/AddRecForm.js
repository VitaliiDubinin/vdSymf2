import React, { useEffect, useState } from "react";
import axios from "axios";

// const AddRecForm = (props) => {
const AddRecForm = ({ extClass, addBut }) => {
  //   return <div>Message from Add Rec Form</div>;
  // console.log("extClass: ", extClass);
  // console.log(`inputForm`, extClass);
  console.log(extClass, addBut);
  const [data, setData] = useState({
    name: "",
    image: "",
    author: "",
    description: "",
    // countrycode: "",
    country2: "",
    ingreds: [],
    instruction: "",
    likes: 0,
  });

  const [ingredients, setIngredients] = useState([{ id: 1, ingredN: "", ingredQ: "" }]);

  // countries state is for saving data from restcountries API
  const [countries, setCountries] = useState([]);

  // Getting data for all 250 countries
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      // setCountries(res.data);
      setCountries(
        // countries.sort(function (a, b) {
        res.data.sort(function (a, b) {
          const contA = a.name.common.toUpperCase();
          const contB = b.name.common.toUpperCase();
          if (contA < contB) {
            return -1;
          }
          if (contA > contB) {
            return 1;
          }

          return 0;
        })
      );
    });
  }, []);

  // This event handler is reacting to our select event handler. We get the value from select, and then we find the correct alpha2Code. After that, we save valid code to the Data state.
  const changeCountry = (e) => {
    console.log(countries, e.target.value);
    const correctCountry = countries.find((c) => c.cca2 === e.target.value);

    setData({ ...data, country2: correctCountry.cca2 });
    // console.log(correctCountry);
  };

  // basic onChange event for regular inputs
  const changeData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Bit more complicated event handler for getting data from ingredients. First, we spread the current ingredients state and then look for that specific object in the array. We use the index, which is passed to the event handler. After updating the value in inputs, we will overwrite the Data state and add the ingredients array.
  const changeIncData = (e, i) => {
    const { name, value } = e.target;
    const incList = [...ingredients];
    incList[i][name] = value;
    setIngredients(incList);
    setData({ ...data, ingreds: ingredients });
  };

  const addMore = (e) => {
    e.preventDefault();
    const newInc = { id: ingredients.length + 1, ingredN: "", ingredQ: "" };
    setIngredients([...ingredients, newInc]);
  };

  // After we have all data collected from inputs, we post the Data object from state.
  const submitData = (event) => {
    // setData({
    //   id: null,
    //   name: "Juice",
    //   country2: "NZ",
    //   image:
    //     "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shrimp-stir-fry-vertical-1546459701.png?crop=1.00xw:0.667xh;0,0.0409xh&resize=768:*",
    //   author: "MeOn",
    //   likes: 12,
    //   description: "make it",
    //   ingreds: [],
    //   instruction: "eat it",
    // });
    event.preventDefault();
    // console.log(data);
    // console.log("save pressed");

    // axios.post("http://localhost:3010/recipes", data);

    axios.post(`/api/recipes/add`, data).then(() => window.location.reload());
    // .catch((error) => console.log(error))
    // .then((response) => console.log(response.data))
    // .catch((error) => console.log(error));

    // window.location.reload();

    // axios.post('/api/recipes/add', data).then(function (response) {
    //   console.log(response.data);
    //   setData({
    //   name: "",
    //   photo: "",
    //   instruction: "",
    //   description: "",
    //   });
  };

  return (
    // Please note that you have to declare each input handler separately because we have three different kinds of input handlers. Otherwise, the latest handler will overwrite the previous ones.
    // <form className="inputForm" onSubmit={console.log(data)}>

    <>
      {/* {{ extClass }} */}
      <form className={`inputForm ${extClass}`} onSubmit={submitData}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" onChange={changeData} />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input type="text" name="author" id="author" onChange={changeData} />
        </div>
        <div>
          <label htmlFor="desc">Description</label>
          <textarea type="text" name="description" id="desc" onChange={changeData} />
        </div>
        <div>
          <label htmlFor="countryCode">Recipe is from:</label>
          <select name="country2" id="countryCode" onChange={changeCountry}>
            <option value="FI"> please select</option>

            {countries.map((c) => (
              <option key={c.cca2} value={c.cca2}>
                {c.name.common}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="image">Image url</label>
          <input type="url" name="image" id="image" onChange={changeData} />
        </div>
        <p>Ingredients:</p>
        {ingredients.map((_, i) => {
          return (
            <div key={i}>
              <div>
                <label htmlFor="quantity">Quantity</label>
                <input type="text" name="ingredQ" id="quantity" className="feedback-input" onChange={(e) => changeIncData(e, i)} />
              </div>
              <div>
                <label htmlFor="incName">Ingredient</label>
                <input type="text" name="ingredN" id="incName" className="feedback-input" onChange={(e) => changeIncData(e, i)} />
              </div>
            </div>
          );
        })}
        <button className="adingbut" onClick={addMore}>
          Add more ingredients
        </button>
        <div>
          <label htmlFor="instruct">Instructions</label>
          <textarea type="text" name="instruction" id="instruct" className="feedback-input" onChange={changeData} />
        </div>
        {/* <input className="adrepbut" type="submit" value="Add recipe" /> */}
        <input className="adrepbut" type="submit" value={addBut} />
      </form>
    </>
  );
};

export default AddRecForm;
