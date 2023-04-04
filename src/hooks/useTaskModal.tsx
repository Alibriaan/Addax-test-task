import { useState } from "react";
import { ColorResult } from "react-color";
import { Task } from "../types/task.types";
import { v4 as uuidv4 } from 'uuid';

export function useTaskModal(initial: Task) {
  const [localTask, setLocalTask] = useState<Task>(initial);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTask({
      ...localTask,
      name: event.target.value,
    });
  };

  const handleTagColorChange = (id: string, color: ColorResult) => {
    setLocalTask((previousValue) => (
      {
        ...localTask,
        tags: previousValue.tags.map(tag => tag.id === id ? { ...tag, color: color.hex } : tag ),
      }
    ));
  }

  const handleTagNameChange = (id: string, name: string) => {
    setLocalTask((previousValue) => (
      {
        ...localTask,
        tags: previousValue.tags.map(tag => tag.id === id ? { ...tag, name } : tag),
      }
    ));
  };

  const handleDeleteTag = (id: string) => {
    setLocalTask((previousValue) => (
      {
        ...localTask,
        tags: previousValue.tags.filter(tag => tag.id !== id),
      }
    ));
  }

  const handleCreateNewTag = () => {
    setLocalTask((previousValue) => (
      {
        ...localTask,
        tags: [
          ...previousValue.tags,
          {
            id: uuidv4(),
            name: '',
            color: '#ffffff',
          }
        ],
      }
    ));
  }

  const createNewTaskTemplate = (date: string) => {
    return {
      id: uuidv4(),
      name: '',
      tags: [],
      date,
    };

  }


  return {
    localTask,
    setLocalTask,
    handleNameChange,
    handleTagColorChange,
    handleTagNameChange,
    handleDeleteTag,
    handleCreateNewTag,
    createNewTaskTemplate,
  };
}