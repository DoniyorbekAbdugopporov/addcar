import Car from "@/components/car/Car";
import UserManager from "@/components/userManeger/UserManeger";

const Home = () => {
  const handleClick = (p) => {
    alert("Click comp " + p);
  };
  return (
    <>
      {/* <h2>Home</h2>
      <button onClick={() => handleClick(5)}>click</button>
      <Hero title={"Class Component"} /> */}
      {/* <Car /> */}
      <UserManager />
    </>
  );
};
export default Home;
