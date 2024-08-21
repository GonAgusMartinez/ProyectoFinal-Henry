// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { productsDetails } from "../../store/slice/productSlice";
// import style from "./Details.module.css";
// import arrowExit from "../../assets/flecha-17.png";
// import { useCart } from "../../hooks/useCart";
// import carrito from "../../assets/CART-32.png";


// const Details = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const product = useSelector((state) => state.products.productsDetails);
//   const productStatus = useSelector((state) => state.products.productsStatus);
//   const productError = useSelector((state) => state.products.productsError);
//   const { addToCart } = useCart();

//   const [selectedSize, setSelectedSize] = useState("");
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     dispatch(productsDetails(id));
//   }, [id, dispatch]);

//   if (productStatus === "loading") {
//     return <p>Loading...</p>;
//   }

//   if (productStatus === "failed") {
//     const errorMessage =
//       typeof productError === "object"
//         ? productError?.message || "Unknown error occurred"
//         : productError;

//     return <p>Error: {errorMessage}</p>;
//   }

//   const handleAddToCart = async () => {
//     if (selectedSize) {
//       try {
//         // Verifica que haya suficiente stock disponible
//         if (product.stock[selectedSize] < quantity) {
//           alert("Not enough stock available.");
//           return;
//         }

//         addToCart({ ...product, selectedSize, quantity });

//         // const updatedStock = {
//         //   ...product.stock,
//         //   [selectedSize]: product.stock[selectedSize] - quantity
//         // };

//         // await axios.put(
//         //   `https://pf-henry-backend-ts0n.onrender.com/admin/edit/${product.id}`,
//         //   { stock: updatedStock }
//         // );

//         alert("Product added to cart and stock updated");
//       } catch (error) {
//         console.error(
//           "Error updating stock:",
//           error.response?.data || error.message
//         );
//         alert(
//           "There was a problem updating the stock. Check the console for details."
//         );
//       }
//     } else {
//       alert("Please select a size.");
//     }
//   };

//   return (
//     <div>
//       {product && (
//         <div className={style.container}>
//           <div>
//             <img
//               src={product?.images?.[0]}
//               alt={product?.name}
//               className={style.imgDetail}
//             />
//           </div>
//           <div className={style.containerRDetail}>
//             <h1 className={style.h1Detail}>{product.name}</h1>
//             <p className={style.pDetail}>
//               {" "}
//               Price:<strong> ${product.price}</strong>
//             </p>
//             <hr className={style.hrDetail}></hr>
//             <p className={style.pDetail}>
//               Color: <strong>{product.color}</strong>
//             </p>
//             <div className={style.sizeContainer}>
//               <p className={style.pDetail}>Sizes and Stock: </p>
//               <div className={style.pDetailContainer}>
//                 {Object.entries(product.stock || {}).length > 0 ? (
//                   Object.entries(product.stock).map(([size, stock]) => (
//                     <div key={size}>
//                       <label>
//                         <input
//                           type="radio"
//                           name="size"
//                           value={size}
//                           checked={selectedSize === size}
//                           onChange={() => setSelectedSize(size)}
//                           disabled={stock === 0}
//                         />
//                         <strong>{size}: </strong>
//                         {stock}
//                       </label>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No stock available</p>
//                 )}
//               </div>
//             </div>
//             <hr className={style.hrDetail}></hr>
//             <p className={style.pDetail}>
//               Brand : <strong>{product.brand} </strong>
//             </p>
//             <p className={style.pDetail}>
//               Gender : <strong> {product.gender}</strong>
//             </p>
//             <p className={style.pDetail}>
//               Category : <strong>{product.category} </strong>
//             </p>
//             <hr className={style.hrDetail}></hr>
//             <p className={style.pDetailDescrip}>{product.description}</p>
//             <button
//               onClick={() => {
//                 handleAddToCart(product);
//               }}
//               className={style.containerCarr}
//             >
//               <img src={carrito} className={style.carrito} />
//             </button>
//             <Link to="/home" className={style.links}>
//               <button className={style.menuButton}>
//                 GO TO HOME{" "}
//                 <img src={arrowExit} alt="" className={style.arrow} />
//               </button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Details;

// // const Details = () => {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();
// //   const product = useSelector((state) => state.products.productsDetails);
// //   const productStatus = useSelector((state) => state.products.productsStatus);
// //   const productError = useSelector((state) => state.products.productsError);
// //   const { addToCart } = useCart();

// //   const [selectedSize, setSelectedSize] = useState("");
// //   const [quantity, setQuantity] = useState(1);

