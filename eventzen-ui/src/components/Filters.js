export default function Filters() {
  return (

    <div className="w-64 bg-white p-4 shadow rounded">

      <h2 className="font-bold mb-4">
        Filters
      </h2>

      <div className="mb-4">

        <h3 className="font-semibold">
          Popular Cities
        </h3>

        <div className="flex flex-col gap-1">

          <label>
            <input type="checkbox" /> Pune
          </label>

          <label>
            <input type="checkbox" /> Mumbai
          </label>

          <label>
            <input type="checkbox" /> Delhi
          </label>

          <label>
            <input type="checkbox" /> Bangalore
          </label>

        </div>

      </div>

      <div className="mb-4">

        <h3 className="font-semibold">
          Date
        </h3>

        <button className="border px-2 py-1 m-1">
          Today
        </button>

        <button className="border px-2 py-1 m-1">
          Tomorrow
        </button>

      </div>

    </div>
  );
}