import { useState } from "react";

export default function Filters({ onCityChange }) {
  const [selectedCity, setSelectedCity] = useState("");

  const handleCityChange = (city) => {
    setSelectedCity(city);
    onCityChange(city);
  };

  return (
    <div className="w-64 bg-white p-4 shadow rounded">
      <h2 className="font-bold mb-4">Filters</h2>

      <div className="mb-4">
        <h3 className="font-semibold">Popular Cities</h3>
        <div className="flex flex-col gap-1">
          {[
            "Pune",
            "Mumbai",
            "Delhi",
            "Bangalore",
          ].map((city) => (
            <label key={city}>
              <input
                type="radio"
                name="city"
                value={city}
                checked={selectedCity === city}
                onChange={() => handleCityChange(city)}
              />
              {" "}
              {city}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Date</h3>
        <button className="border px-2 py-1 m-1">Today</button>
        <button className="border px-2 py-1 m-1">Tomorrow</button>
      </div>
    </div>
  );
}