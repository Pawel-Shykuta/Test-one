import React, { useEffect, useState } from "react";
import "./Accounting.css";

const Accounting = () => {
  const [towars, setTowars] = useState(() => {
    const item = localStorage.getItem("towars");
    return item ? JSON.parse(item) : [];
  });

  useEffect(() => {
    localStorage.setItem("towars", JSON.stringify(towars));
  }, [towars]);

  const [item, setItem] = useState({ name: "", price: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const add = () => {
    if (item.name && item.price) {
      setTowars([...towars, item]);
      setItem({ name: "", price: "" });
    }
  };

  return (
    <div className="accounting-container">
      <h1>Список товаров</h1>

      {towars.length > 0 ? (
        <div className="towars-list">
          {towars.map((towar, index) => (
            <div key={index} className="towar-item">
              <h3>{towar.name}</h3>
              <h3>{towar.price}</h3>
            </div>
          ))}
        </div>
      ) : (
        <h2>Пока нет товаров!</h2>
      )}

      <div className="add-towar-form">
        <h3>Добавить товар</h3>
        <input
          type="text"
          name="name"
          placeholder="Введите название товара"
          value={item.name}
          onChange={change}
        />
        <input
          type="number"
          name="price"
          placeholder="Введите цену товара"
          value={item.price}
          onChange={change}
        />
        <button onClick={add}>Add</button>
      </div>
    </div>
  );
};

export default Accounting;
