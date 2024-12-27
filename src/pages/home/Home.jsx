import Car from "@/components/car/Car";

const Home = () => {
  const handleClick = (p) => {
    alert("Click comp " + p);
  };
  return (
    <>
      {/* <h2>Home</h2>
      <button onClick={() => handleClick(5)}>click</button>
      <Hero title={"Class Component"} /> */}
      <Car />
    </>
  );
};
export default Home;
