import { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { ColorPicker } from '../../components/CollorPicker';
import { Container } from '../../components/Container';
import { Input } from '../../components/Input';
import { Overlay } from '../../components/Overlay';
import { Stack } from '../../components/Stack';
import { Task } from '../../types/task.types';
import { changeTaskModalVisibility, TaskModalMode } from '../../store/slices/ui';
import { updateActiveTaskId, createTask, updateTask, deleteTask } from '../../store/slices/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { v4 as uuidv4 } from 'uuid';
import { useTaskModal } from '../../hooks/useTaskModal';
import { activeTaskIdSelector, tasksSelector } from '../../store/selectors/tasks';
import { taskModalModeSelector, taskModalVisibleSelector } from '../../store/selectors/ui';
import { activeDateSelector } from '../../store/selectors/calendar';
import { Tag } from '../../types/tag.types';
import { ColorResult } from 'react-color';

const TaskModalWrapper = styled(Overlay)<{ visible: boolean }>`
  transition: opacity 0.3s ease-in-out;
  opacity: ${props => props.visible ? 1 : 0};
  pointer-events: ${props => props.visible ? 'all' : 'none'};
`
const TaskModalCard = styled(Card).attrs(() => ({ variant: 'paper' }))`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 15px;
  width: 50%;
  height: 50%;
  overflow: auto;
  transform: translate(-50%, -50%);
  border-radius: ${props => props.theme.border.radius};
  background-color: #ffffff;
`;

export function TaskModal() {
  const {
    localTask,
    setLocalTask,
    handleNameChange,
    handleTagColorChange,
    handleTagNameChange,
    handleDeleteTag,
    handleCreateNewTag,
    createNewTaskTemplate,
  } = useTaskModal({
    id: '',
    name: '',
    tags: [],
    date: '',
  });

  const dispatch = useDispatch();
  const mode = useSelector<RootState, TaskModalMode>(taskModalModeSelector);
  const visible = useSelector<RootState, boolean>(taskModalVisibleSelector);
  const activeTaskId = useSelector<RootState, string>(activeTaskIdSelector);
  const tasks = useSelector<RootState, Task[]>(tasksSelector);
  const activeDate = useSelector<RootState, string>(activeDateSelector);

  const handleSaveTask = () => {
    if(mode === 'create') {
      dispatch(createTask(localTask));
    } else {
      dispatch(updateTask(localTask));
    }

    closeModal();
  }

  const handleDeleteTask = () => {
    dispatch(deleteTask(localTask.id));
    dispatch(updateActiveTaskId(''));
    closeModal();
  }

  const closeModal = () => {
    dispatch(changeTaskModalVisibility(false));
    dispatch(updateActiveTaskId(''));
  }

  useEffect(() => {
    if(mode === 'create' && visible) {
      setLocalTask(createNewTaskTemplate(activeDate));
    }

    const task = tasks.find((task) => task.id === activeTaskId);

    if(mode === 'edit' && visible && task) {
      setLocalTask(task);
    }
  }, [visible]);



  return (
    <TaskModalWrapper visible={visible}>
      <TaskModalCard className='task-modal'>
        <Stack spacing={10}>
          <ModalHeader closeModal={closeModal} />
          <Stack
            className='task-modal_content'
            spacing={10}
          >
            <ModalTitle children='Name' />
            <Input
              placeholder='...'
              onChange={handleNameChange}
              value={localTask?.name}
            />
            <ModalTitle children='Tags' />
            <Stack
              className='task-modal_tags'
              spacing={10}
            >
              {
                localTask?.tags.map((tag, index) => (
                  <TagSection
                    key={tag.id}
                    tag={tag}
                    onTagNameChange={handleTagNameChange}
                    onTagColorChange={handleTagColorChange}
                    onTagDelete={handleDeleteTag}
                  />
                ))
              }
            </Stack>
          </Stack>
          <ModalActions
            handleCreateNewTag={handleCreateNewTag}
            handleSaveTask={handleSaveTask}
            handleDeleteTask={handleDeleteTask}
            mode={mode}
          />
        </Stack>
      </TaskModalCard>
    </TaskModalWrapper>
  )
}

interface ModalHeaderProps {
  closeModal: () => void;
}

const ModalHeader = (props: ModalHeaderProps) => {
  return (
    <Stack
      className='task-modal_header'
      justifyContent='center'
      alignItems='flex-end'
    >
      <Button
        variant='paper'
        onClick={props.closeModal}
      >
        Close
      </Button>
    </Stack>
  )
}

const ModalTitle = styled.h2`
  text-align: center;
`;

interface TagSectionProps {
  tag: Tag;
  onTagNameChange: (id: string, value: string ) => void;
  onTagColorChange: (id: string, result: ColorResult) => void;
  onTagDelete: (id: string) => void;
}

const TagSection = (props: TagSectionProps) => {
  const handleTagNameChange = (event: React.ChangeEvent<HTMLInputElement>) => props.onTagNameChange(props.tag.id, event.target.value);
  const handdleTagColorChange = (color: ColorResult) => props.onTagColorChange(props.tag.id, color);
  const handleDeleteTag = () => props.onTagDelete(props.tag.id);

  return (
    <Stack
      flexDirection='row'
      justifyContent='flex-start'
      alignItems='center'
      spacing={15}
    >
    <Card
      variant='outlined'
      css={{ padding: 10}}>
      <Stack
        flexDirection='row'
        alignItems='center'
        spacing={15}
      >
        <Input
          placeholder='Name'
          value={props.tag.name}
          onChange={handleTagNameChange}
        />
        <ColorPicker
          color={props.tag.color}
          onChange={handdleTagColorChange}
        />
        <Button
          variant='paper'
          onClick={handleDeleteTag}
        >
          Delete
        </Button>
      </Stack>
    </Card>
    </Stack>
  )
}

interface ModalActionsProps {
  handleCreateNewTag: () => void;
  handleSaveTask: () => void;
  handleDeleteTask: () => void;
  mode: TaskModalMode;
}

const ModalActions = (props: ModalActionsProps) => {
  return (
    <Stack
      className='task-modal_actions'
      flexDirection='row'
      justifyContent='flex-end'
      alignItems='center'
      spacing={15}
    >
    <Button
      variant='paper'
      onClick={props.handleCreateNewTag}
    >
      Add Tag
    </Button>
    <Button
      variant='paper'
      onClick={props.handleSaveTask}
    >
      Save
    </Button>
    { props.mode === 'edit' && <Button variant='paper' onClick={props.handleDeleteTask}>Delete</Button> }
    </Stack>
  )
}