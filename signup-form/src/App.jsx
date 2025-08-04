import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupForm from './Component/SignUp/Signup';
import LogIn from './Component/SignIn/LogIn';
import HomePages from './Pages/HomePages';
import PrivateRoute from './Component/SignUp/PrivateRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/homepages"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <HomePages />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
