import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import LoginUser from "./components/LoginUser";
import RegisterUser from "./components/RegisterUser";
import ListBuku from "./components/ListBuku";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/" element={<UserList />} />
          <Route path="add" element={<AddUser />} />
          <Route path="edit/:id" element={<EditUser />} />
          <Route path="/buku" element={<ListBuku />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;