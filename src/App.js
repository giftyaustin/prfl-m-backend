import { useEffect, useState } from "react";
import mockData from "./heliverse_mock_data.json";
import Card from "./components/Card.js";
import "./components/card.css";
import Navbar from "./components/Navbar";
import "./app.css";
import PaginationBar from "./components/PaginationBar";

function App() {
  const [data, setData] = useState(mockData);
  const [currData, setCurrdata] = useState(data);
  const [fdata, setFdata] = useState(mockData);
  const [currPage, setCurrPage] = useState(0);

  const genderList = [
    "Female",
    "Male",
    "Agender",
    "Bigender",
    "Polygender",
    "Non-binary",
    "Genderfluid",
    "Genderqueer",
  ];
  const availabilityList = [true, false];
  const domainList = [
    "Sales",
    "Finance",
    "Marketing",
    "IT",
    "Management",
    "UI Designing",
    "Business Development",
  ];
  // const [availability, setAvailability] = useState(Array(2).fill(false));
  // const [Gender, setGender] = useState(Array(8).fill(false));
  // const [domain, setDomain] = useState(Array(7).fill(false));

  const [pages, setPages] = useState(
    data.length % 20 !== 0 ? Math.ceil(data.length / 20) : data.length / 20
  );

  function displayCurrDetails() {
    setCurrdata(data.slice(currPage * 20, currPage * 20 + 20));
  }

  const updateSearchedData = (searchedName) => {
    setData(
      mockData.filter((c) => {
        return (
          c.first_name.toLocaleLowerCase().startsWith(searchedName) ||
          c.last_name.toLocaleLowerCase().startsWith(searchedName) ||
          (c.first_name + " " + c.last_name)
            .toLowerCase()
            .startsWith(searchedName)
        );
      })
    );
  };

  const viewAllData = () => {
    setData(mockData);
  };

  const prevPage = () => {
    setCurrPage(currPage - 1);
  };
  const nextPage = () => {
    setCurrPage(currPage + 1);
  };
  useEffect(() => {
    setPages(
      data.length % 20 !== 0 ? Math.ceil(data.length / 20) : data.length / 20
    );
    displayCurrDetails();
  }, [data, currPage]);

  useEffect(() => {
    setCurrPage(0);
  }, [data]);
  const updatePage = (i) => {
    setCurrPage(i);
  };

  // ======================filtering =====================

  //  filtering available

  const filterAvailable = (Aarray, Garray, Darray) => {
    let Aarr = Aarray;
    let Garr = Garray;
    let Darr = Darray;
    if (!Aarray.includes(true)) {
      Aarr = Aarray.map(() => {
        return true;
      });
    }
    if (!Garray.includes(true)) {
      Garr = Garray.map(() => {
        return true;
      });
    }
    if (!Darray.includes(true)) {
      Darr = Darray.map(() => {
        return true;
      });
    }
    setFdata(
      mockData.filter((c) => {
        return filter(
          Aarr,
          availabilityList,
          c,
          "available",
          Garr,
          genderList,
          "gender",
          Darr,
          domainList,
          "domain"
        );
      })
    );
  };

  //  filtering gender

  const filterGender = (arr) => {
    let array = arr;
    if (!arr.includes(true)) {
      array = arr.map(() => {
        return true;
      });
    }

    setFdata(
      mockData.filter((c) => {
        return filter(array, genderList, c, "gender");
      })
    );
  };

  //  filtering domain

  const filterDomain = (arr) => {
    let array = arr;
    if (!arr.includes(true)) {
      array = arr.map(() => {
        return true;
      });
    }
    setFdata(
      fdata.filter((c) => {
        return filter(array, domainList, c, "domain");
      })
    );
  };
  useEffect(() => {
    console.log(1, fdata);
    setData(fdata);
  }, [fdata]);

  const filter = (
    AarrTF,
    AarrItems,
    c,
    Aprop,
    GarrTF,
    GarrItems,
    Gprop,
    DarrTF,
    DarrItems,
    Dprop
  ) => {
    var result = false;

    for (let i = 0; i < AarrTF.length; i++) {
      if (AarrTF[i] ? c[Aprop] === AarrItems[i] : false) {
        for (let j = 0; j < GarrTF.length; j++) {
          if (GarrTF[j] ? c[Gprop] === GarrItems[j] : false) {
            for (let k = 0; k < DarrTF.length; k++) {
              if (DarrTF[k] ? c[Dprop] === DarrItems[k] : false) {
                result = true;
                break;
              }
            }
          }
        }
      }
    }

    return result;
  };
  return (
    <div className="App">
      <Navbar
        updateSearchedData={updateSearchedData}
        genderList={genderList}
        domainList={domainList}
        availabilityList={availabilityList}
        filterAvailable={filterAvailable}
        filterGender={filterGender}
        filterDomain={filterDomain}
      />
      {mockData.length !== data.length ? (
        <div className="view-all-holder">
          <button onClick={viewAllData}>View all</button>
        </div>
      ) : (
        ""
      )}
      {currData.map((currUser) => {
        return <Card currUser={currUser} key={currUser.id} />;
      })}
      {data.length ? "" : "no profile found"}

      <div className="page-locator">
        <PaginationBar
          pages={pages}
          currPage={currPage}
          updatePage={updatePage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
}

export default App;
