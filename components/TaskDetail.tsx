/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { useState } from "react";

import IconChevronDown from "../assets/icon-chevron-down.svg";
import IconChevronUp from "../assets/icon-chevron-up.svg";
import IconVerticalEllipsis from "../assets/icon-vertical-ellipsis.svg";

import StatusList from "./StatusList";
import EditDeleteTask from "./EditDeleteTask";
import DeleteTaskConfirm from "./DeleteTaskConfirm";
import EditTaskForm from "./EditTaskForm";
import Subtask from "./Subtask";
import { supabase } from "@/utils/client";

export default function TaskDetail(props: {
  id: string;
  task: string;
  description: string;
  subtasks: [
    {
      id: string;
      is_completed: boolean;
      subtask: string;
    }
  ];
  columns: string[];
  status: string;
  setTaskDetailIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  activeBoardId: string;
  rerenderTasks: boolean;
  setRerenderTasks: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [status, setStatus] = useState(props.status);
  const [completedTaskCount, setCompletedTaskCount] = useState(
    props.subtasks.filter((subtask) => subtask.is_completed == true).length
  );
  const [statusListIsActive, setStatusListIsActive] = useState(false);
  const [editTaskFormIsActive, setEditTaskFormIsActive] = useState(false);
  const [editDeleteTaskIsActive, setEditDeleteTaskIsActive] = useState(false);
  const [deleteTaskConfirmIsActive, setDeleteTaskConfirmIsActive] =
    useState(false);
  const toggleStatusList = () => {
    setStatusListIsActive((current) => !current);
  };

  const mappedSubtasks = props.subtasks.map((subtask) => (
    <Subtask
      key={subtask.id}
      id={subtask.id}
      subtask={subtask.subtask}
      is_completed={subtask.is_completed}
      setCompletedTaskCount={setCompletedTaskCount}
      rerenderTasks={props.rerenderTasks}
      setRerenderTasks={props.setRerenderTasks}
    />
  ));

  return (
    <>
      <div
        onClick={() => {
          {
            props.setTaskDetailIsActive(false);
          }
        }}
        className="bg-black-overlay flex justify-center items-center w-screen h-screen p-4 fixed top-0 left-0 z-50"
      >
        <form
          onClick={(event) => {
            event.stopPropagation();
            setEditDeleteTaskIsActive(false);
          }}
          action="submit"
          className="flex flex-col w-full max-w-[480px] h-fit p-6 rounded-md bg-dark-grey"
        >
          <div className="mb-6 gap-8 flex justify-between items-center">
            <h3 className="text-heading-lg">{props.task}</h3>
            <button
              onClick={(event) => {
                event?.stopPropagation();
                setEditDeleteTaskIsActive(true);
              }}
              className="relative"
              type="button"
            >
              <Image
                priority
                className="min-h-[20px] min-w-[4.62px]"
                src={IconVerticalEllipsis}
                alt="icon-vertical-ellipsis"
              />
              {editDeleteTaskIsActive && (
                <EditDeleteTask
                  setEditTaskFormIsActive={setEditTaskFormIsActive}
                  setDeleteTaskConfirmIsActive={setDeleteTaskConfirmIsActive}
                  setEditDeleteTaskIsActive={setEditDeleteTaskIsActive}
                />
              )}
            </button>
          </div>
          <p className="text-body-lg mb-6 text-medium-grey">
            {props.description}
          </p>

          {/* SUBTASKS */}
          <label htmlFor="subtasks" className="mb-4 text-body-md">
            Subtasks ({completedTaskCount} &nbsp; of &nbsp;{" "}
            {props.subtasks.length})
          </label>

          {/* SUBTASKS CONTAINER */}
          <ul className="flex flex-col gap-2 mb-6">{mappedSubtasks}</ul>

          <label htmlFor="status" className="mb-2 text-body-md">
            Current Status
          </label>
          <button
            type="button"
            className={`flex relative justify-between items-center h-[40px] bg-dark-grey border ${
              statusListIsActive ? "border-main-purple" : "border-lines-dark"
            } hover:border-main-purple  mb-6 px-4 rounded-md text-white-custom text-body-lg placeholder:text-white-custom/25 placeholder:text-body-lg outline-none`}
            onClick={toggleStatusList}
          >
            {status}
            {!statusListIsActive ? (
              <Image src={IconChevronDown} alt="icon-chevron-down" />
            ) : (
              <Image src={IconChevronUp} alt="icon-chevron-up" />
            )}
            {/* STATUS LIST */}
            {statusListIsActive && (
              <StatusList
                columns={props.columns}
                status={status}
                setStatus={setStatus}
                id={props.id}
              />
            )}
          </button>
        </form>
      </div>

      {deleteTaskConfirmIsActive && (
        <DeleteTaskConfirm
          id={props.id}
          task={props.task}
          setDeleteTaskConfirmIsActive={setDeleteTaskConfirmIsActive}
        />
      )}
      {editTaskFormIsActive && (
        <EditTaskForm
          key={props.id}
          id={props.id}
          task={props.task}
          description={props.description}
          subtasks={props.subtasks}
          columns={props.columns}
          status={props.status}
          setEditTaskFormIsActive={setEditTaskFormIsActive}
        />
      )}
    </>
  );
}
