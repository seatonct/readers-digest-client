import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import Home from "../pages/Home";
import { Authorized } from "./Authorized";
import { AddBook } from "./AddBook";
import { AllBooks } from "./AllBooks";
import { BookDetail } from "./BookDetail";

export const ApplicationViews = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="allbooks">
            <Route index element={<AllBooks />} />
            <Route path=":bookId" element={<BookDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
