import styled from 'styled-components';
import { Card } from '../../components/Card';
import { Chip } from '../../components/Chip';
import { Stack } from '../../components/Stack';
import { Task } from '../../types/task.types';

export interface TaskCardProps {
  task: Task;
  onDoubleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const TaskTagChip = styled(Chip)({
  minWidth: '30px',
  height: '10px',
});

const TaskCardWrapper = styled(Card).attrs(() => ({
  className: 'task-card',
  variant: 'paper',
}))({ padding: '10px'});

export function TaskCard(props: React.PropsWithChildren<TaskCardProps>) {

  return (
    <TaskCardWrapper
      variant='paper'
      onDoubleClick={props.onDoubleClick}
    >
      <Stack
        flexDirection='row'
        flexWrap='wrap'
        spacing={5}
      >
        {
          props.task.tags.map((tag, index) => (
            <TaskTagChip
              key={tag.id}
              label={tag.name}
              color={tag.color}
            />
          ))
        }
      </Stack>

      {props.task.name}
    </TaskCardWrapper>
  );
}