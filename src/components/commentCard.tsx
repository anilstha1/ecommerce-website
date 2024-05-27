import {Rating} from "@mui/material";
import {RxAvatar} from "react-icons/rx";

function CommentCard() {
  return (
    <div className="container mx-auto mt-8">
      <div>Add Rating</div>
      <h1 className="font-bold text-lg">Product Review</h1>
      <div className="bg-gray-100 p-5 rounded-md my-3 max-w-fit">
        <div className="flex items-center">
          <RxAvatar className="text-lg" />
          <h1 className="font-bold text-lg ml-3">Sagar</h1>
        </div>

        <Rating value={5} readOnly />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nostrum
        </p>
      </div>

      <div className="bg-gray-100 p-5 rounded-md max-w-fit">
        <div className="flex items-center">
          <RxAvatar className="text-lg" />
          <h1 className="font-bold text-lg ml-3">Sagar</h1>
        </div>

        <Rating value={5} readOnly />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus non
        </p>
      </div>
    </div>
  );
}

export default CommentCard;
