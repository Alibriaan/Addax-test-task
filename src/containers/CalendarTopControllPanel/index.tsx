import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Stack } from '../../components/Stack';
import { increaseDateByMonth, decreaseDateByMonth } from '../../store/slices/calendar';
import { useDispatch } from 'react-redux';
import { downloadHtmlElementAsImage } from '../../services/calendarDownload';


interface CallendarTopControllPanelProps {
  calendarId: string;
}

export function CallendarTopControllPanel(props: CallendarTopControllPanelProps) {
  const dispatch = useDispatch();
  const increaseDate = () => dispatch(increaseDateByMonth(1));
  const decreaseDate = () => dispatch(decreaseDateByMonth(1));
  const downloadCalendar = () => downloadHtmlElementAsImage(props.calendarId, 'calendar.jpg');

  return (
    <Card className='top-controll-pannel' variant='paper'>
      <Stack
        flexDirection='row'
        spacing={5}
        justifyContent='space-around'
        alignItems={'center'}
        css={{ padding: '10px 20px' }}
      >
        <Stack flexDirection='row' spacing={10}>
          <Button variant='paper' onClick={downloadCalendar}>Download calendar</Button>
          <Button variant='paper' onClick={increaseDate}>Up</Button>
          <Button variant='paper' onClick={decreaseDate}>Down</Button>
        </Stack>
        <Stack flexDirection='row' spacing={10}>
          <Button variant='paper' disabled>Week</Button>
          <Button variant='paper' disabled>Month</Button>
        </Stack>
      </Stack>
    </Card>
  );
}