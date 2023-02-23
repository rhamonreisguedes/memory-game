import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { Button } from "./components/Button";
import { InfoItem } from "./components/InfoItem";
import { useEffect, useState } from "react";
import { GridItemType } from "./types/GridItemType";
import { items } from "./data/items";
import { GridItem } from "./components/GridItem";
import { formatTimeElpased } from "./helpers/formatTimeElpased";

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => {
    resetAndCreateGrid();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing){
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  const resetAndCreateGrid = () => {
    // step 1 - reset the game
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);

    //setp - 2 create the grid and start the game
    //2.1 - create an empty grid
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false,
      });
    }
    // 2.2 - preencher o grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }

    //2.3 - jogar no state
    setGridItems(tmpGrid);

    //set 3 - start the game
    setPlaying(true);
  };

  const handleItemClick = (index: number) => {};

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" alt="" />
        </C.LogoLink>
        {gridItems.map((item, index) => (
          <GridItem
            key={index}
            item={item}
            onClick={() => handleItemClick(index)}
          ></GridItem>
        ))}
        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElpased(timeElapsed)} />
          <InfoItem label="Movimentos" value="0" />
        </C.InfoArea>

        <Button
          label="Reiniciar"
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid></C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
