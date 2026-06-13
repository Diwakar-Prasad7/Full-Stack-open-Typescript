import { Entry } from "../../types";
import { Box, Card, CardContent, Typography } from "@mui/material";

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Box my={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography fontWeight="bold">
                {entry.date}
              </Typography>

              <Typography fontStyle="italic">
                {entry.description}
              </Typography>

              <Typography fontStyle="italic">
                Discharge: {entry.discharge.date} {entry.discharge.criteria}
              </Typography>

              <Typography variant="body2">
                diagnosed by {entry.specialist}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      );

    case "OccupationalHealthcare":
      return (
        <Box my={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography fontWeight="bold">
                {entry.date} — {entry.employerName}
              </Typography>

              <Typography fontStyle="italic">
                {entry.description}
              </Typography>

              <Typography fontStyle="italic">
                Employer Name: {entry.employerName}
              </Typography>

              <Typography variant="body2">
                diagnosed by {entry.specialist}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      );

    case "HealthCheck":
      return (
        <Box my={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography fontWeight="bold">
                {entry.date}
              </Typography>

              <Typography fontStyle="italic">
                {entry.description}
              </Typography>

              <Typography fontStyle="italic">
                Health Check Ratings: {entry.healthCheckRating}
              </Typography>

              <Typography variant="body2">
                diagnosed by {entry.specialist}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      );

    default:
      return assertNever(entry);
  }
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

export default EntryDetails;