import {useState} from "react";
import Button from "./Button";

export default function FavoritesSaveLoading() {
  const [show, setShow] = useState('static' as 'heart' | 'circle');

  return (
    <div>
      <button onClick={() => { setShow('heart') }}>Добавить в избранное</button>
      <Button
        show={show}
        onHeartEnd={() => {
          setShow('circle');
        }}
      />
    </div>
  );
}