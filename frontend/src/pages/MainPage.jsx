import OptionContext from "../gameAssest/Options";
import Navbar from "../components/Navbar";
import Grid from "../components/Grid";
import GameComponents from "../components/GameComponents";
import GameAttributes from "../components/GameAttributes";

export default function MainPage() {
  return (
    <OptionContext>
      <Navbar />
      <GameComponents />
      <Grid />
      <GameAttributes />
    </OptionContext>
  );
}
