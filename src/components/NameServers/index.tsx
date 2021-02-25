import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons'

export default function NameServers(data: any) {
  const traitData = () => {

    const values = [];
    for (let value in data.data['Name Servers']) {
      values.push(`${value}: ${data.data['Name Servers'][value]}`)
    }
    return values.map((value: any) => {
      return (
        <Typography component={'span'} key={value}>
          {value}
        </Typography>
      )
    });
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Name Servers</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Typography component={'span'} display='inline'>
          {traitData()}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}