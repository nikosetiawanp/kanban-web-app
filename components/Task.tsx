import TaskDetail from "@/components/TaskDetail";
import { useState } from "react";

export default function Task(props: {
  key: string;
  id: string;
  task: string;
  subtasks: [object];
  description: string;
  setTaskDetailIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [taskDetailIsActive, setTaskDetailIsActive] = useState(false);

  return (
    <>
      <button
        key={props.task.id}
        onClick={() => setTaskDetailIsActive(true)}
        className="bg-dark-grey rounded-lg px-4 py-6 flex flex-col hover:cursor-pointer hover:bg-lines-dark mb-4"
      >
        <h2 className="text-heading-md mb-2 text-left">{props.task}</h2>
        <p className="text-body-md text-medium-grey">
          (
          {
            props.subtasks.filter((subtask) => subtask.is_completed == true)
              .length
          }
          of {props.subtasks.length}) &nbsp; subtasks
        </p>
      </button>

      {taskDetailIsActive && (
        <TaskDetail
          key={props.id}
          id={props.id}
          task={props.task}
          subtasks={props.subtasks}
          description={props.description}
        />
      )}
    </>
  );
}
