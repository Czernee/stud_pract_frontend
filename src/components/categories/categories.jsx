import React from "react";
import Button from '../Button/Button.jsx'

const allCategories = ['Все', 'Телефоны', 'Наушники', 'Колонки']

export const Categories = ({ activeCategory, setActiveCategory, }) => {
  return (
    <div className="btn-container">
      {allCategories.map((category, index) => {
        return (
          <Button
            key={index}
            className={`filter-btn ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        );
      })}
    </div>
  );
};