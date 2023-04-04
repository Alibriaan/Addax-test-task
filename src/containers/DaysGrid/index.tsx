import { Grid } from '../../components/Grid';
import { DAYS } from '../../constants';

export function DaysGrid() {

  return (
    <Grid container columns={7}>
    {
      DAYS.map((day) => (
        <Grid
          item
          key={day}
          size={{ xs:1, md: 1, lg: 1, xl: 1 }}
          css={{ textAlign: 'center' }}
        >
          {day}
        </Grid>
      ))
    }
  </Grid>
  );
}