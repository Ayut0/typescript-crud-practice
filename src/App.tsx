// import { type } from '@testing-library/user-event/dist/type';
import  {  useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, deleteDoc, doc, getDocs, addDoc, serverTimestamp} from "firebase/firestore";

type User = {
  id: string;
  name: string;
  height: number;
};

// interface playerSend  {
//   id: string;
//   name: string;
//   height: number;
// }
// interface playerReceives  {
//   id: string;
//   name: string;
//   height: number;
// }
//const playerArray:[] =[]

function App() {
  const [players, setPlayers] = useState<User[]>([]);
  const playersRef = collection(db, 'Players');
  const [addUserName, setAddUserName] = useState<string>('');
  const [addUserHeight, setAddUserHeight] = useState<number>();

  const getPlayers =async () => {
    const data = await getDocs(playersRef);
    console.log(data.docs[0].data());
    // const playerLists: any[] = [];
    // data.forEach((doc) => {
    //   console.log(doc.id, doc.data());
    //   playerLists.push({ ...doc.data(), id: doc.id });
    // })
    const playersList:any = data.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));
    console.log(playersList);
    setPlayers(playersList);
  }
  useEffect( () => {
    getPlayers();
  },[])

  //Delete
  const deleteHandler = async (id:string) =>{
    if(window.confirm("Are you sure to delete?")){
      const deleteRef = doc(db, "Players", id);
      console.log(deleteRef);
      await deleteDoc(deleteRef)
      await getPlayers();
    }
  }

  //Add
  const addHandler =async () => {
    if(window.confirm('Do you want to add this player?')){
      await addDoc(playersRef, {
        name: addUserName,
        height: addUserHeight,
        Timestamp: serverTimestamp()
      });
      await getPlayers();
    }
  }

  return (
    <>
      <h2>Players</h2>
      <div>
        <label>
          NAME: {''}
          <input type="text" value={addUserName} onChange={(e) => setAddUserName(e.target.value)} />
        </label>
        <label>
          HEIGHT: {''}
          <input type="number" value={addUserHeight} onChange={(e) => setAddUserHeight(e.target.valueAsNumber)} />
        </label>
        <button onClick={() => addHandler()}>Add new player</button>
      </div>
      <table>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.name} </td>
              <td>({player.height}cm)</td>
              <td>
                <button onClick={() => deleteHandler(player.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
