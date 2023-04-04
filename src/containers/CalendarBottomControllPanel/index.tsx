import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/Button';
import { Stack } from '../../components/Stack';
import { downloadCalendarConfigAsJson } from '../../services/calendarDownload';
import { RootState, selectSearchedTasksSelector } from '../../store';
import { updateTasks } from '../../store/slices/tasks';
import { CalendarConfig } from '../../types/calendar-config.types';
import { Task } from '../../types/task.types';
import { UploadFileButton } from '../UploadFileButton';

export function CalendarBottomControllPanel() {
  const dispatch = useDispatch();

  const tasks = useSelector<RootState, Task[]>(selectSearchedTasksSelector);

  const exportCalendarToJson = () => {
    downloadCalendarConfigAsJson({ tasks }, 'calendar.json');
  };

  const uploadCalendarJson = async (file: File) => {
    const fileText = await file.text();

    if(!fileText) {
      return;
    }

    const config = JSON.parse(fileText) as CalendarConfig;

    dispatch(updateTasks(config.tasks));
  }


  return (
    <Stack
      flexDirection='row'
      justifyContent='flex-end'
      alignItems='center'
      spacing={15}
      css={{ padding: '10px'}}
    >
      <Button variant='paper' onClick={exportCalendarToJson}>Export to JSON</Button>
      <UploadFileButton onFileUpload={uploadCalendarJson} placeholder='Import from JSON' />
    </Stack>
  )

};