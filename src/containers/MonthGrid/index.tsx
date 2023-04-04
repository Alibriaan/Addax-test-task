import moment from 'moment';
import React from 'react';
import { Grid } from '../../components/Grid';
import { Task } from '../../types/task.types';
import { DayCard } from '../../containers/DayCard';
import {
  changeTaskModalVisibility,
  changeTaskModalMode,
} from '../../store/slices/ui';
import {
  setActiveDate
} from '../../store/slices/calendar';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, selectSearchedTasksSelector } from '../../store';
import { DATE_FORMAT } from '../../constants';
import { switchTaskOrders, updateActiveTaskId, updateTaskDate } from '../../store/slices/tasks';
import { StoredHoliday } from '../../types/holidays.types';
import { activeDateSelector } from '../../store/selectors/calendar';
import { holidaysSelector } from '../../store/selectors/holidays';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { getMonthDaysByDate } from '../../services/date';



export const MonthGrid = (() => {
  const dispatch = useDispatch();
  const tasks = useSelector<RootState, Task[]>(selectSearchedTasksSelector);
  const activeDate = useSelector<RootState, string>(activeDateSelector);
  const holidays = useSelector<RootState, StoredHoliday[]>(holidaysSelector);

  const getCurrentDayHolidays = (day: number) => {
    return holidays.filter((holiday) => moment(holiday.date).isSame(moment(activeDate).set('date', day)));
  }

  const handleCardDoubleClick = (day: number) => {
    dispatch(setActiveDate(moment(activeDate).set('date', day).format(DATE_FORMAT)));
    dispatch(changeTaskModalVisibility(true));
    dispatch(changeTaskModalMode('create'));
  }

  const getCurrentMonthTasks = () => {
    return tasks.filter((task) => moment(task.date).month() === moment(activeDate).month());
  };

  const getCurrentDayTasks = (tasks: Task[], day: number) => {
    return tasks.filter((task) => moment(task.date).date() === day);
  };

  const handleTaskDoubleClick = (task: Task, day: number) => {
    dispatch(updateActiveTaskId(task.id));
    dispatch(setActiveDate(moment(activeDate).set('date', day).format(DATE_FORMAT)));
    dispatch(changeTaskModalVisibility(true));
    dispatch(changeTaskModalMode('edit'));
  };

  const handleDragEnd = (result: DropResult) => {
    if(!result.destination) {
      return;
    }

    const task = tasks.find((task) => task.id === result.draggableId);

    if(Number(result.destination.droppableId) !== Number(result.source.droppableId) && task) {
      dispatch(updateTaskDate({
        id: result.draggableId,
        date: moment(task.date).set('date', Number(result.destination.droppableId)).format(DATE_FORMAT),
      }))
      return;
    }

    dispatch(switchTaskOrders({
      source: tasks[result.source.index].id,
      destination: tasks[result.destination?.index].id,
    }))
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container  columns={7}>
        {
          getMonthDaysByDate(activeDate).map((day) => (
            <Droppable
              key={day}
              droppableId={day.toString()}
              type='COLUMN'
              isCombineEnabled={true}
            >
              {
                (provided) => (
                  <Grid size={{ xs: 1 }}>
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className='test'
                    >
                      <DayCard
                        holidays={getCurrentDayHolidays(day)}
                        day={day}
                        tasks={getCurrentDayTasks(getCurrentMonthTasks(), day)}
                        onDayDoubleClick={handleCardDoubleClick}
                        onTaskDoubleClick={handleTaskDoubleClick}
                      />
                    </div>
                  </Grid>
                )
              }
            </Droppable>
          ))
        }
      </Grid>
    </DragDropContext>
  )
});