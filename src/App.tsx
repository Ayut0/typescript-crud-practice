import { type } from '@testing-library/user-event/dist/type';
import  {  useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, } from "firebase/firestore";

type User = {
  id: string;
  name: string;
  height: number;
};


function App() {
  const [players, setPlayers] = useState<User[]>([]);
  const playersRef = collection(db, 'Players');

  const getPlayers =async () => {
    const data = await getDocs(playersRef);
    console.log(data);
    const playerLists: any[] = [];
    data.forEach((doc) => {
      console.log(doc.id, doc.data());
      playerLists.push({ ...doc.data(), id: doc.id });
    })
    console.log(playerLists);
    setPlayers(playerLists);
  }
  useEffect( () => {
    getPlayers();
  },[])

  return (
    <>
      <h2>Players</h2>
      {players.map((player) => (
        <div>
          {player.name} ({player.height}cm)
        </div>
      ))}
    </>
  );
}

export default App;
