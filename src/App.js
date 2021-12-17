import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { LinearProgress } from '@mui/material'
import { withStyles } from '@mui/styles'

const App = () => {
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(false)
  const [products, setProducts] = useState({});
  const fetchData = async () => {
    const response = await axios.get(
      "https://s3.amazonaws.com/open-to-cors/assignment.json"
    );
    const { count, products } = response.data;
    setProducts(products);
    setLoading(false);
    setError(false)
  };
  useEffect(() => {
    setLoading(true)
    setError(false)
    try {
      fetchData();
    } catch (error) {
      console.log(error);
      setLoading(true)
    }
  }, []);
  const arrayProduct = Object.keys(products).map(
    (product) => products[product]
  );
  arrayProduct.sort((a, b) => b.popularity - a.popularity);


  const ColorLinearProgress = withStyles({
    colorPrimary: {
      backgroundColor: '#b2dfdb',
    },
    barColorPrimary: {
      backgroundColor: '#00695c',
    },
  })(LinearProgress);

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
            {loading && <div className="spinner">
              <ColorLinearProgress />
            </div>}
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
                      <p>{`₹ ${product.price}`}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
  );
};

export default App;
