import React, { useState, useEffect } from "react";
import ListData from "../upstoxList/list";
import Styles from "../UpstoxData/Styles.module.scss";

const Upstoxs = () => {
  const origionalData = [
    {
      id: 1,
      name: "Reliance EQ",
      stockExchange: "NSE",
      stockPrice: "2,398.10",
      stockValueChange: "25.15 (1.48%)",
    },
    {
      id: 2,
      name: "TCS EQ",
      stockExchange: "BSE",
      stockPrice: "3,149.55",
      stockValueChange: "-100.55 (3.20%)",
    },
    {
      id: 3,
      name: "HDFC EQ",
      stockExchange: "NSE",
      stockPrice: "1,494.95",
      stockValueChange: "1.10 (0.88%)",
    },
    {
      id: 4,
      name: "Infy EQ",
      stockExchange: "BSE",
      stockPrice: "1,668.50",
      stockValueChange: "43.55 (2.58%)",
    },
    {
      id: 5,
      name: "Unilever EQ",
      stockExchange: "NSE",
      stockPrice: "2,495.30",
      stockValueChange: "-31.90 (1.37%)",
    },
    {
      id: 6,
      name: "Reliance EQ",
      stockExchange: "NSE",
      stockPrice: "2,338.10",
      stockValueChange: "35.15 (1.48%)",
    },
    {
      id: 7,
      name: "TCS EQ",
      stockExchange: "BSE",
      stockPrice: "3,649.55",
      stockValueChange: "-120.55 (3.20%)",
    },
    {
      id: 8,
      name: "HDFC EQ",
      stockExchange: "NSE",
      stockPrice: "1,474.95",
      stockValueChange: "13.10 (0.88%)",
    },
  ];
  //////////////////////////////////////  State  section //////////////////////////////////////////////
  const [data, setData] = useState(origionalData);

  const [copyData, setCopyData] = useState(origionalData);

  const [tab, setTab] = useState("stockData");

  const [watchList, setWatchList] = useState([]);

  const [cart, setCart] = useState([]);

  const [searchValue, setSearchValue] = useState([]);
  //////////////////////////////////////  Tab handler section //////////////////////////////////////////////
  const TabHandlerFuntion = (e) => {
    setTab(e);
  };
  //////////////////////////////////////  watchlist handler section //////////////////////////////////////////////
  const watchListHandler = (e) => {
    let selectedItem = data.find((item) => item.id === e);
    let trackWatchList = watchList.find((i) => i.id === selectedItem.id);

    if (selectedItem) {
      if (trackWatchList) {
        setWatchList((watch) => watch.filter((item) => item.id !== selectedItem.id));
      } else {
        setWatchList((watch) => watch.concat(selectedItem));
      }
    }
  };
  // ...................................................................................................//
  const watchHandler = (e) => {
    let filterItem = watchList.filter((item) => item.id !== e);
    setWatchList(filterItem);
  };

  //////////////////////////////////////  cart handler section //////////////////////////////////////////////
  const cartListHandler = (e) => {
    let selectedItem = data.find((item) => item.id === e);
    let trackCardList = cart.find((i) => i.id === selectedItem.id);

    if (selectedItem) {
      if (trackCardList) {
        setCart((cart) => cart.filter((item) => item.id !== selectedItem.id));
      } else {
        setCart((cart) => cart.concat(selectedItem));
        // setCart((prevCart) => [...prevCart, selectedItem]);
      }
    }
  };
  // .................................................................................................//
  const cartHandler = (e) => {
    let filterItem = cart.filter((item) => item.id !== e);
    setCart(filterItem);
  };
  // /////////////////////////////////////

  const SearchEngine = (e) => {
    let allData = [...copyData];
    if (e.target.value !== "") {
      const findItem = allData.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
      setData(findItem);
    } else {
      setData(allData);
    }
  };
  return (
    <>
      <div className={Styles.container}>
        {/* <i class="fa-brands fa-react"></i>
        <i class="fa-regular fa-handshake" style={{ color: "rgb(163 132 132)", fontSize: "50px" }}></i>
        <i class="fa-brands fa-sass" style={{ color: "#ff6600" }}></i> */}
        <h1>Welcome to Upstox</h1>
        <h2>Start trading to see some magic happen!</h2>
        {/* //////////////////////////////////////////////////////////////////////////////////*/}
        <div className={Styles.container__flexBox}>
          <div className={Styles.container__flexBox__wrapBox}>
            <ListData className={tab === "stockData" ? Styles.container__flexBox__wrapBox__active : ""} TabHandler={() => TabHandlerFuntion("stockData")} listName={"STOCK"} />
          </div>
          {/* //////////////////////////////////////////////////////////////////////////////////*/}
          <div className={Styles.container__flexBox__wrapBox}>
            <ListData className={tab === "watchList" ? Styles.container__flexBox__wrapBox__active : ""} TabHandler={() => TabHandlerFuntion("watchList")} listName={"WATCHLIST"} />
          </div>
          {/* //////////////////////////////////////////////////////////////////////////////////*/}
          <div className={Styles.container__flexBox__wrapBox}>
            <ListData className={tab === "orders" ? Styles.container__flexBox__wrapBox__active : ""} TabHandler={() => TabHandlerFuntion("orders")} listName={"ORDERS"} />
          </div>
          {/* //////////////////////////////////////////////////////////////////////////////////*/}
        </div>
        {/* ..................................... */}
        <div>
          <span>
            Search: <input type="text" placeholder="search stox" value={searchValue.name} onChange={SearchEngine} />
          </span>
        </div>
        {/* ///////////////////// Tab1 section ///////////////////////////////////////////////*/}
        {tab === "stockData" && (
          <div className={Styles.container__parentData}>
            {data.map((item) => {
              return (
                <ul className={Styles.container__parentData__ulList}>
                  <div>
                    <li>{item.name}</li>
                    <li>{item.stockExchange}</li>
                  </div>
                  <div className={Styles.container__parentData__ulList__icon}>
                    <li onClick={() => watchListHandler(item.id)} className={watchList.some((i) => i.id === item.id) ? Styles.clicked : ""}>
                      <i class=" fa-solid fa-heart"></i>
                    </li>
                    <li onClick={() => cartListHandler(item.id)} className={cart.some((i) => i.id === item.id) ? Styles.clicked2 : ""}>
                      <i className="fa-solid fa-cart-shopping"></i>
                    </li>
                  </div>
                  <div>
                    <li>{"₹" + item.stockPrice}</li>
                    <li className={item.stockValueChange.includes("-") ? Styles.negative : Styles.positive}>{item.stockValueChange}</li>
                  </div>
                </ul>
              );
            })}
          </div>
        )}
        {/* ///////////////////// Tab2 section ///////////////////////////////////////////////*/}
        {tab === "watchList" && (
          <div className={Styles.container__parentData}>
            {watchList.map((item) => {
              return (
                <ul className={Styles.container__parentData__ulList}>
                  <div>
                    <li>{item.name}</li>
                    <li>{item.stockExchange}</li>
                  </div>
                  <div className={Styles.container__parentData__ulList__icon}>
                    <li>
                      <i onClick={() => watchHandler(item.id)} class={`fa-solid fa-heart ${Styles.container__parentData__ulList__icon__watch}`}></i>
                    </li>
                    <li>
                      <i class="fa-solid fa-cart-shopping"></i>
                    </li>
                  </div>
                  <div>
                    <li>{"₹" + item.stockPrice}</li>
                    <li>{item.stockValueChange}</li>
                  </div>
                </ul>
              );
            })}
          </div>
        )}
        {/* ///////////////////// Tab3 section ///////////////////////////////////////////////*/}
        {tab === "orders" && (
          <div className={Styles.container__parentData}>
            {cart.map((item) => {
              return (
                <ul className={Styles.container__parentData__ulList}>
                  <div>
                    <li>{item.name}</li>
                    <li>{item.stockExchange}</li>
                  </div>
                  <div className={Styles.container__parentData__ulList__icon}>
                    <li>
                      <i className="fa-solid fa-heart"></i>
                    </li>
                    <li>
                      <i onClick={() => cartHandler(item.id)} className={`fa-solid fa-cart-shopping ${Styles.container__parentData__ulList__icon__cart}`}></i>
                    </li>
                  </div>
                  <div>
                    <li>{"₹" + item.stockPrice}</li>
                    <li>{item.stockValueChange}</li>
                  </div>
                </ul>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
export default Upstoxs;
