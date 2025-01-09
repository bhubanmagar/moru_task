import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import ViewPage from "../pages/ViewPage";
import EditPage from "../pages/EditPage";
import AddPostPage from "../pages/addPostPage";

const MyRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/add-post" element={<AddPostPage />}></Route>
        <Route path="/view-post/:id" element={<ViewPage />}></Route>
        <Route path="/edit-post/:id" element={<EditPage />}></Route>
      </Routes>
    </>
  );
};

export default MyRoutes;
