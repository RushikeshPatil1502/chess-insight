import { Grid2 as Grid, Typography } from "@mui/material";
import { useGameDatabase } from "@/hooks/useGameDatabase";
import { useAtomValue } from "jotai";
import { gameAtom } from "../states";

export default function GamePanel() {
  const { gameFromUrl } = useGameDatabase();
  const game = useAtomValue(gameAtom);

  const hasGameInfo = gameFromUrl !== undefined || !!game.header().White;

  if (!hasGameInfo) return null;

  const termination =
    gameFromUrl?.termination || game.header().Termination || "?";
  const result =
    termination.split(" ").length > 2
      ? termination
      : gameFromUrl?.result || game.header().Result || "?";

  return (
    <Grid
      container
      justifyContent="space-evenly"
      alignItems="center"
      rowGap={1}
      columnGap={3}
      size={11}
    >
      <Grid container justifyContent="center" alignItems="center" size="grow">
        <Typography noWrap fontSize="0.9rem">
          Site : {gameFromUrl?.site || game.header().Site || "?"}
        </Typography>
      </Grid>

      <Grid container justifyContent="center" alignItems="center" size="grow">
        <Typography noWrap fontSize="0.9rem">
          Date : {gameFromUrl?.date || game.header().Date || "?"}
        </Typography>
      </Grid>

      <Grid container justifyContent="center" alignItems="center" size="grow">
        <Typography noWrap fontSize="0.9rem">
          Result : {result}
        </Typography>
      </Grid>
    </Grid>
  );
}
