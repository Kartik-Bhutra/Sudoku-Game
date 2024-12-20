import GameAttributes from "../components/GameAttributes";
import GameComponents from "../components/GameComponents";
import Grid from "../components/Grid";
import Navbar from "../components/Navbar";

export default function MainPage() {
  return (
    <>
      <Navbar />
      <GameComponents/>
      <Grid />
      <GameAttributes/>
    </>
  );
}
