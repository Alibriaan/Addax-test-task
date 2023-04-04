import { Container } from './components/Container';
import { Stack } from './components/Stack';
import { CalendarBottomControllPanel } from './containers/CalendarBottomControllPanel';
import { CallendarTopControllPanel } from './containers/CalendarTopControllPanel';
import { DaysGrid } from './containers/DaysGrid';
import { MonthGrid } from './containers/MonthGrid';
import { TaskModal } from './containers/TaskModal';
import { useSelector } from 'react-redux';
import { RootState, store } from './store';
import { useEffect } from 'react';
import { fetchWorldwideHolidays } from './store/slices/holidays';
import { useDispatch } from 'react-redux';
import { Input } from './components/Input';
import { updateSearhQuery } from './store/slices/tasks';
import { titleActiveDateSelector } from './store/selectors/calendar';
import { CalendarTitle } from './components/CalendarTitle';

function App() {
  const dispatch = useDispatch<typeof store.dispatch>();
  const titleActiveDate = useSelector<RootState, string>(titleActiveDateSelector);

  const handleSearchTaskQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearhQuery(event.target.value));
  };

  useEffect(() => {
    dispatch(fetchWorldwideHolidays());
  }, []);

  return (
    <div className="App">
      <Stack spacing={15}>
        <CallendarTopControllPanel calendarId='calendar' />
        <main>
          <Input
            placeholder='Search Task'
            onChange={handleSearchTaskQueryChange}
            css={{
              width: '95%',
              margin: '0 auto',
              display: 'block',
            }}
          />
          <Container css={{ padding: '10px'}}
            id='calendar'
            className='calendar-section'
          >
            <Container css={{ padding: '10px', textAlign: 'center' }}>
              <CalendarTitle>
                { titleActiveDate }
              </CalendarTitle>
            </Container>
            <DaysGrid />
            <MonthGrid />
          </Container>
          <CalendarBottomControllPanel />
          <TaskModal />
        </main>
      </Stack>
    </div>
  );
}

export default App;
