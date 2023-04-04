import styled from 'styled-components';
import { Card } from '../../components/Card';
import { Chip } from '../../components/Chip';
import { Container } from '../../components/Container';
import { Stack } from '../../components/Stack';
import { HiddenScrollbarStyles } from '../../styles/scrollbar';
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
}))({
  padding: '10px',
  overflow: 'hidden',
});


const TaskTagsContainer = styled(Container)({
  width: '100%',
  overflow: 'auto',
  padding: '5px 0',
  ...HiddenScrollbarStyles,
});

export function TaskCard(props: React.PropsWithChildren<TaskCardProps>) {

  return (
    <TaskCardWrapper
      variant='paper'
      onDoubleClick={props.onDoubleClick}
    >
    <TaskTagsContainer>
      <Stack
        flexDirection='row'
        alignItems='center'
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
    </TaskTagsContainer>

      {props.task.name}
    </TaskCardWrapper>
  );
}