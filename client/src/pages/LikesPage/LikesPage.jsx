import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { Image } from "react-bootstrap";
import { Context } from "../..";
import LikesItem from "./LikesItem";
import "./LikesPage.scss";

const LikesPage = observer(() => {
  const { likes } = useContext(Context);
console.log(likes.Likes);
  if (likes.Likes.length == 0) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <Image
          src={process.env.PUBLIC_URL + "/img/basket/basketEmpty.png"}
          width="200"
        />
        <div
          className="text-center mt-5"
          style={{ fontSize: 28, marginBottom: 200 }}
        >
          <b>Упс, у вас пусто...</b>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="likes_container">
        {likes.Likes.map((product) => (
          <LikesItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
});

export default LikesPage;
