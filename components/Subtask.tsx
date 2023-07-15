import Image from "next/image";
import IconCheck from "../assets/icon-check.svg";
import { useEffect, useState } from "react";

export default function Subtask(props: {
  key: string;
  id: string;
  subtask: string;
  is_completed: boolean;
  setCompletedTaskCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isCompleted, setIsCompleted] = useState(false);
  useEffect(() => {
    setIsCompleted(props.is_completed);
  }, []);

  const check = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    props.setCompletedTaskCount((current) => current + 1);
    setIsCompleted(true);
  };
  const uncheck = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    props.setCompletedTaskCount((current) => current - 1);
    setIsCompleted(false);
  };

  return (
    <>
      {isCompleted ? (
        <button
          key={props.key}
          type="button"
          onClick={uncheck}
          className="bg-very-dark-grey px-4 py-6 gap-6 rounded-md flex items-center"
        >
          <button className="bg-main-purple w-[16px] min-w-[16px] h-[16px] flex justify-center items-center rounded-sm">
            <Image src={IconCheck} alt="icon-check" />
          </button>
          <p className="text-body-md line-through text-white-custom/50">
            {props.subtask}
          </p>
        </button>
      ) : (
        <button
          key={props.key}
          type="button"
          onClick={check}
          className="bg-very-dark-grey px-4 py-6 gap-6 rounded-md flex items-center"
        >
          <button className="bg-white-custom w-[16px] min-w-[16px] h-[16px] flex justify-center items-center rounded-sm"></button>
          <p className="text-body-md text-white-custom">{props.subtask}</p>
        </button>
      )}
    </>
  );
}