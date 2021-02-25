import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons'

export default function TecnhicalContact(data: any) {
  const traitData = () => {

    const values = [];
    for (let value in data.data['Technical Contact']) {
      values.push(`${value}: ${data.data['Technical Contact'][value]}`)
    }
    return values.map((value: any) => {
      return (
        <Typography>
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
        <Typography>Technical Contact</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Typography display='inline'>
          {traitData()}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}