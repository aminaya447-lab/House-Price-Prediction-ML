import { useEffect, useState } from "react";

function App() {
  const [locations, setLocations] = useState([]);

  const [carpetArea, setCarpetArea] = useState("");
  const [floorNum, setFloorNum] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [balcony, setBalcony] = useState("");

  const [location, setLocation] = useState("");
  const [furnishing, setFurnishing] = useState("Semi-Furnished");
  const [transaction, setTransaction] = useState("Resale");
  const [ownership, setOwnership] = useState("Freehold");
  const [facing, setFacing] = useState("East");

  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data.locations))
      .catch(console.error);
  }, []);

  const predictPrice = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carpet_area_sqft: Number(carpetArea),
          floor_num: Number(floorNum),
          bathroom: Number(bathroom),
          balcony: Number(balcony),
          location: location,
          furnishing: furnishing,
          transaction: transaction,
          ownership: ownership,
          facing: facing,
        }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        setPrice(data.predicted_price);
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to FastAPI");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h1>House Price Prediction</h1>

      <input
        type="number"
        placeholder="Carpet Area (sqft)"
        value={carpetArea}
        onChange={(e) => setCarpetArea(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Floor Number"
        value={floorNum}
        onChange={(e) => setFloorNum(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Bathroom"
        value={bathroom}
        onChange={(e) => setBathroom(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Balcony"
        value={balcony}
        onChange={(e) => setBalcony(e.target.value)}
      />

      <br /><br />

      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="">Choose Location</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <br /><br />

      <select
        value={furnishing}
        onChange={(e) => setFurnishing(e.target.value)}
      >
        <option>Semi-Furnished</option>
        <option>Furnished</option>
        <option>Unfurnished</option>
      </select>

      <br /><br />

      <select
        value={transaction}
        onChange={(e) => setTransaction(e.target.value)}
      >
        <option>Resale</option>
        <option>New Property</option>
      </select>

      <br /><br />

      <select
        value={ownership}
        onChange={(e) => setOwnership(e.target.value)}
      >
        <option>Freehold</option>
        <option>Leasehold</option>
      </select>

      <br /><br />

      <select
        value={facing}
        onChange={(e) => setFacing(e.target.value)}
      >
        <option>East</option>
        <option>West</option>
        <option>North</option>
        <option>South</option>
      </select>

      <br /><br />

      <button onClick={predictPrice}>
        Predict Price
      </button>

      <h2>
        {price !== "" && `Predicted Price: ₹ ${price}`}
      </h2>
    </div>
  );
}

export default App;