// //   useEffect(() => {
// //     dispatch(productsDetails(id));
// //   }, [id, dispatch]);

// //   if (productStatus === "loading") {
// //     return <p>Loading...</p>;
// //   }

// //   if (productStatus === "failed") {
// //     const errorMessage =
// //       typeof productError === "object"
// //         ? productError?.message || "Unknown error occurred"
// //         : productError;

// //     return <p>Error: {errorMessage}</p>;
// //   }

// //   const handleAddToCart = async () => {
// //     if (selectedSize && product && product.stock) {
// //       try {
// //         if (product.stock[selectedSize] < quantity) {
// //           alert("Not enough stock available.");
// //           return;
// //         }

// //         addToCart({ ...product, selectedSize, quantity });

// //         alert("Product added to cart and stock updated");
// //       } catch (error) {
// //         console.error(
// //           "Error updating stock:",
// //           error.response?.data || error.message
// //         );
// //         alert(
// //           "There was a problem updating the stock. Check the console for details."
// //         );
// //       }
// //     } else {
// //       alert("Please select a size.");
// //     }
// //   };

// //   const handleQuantityChange = (e) => {  //Cantidad que quiero agregar al carrito
// //     const value = parseInt(e.target.value, 10);
// //     if (selectedSize && product && product.stock && product.stock[selectedSize] !== undefined) {
// //       if (value > 0 && value <= product.stock[selectedSize]) {
// //         setQuantity(value);
// //       } else if (value > product.stock[selectedSize]) {
// //         alert("Cannot select more than available stock.");
// //         setQuantity(product.stock[selectedSize]);
// //       }
// //     } else {
// //       alert("Please select a valid size.");
// //     }
// //   };

// //   const handleQuantityIncrease = () => {
// //     if (selectedSize && product && product.stock && product.stock[selectedSize] !== undefined) {
// //       if (quantity < product.stock[selectedSize]) {
// //         setQuantity(quantity + 1);
// //       } else {
// //         alert("Cannot add more than available stock.");
// //       }
// //     } else {
// //       alert("Please select a valid size.");
// //     }
// //   };

// //   const handleQuantityDecrease = () => {
// //     if (quantity > 1) {
// //       setQuantity(quantity - 1);
// //     }
// //   };

