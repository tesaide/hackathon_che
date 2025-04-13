import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [loginFields, setLoginFields] = useState({});
  function onSubmit() {
    ['email', 'password'].forEach((id) => {
      const input = document.getElementById(id);
      const valueToCheck = input.value.trim();

      if (valueToCheck.length > 0) {
        const hasInvalidChars = /[^\da-zA-Z@.]/.test(valueToCheck);

        if (!hasInvalidChars) {
          setLoginFields((prev) => ({ ...prev, [id]: valueToCheck }));
          input.style.border = ''; // сбрасываем ошибки
          input.placeholder = '';
        } else {
        // custom alert
        }
      } else {
        // custom alert
      }
    });
  }
  const screenHeight = document.getElementById('root').style.minHeight;
  console.log(screenHeight);
  return (
    <div className="h-[1000px] w-full flex justify-center items-start bg-gray-100">
      <div className="p-5 mt-32 h-auto w-1/3 flex flex-col items-center justify-center bg-white shadow-xl border-[1px] border-gray-300 rounded-lg">
        <p className="text-xl text-gray-800">Логін</p>
        <input id="email" maxLength={50} className="mt-5 p-2 bg-transparent  border-b-[1px] border-gray-800  focus:outline-none text-gray-800 text-lg placeholder:text-gray-800" placeholder="Email" />
        <input id="password" type="password" maxLength={50} className="mt-5 p-2 bg-transparent  border-b-[1px] border-gray-800  focus:outline-none text-gray-800 text-lg placeholder:text-gray-800" placeholder="Пароль" />
        <div className="flex flex-row text-sm mt-5">
          <p className="text-gray-500">Ще не зареестровані?</p>
          <Link className="ml-1 text-gray-800" to="/registration">Зерееструватися</Link>
        </div>
        <button onClick={onSubmit} type="submit" className="w-1/3 h-auto mt-8 mb-10 border-[1px] border-gray-800 bg-white rounded-xl text-lg hover:bg-gradient-to-r  from-emerald-400 to-sky-400  hover:text-white transition duration-300">Увійти</button>
      </div>
    </div>
  );
}

export default Login;
