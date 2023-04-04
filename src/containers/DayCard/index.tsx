import styled from 'styled-components';
import { Card } from '../../components/Card';
import { Container } from '../../components/Container';
import { Stack } from '../../components/Stack';
import { ScrollbarStyles } from '../../styles/scrollbar';
import { StoredHoliday } from '../../types/holidays.types';
import { Task } from '../../types/task.types';
import { HolidayCard } from '../../components/HolidayCard';
import { TaskCard } from '../../containers/TaskCard';
import { Draggable} from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { tasksSelector } from '../../store/selectors/tasks';

export interface DayCardProps {
  day: number;
  tasks: Task[];
  holidays: StoredHoliday[];
  onDayDoubleClick: (day: number) => void;
  onTaskDoubleClick: (task: Task, day: number) => void;
}

const DayCardWrapper = styled(Card).attrs(() => ({variant: 'outlined' }))`
  flex-basis: 100%;
  margin: 5px;
  height: 125px;
  overflow: hidden;
`;


export function DayCard(props: DayCardProps) {
  const tasks = useSelector(tasksSelector);

  const handleCardDoubleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    props.onDayDoubleClick(props.day);
    event.stopPropagation();
  }

  const handleTaskDoubleClick = (task: Task) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    props.onTaskDoubleClick(task, props.day);
  }

  const getTaskIndex = (id: string) => tasks.findIndex(task => task.id === id);

  return (
    <DayCardWrapper onDoubleClick={handleCardDoubleClick}>
      <Stack
        spacing={5}
        css={{ height: '100%' }}
      >
        <Container css={{ padding: '5px 10px', }}>
          { `Day ${props.day}` }
        </Container>
        <Container
          css={{
            padding: '5px 10px',
            overflowY: 'auto',
            ...ScrollbarStyles,
          }}
        >
          <Stack spacing={15}>
            {
              props.holidays.map((holiday, index) => (
                <HolidayCard key={holiday.id}>
                  {holiday.name}
                </HolidayCard>
              ))
            }
            <Stack spacing={15}>
              {
                props.tasks.map((task)  => (
                  <Draggable key={task.id} draggableId={task.id} index={getTaskIndex(task.id)}>
                    {
                      (provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard onDoubleClick={handleTaskDoubleClick(task)} task={task} />
                        </div>
                      )
                    }
                  </Draggable>
                ))
              }
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </DayCardWrapper>
  )
}