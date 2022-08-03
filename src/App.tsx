import { type } from '@testing-library/user-event/dist/type';
import React, { Fragment, useEffect, useState } from 'react';
import db from './firebase'
import { collection, getDocs, query } from "firebase/firestore";

type User = {
  id: string;
  name: string;
  height: number;
};


function App() {
  const [players, setPlayers] = useState<User[]>([]);

  // useEffect( () => {
  //   const playersRef =  getDocs(collection(db, 'players'));
  //   playersRef.forEach((playerRef) => {
  //     console.log(playerRef)
  //   } )
  // })

  return (
    <>
      <h2>Players</h2>
      {players.map((player) => (
        <div key={player.id}>
          {player.name}
          ({player.height}cm)
        </div>
      ))}
    </>
  );
}

export default App;
