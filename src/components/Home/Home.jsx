import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import NavBar from "../NavBar/NavBar";
import styles from "../Home/Home.module.css";

import Aboutus from "../../assets/abouUs-18.png";

import arrow from "../../assets/flecha-16.png";
import arrowExit from "../../assets/flecha-17.png";

import logo from "../../assets/Untitled-1-10.png";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        const lastSixProducts = data.slice(-6);
        setProducts(lastSixProducts);
        setFilteredProducts(lastSixProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filter) => {
    let sortedProducts = [...products];
    switch (filter) {
      case "name-asc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "stock-asc":
        sortedProducts.sort((a, b) => a.stock - b.stock);
        break;
      case "stock-desc":
        sortedProducts.sort((a, b) => b.stock - a.stock);
        break;
      case "price-asc":
        sortedProducts.sort(
          (a, b) =>
            parseFloat(a.price.substring(1)) - parseFloat(b.price.substring(1))
        );
        break;
      case "price-desc":
        sortedProducts.sort(
          (a, b) =>
            parseFloat(b.price.substring(1)) - parseFloat(a.price.substring(1))
        );
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredProducts(products);
      return;
    }

    const searchResults = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(searchResults);
  };

  const handleClear = () => {
    setFilteredProducts(products);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <img src={logo} className={styles.logo} />
      <div className={styles.menuContainer}>
        <div className={styles.menuContainerIzq}>
          <Link to="/form" className={styles.links}>
            <button className={styles.menuButton}>
              CREATE <img src={arrow} alt="" className={styles.arrow} />
            </button>
          </Link>
          <Link to="/aboutus" className={styles.links}>
            <button className={styles.menuButton}>
              {" "}
              ABOUT US <img src={Aboutus} alt="" className={styles.arrow} />
            </button>
          </Link>
        </div>

        <Link to="/" className={styles.links}>
          <button className={styles.menuButton}>
            EXIT <img src={arrowExit} alt="" className={styles.arrow} />
          </button>
        </Link>
      </div>

      <NavBar
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onClear={handleClear}
      />
      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            images={product.images}
            price={product.price}
            stock={product.stock}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
