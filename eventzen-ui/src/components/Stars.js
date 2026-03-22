export default function Stars() {

  const stars = new Array(60).fill(0);

  return (

    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none" 
      }}
    >

      {stars.map((_, i) => (

        <div
          key={i}
          style={{
            position: "absolute",
            width: 2,
            height: 2,
            background: "white",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            opacity: Math.random(),
            animation:
              "moveStar 10s linear infinite",
            
          }}
        />

      ))}

    </div>

  );
}