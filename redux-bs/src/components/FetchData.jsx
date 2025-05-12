import React, { useEffect, useState } from "react";

const FetchData = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  const deleteHandler = (id) => {
    setProducts((prevState) => prevState.filter((prev) => prev.id !== id));
  };
  return (
    <div>
      {products.length === 0 ? (
        <p>no data found</p>
      ) : (
        products?.map((item) => (
          <div key={item.id}>
            <img src={item.thumbnail} alt="img" />
            <p>{item.brand}</p>
            <p>{item.title}</p>
            <p>${item.price}</p>
            <p>{item.description}</p>
            <button onClick={() => deleteHandler(item.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default FetchData;
