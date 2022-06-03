import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProjectList from "./pages/ProjectList";
// import ProjectCreate from "./pages/ProjectCreate";
// import ProjectEdit from "./pages/ProjectEdit";
// import ProjectShow from "./pages/ProjectShow";
// import Layout from "./components/Layout";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Recipes from "./pages/Recipes";
import AddRecForm from "./pages/AddRecForm";
import RecipeSingle from "./pages/RecipeSingle";

// const RouterWrapper = (props) => {
//   const params = useParams();
//   return <RecipeSingle params={params} {...props} />;
// };

function Main() {
  return (
    // <Router>
    //     <Layout>
    //         <Routes>

    //             <Route exact path="/" element={<ProjectList/>}/>
    //             <Route path="/create" element={<ProjectCreate/>}/>
    //             <Route path="/edit/:id" element={<ProjectEdit/>}/>
    //             <Route path="/show/:id" element={<ProjectShow/>}/>

    //         </Routes>
    //     </Layout>
    // </Router>

    <Router>
      {/* <Layout> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="/api/recipes/find/:id" element={<RecipeSingle />} />
          {/* <Route path="recipes/:recipesingle" element={<RouterWrapper />} /> */}
          <Route path="addrecipe" element={<AddRecForm addBut="Add recipe" />} />
          {/* <Route path="/api/recipes/add" element={<AddRecForm />} /> */}
        </Route>
      </Routes>
      {/* </Layout> */}
    </Router>
  );
}

export default Main;

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <Main />,
  </React.StrictMode>
);
