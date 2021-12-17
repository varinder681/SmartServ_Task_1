import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState({});
  const fetchData = async () => {
    const response = await axios.get(
      "https://s3.amazonaws.com/open-to-cors/assignment.json"
    );
    const { count, products } = response.data;
    setProducts(products);
  };
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const arrayProduct = Object.keys(products).map(
    (product) => products[product]
  );
  arrayProduct.sort((a, b) => b.popularity - a.popularity);
  return (
    <div className="container">
      <div className="header">
        <div className="col">
          <p>Product Name</p>
        </div>
        <div className="col">
          <p>Subcategory</p>
        </div>
        <div className="col">
          <p>Popularity</p>
        </div>
        <div className="col col-last">
          <p>Price</p>
        </div>
      </div>
      <div className="header-space"></div>
      <div className="container-data">
        {arrayProduct.map((product) => {
          return (
            <div key={product.title+product.price} className="row">
              <div className="col">
                <p>{product.title}</p>
              </div>
              <div className="col">
                <p>{product.subcategory}</p>
              </div>
              <div className="col">
                <p>{product.popularity}</p>
              </div>
              <div className="col col-last">
                <p>{product.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