// //   return (
// //     <div>
// //       {product && (
// //         <div className={style.container}>
// //           <div>
// //             <img
// //               src={product?.images?.[0]}
// //               alt={product?.name}
// //               className={style.imgDetail}
// //             />
// //           </div>
// //           <div className={style.containerRDetail}>
// //             <h1 className={style.h1Detail}>{product.name}</h1>
// //             <p className={style.pDetail}>
// //               Price:<strong> ${product.price}</strong>
// //             </p>
// //             <hr className={style.hrDetail}></hr>
// //             <p className={style.pDetail}>
// //               Color: <strong>{product.color}</strong>
// //             </p>
// //             <div className={style.sizeContainer}>
// //               <p className={style.pDetail}>Sizes and Stock: </p>
// //               <div className={style.pDetailContainer}>
// //                 {product.stock && Object.entries(product.stock).length > 0 ? (
// //                   Object.entries(product.stock).map(([size, stock]) => (
// //                     <div key={size}>
// //                       <label>
// //                         <input
// //                           type="radio"
// //                           name="size"
// //                           value={size}
// //                           checked={selectedSize === size}
// //                           onChange={() => {
// //                             setSelectedSize(size);
// //                             setQuantity(1); // Reset quantity when size changes
// //                           }}
// //                           disabled={stock === 0}
// //                         />
// //                         <strong>{size}: </strong>
// //                         {stock}
// //                       </label>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <p>No stock available</p>
// //                 )}
// //               </div>
// //             </div>
// //             <hr className={style.hrDetail}></hr>
// //             <p className={style.pDetail}>
// //               Brand : <strong>{product.brand} </strong>
// //             </p>
// //             <p className={style.pDetail}>
// //               Gender : <strong> {product.gender}</strong>
// //             </p>
// //             <p className={style.pDetail}>
// //               Category : <strong>{product.category} </strong>
// //             </p>
// //             <hr className={style.hrDetail}></hr>
// //             <p className={style.pDetailDescrip}>{product.description}</p>
// //             <div className={style.quantityContainer}>
// //               <button onClick={handleQuantityDecrease} className={style.quantityButton}>-</button>
// //               <input
// //                 type="number"
// //                 value={quantity}
// //                 onChange={handleQuantityChange}
// //                 min="1"
// //                 className={style.quantityInput}
// //               />
// //               <button onClick={handleQuantityIncrease} className={style.quantityButton}>+</button>
// //             </div>
// //             <button
// //               onClick={handleAddToCart}
// //               className={style.containerCarr}
// //               disabled={product.stock && product.stock[selectedSize] < quantity || !selectedSize}
// //             >
// //               <img src={carrito} className={style.carrito} />
// //             </button>
// //             <Link to="/home" className={style.links}>
// //               <button className={style.menuButton}>
// //                 GO TO HOME{" "}
// //                 <img src={arrowExit} alt="" className={style.arrow} />
// //               </button>
// //             </Link>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Details;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productsDetails } from "../../store/slice/productSlice";
import style from "./Details.module.css";
import arrowExit from "../../assets/flecha-17.png";
import { useCart } from "../../hooks/useCart";
import carrito from "../../assets/CART-32.png";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.productsDetails);
  const productStatus = useSelector((state) => state.products.productsStatus);
  const productError = useSelector((state) => state.products.productsError);
  const { addToCart, cart } = useCart();

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [remainingStock, setRemainingStock] = useState({});

  useEffect(() => {
    dispatch(productsDetails(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (product && product.stock) {
      // Inicializar el stock restante basado en el stock inicial del producto
      const initialRemainingStock = { ...product.stock };

      // Reducir el stock restante basado en los elementos ya en el carrito
      cart.forEach((item) => {
        if (item.id === product.id) {
          initialRemainingStock[item.selectedSize] -= item.quantity;
        }
      });

      setRemainingStock(initialRemainingStock);
    }
  }, [product, cart]);

  if (productStatus === "loading") {
    return <p>Loading...</p>;
  }

  if (productStatus === "failed") {
    const errorMessage =
      typeof productError === "object"
        ? productError?.message || "Unknown error occurred"
        : productError;

    return <p>Error: {errorMessage}</p>;
  }

  const handleQuantityChange = (newQuantity) => {
    const stock = remainingStock[selectedSize] || 0;
    if (newQuantity > 0 && newQuantity <= stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      const stock = remainingStock[selectedSize] || 0;
      if (stock < quantity) {
        alert("Not enough stock available.");
        return;
      }

      addToCart({ ...product, selectedSize, quantity });

      setRemainingStock((prevStock) => ({
        ...prevStock,
        [selectedSize]: prevStock[selectedSize] - quantity,
      }));

      alert("Product added to cart");

      // Reiniciar cantidad y tamaño después de añadir al carrito
      setQuantity(1);
      setSelectedSize("");
    } else {
      alert("Please select a size.");
    }
  };

  return (
    <div>
      {product && (
        <div className={style.container}>
          <div>
            <img
              src={product?.images?.[0]}
              alt={product?.name}
              className={style.imgDetail}
            />
          </div>
          <div className={style.containerRDetail}>
            <h1 className={style.h1Detail}>{product.name}</h1>
            <p className={style.pDetail}>
              {" "}
              Price:<strong> ${product.price}</strong>
            </p>
            <hr className={style.hrDetail}></hr>
            <p className={style.pDetail}>
              Color: <strong>{product.color}</strong>
            </p>
            <div className={style.sizeContainer}>
              <p className={style.pDetail}>Sizes and Stock: </p>
              <div className={style.pDetailContainer}>
                {Object.entries(remainingStock || {}).length > 0 ? (
                  Object.entries(remainingStock).map(([size, stock]) => (
                    <div key={size}>
                      <label>
                        <input
                          type="radio"
                          name="size"
                          value={size}
                          checked={selectedSize === size}
                          onChange={() => setSelectedSize(size)}
                          disabled={stock === 0}
                        />
                        <strong>{size}: </strong>
                        {stock}
                      </label>
                    </div>
                  ))
                ) : (
                  <p>No stock available</p>
                )}
              </div>
            </div>
            <hr className={style.hrDetail}></hr>
            <p className={style.pDetail}>
              Brand : <strong>{product.brand} </strong>
            </p>
            <p className={style.pDetail}>
              Gender : <strong> {product.gender}</strong>
            </p>
            <p className={style.pDetail}>
              Category : <strong>{product.category} </strong>
            </p>
            <hr className={style.hrDetail}></hr>
            <p className={style.pDetailDescrip}>{product.description}</p>
            <div className={style.quantityContainer}>
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= (remainingStock[selectedSize] || 0)}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={style.containerCarr}
            >
              <img src={carrito} className={style.carrito} />
            </button>
            <Link to="/home" className={style.links}>
              <button className={style.menuButton}>
                GO TO HOME{" "}
                <img src={arrowExit} alt="" className={style.arrow} />
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
