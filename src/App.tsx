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

  useEffect( () => {
    const getPlayers =async () => {
      const data = await getDocs(playersRef);
      console.log(data.docs)
      // setPlayers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    getPlayers()
    // const docSnap = await getDoc(playersRef);
    // playersRef.forEach((playerRef) => {
    //   console.log(playerRef)
    // } )
  })

  return (
    <>
      <h2>Players</h2>
      
    </>
  );
}

export default App;
