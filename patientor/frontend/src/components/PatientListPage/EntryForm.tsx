import { useState } from "react";
import patientService from '../../services/patients';
import { useParams } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button
} from "@mui/material";
import { HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry, Patient } from "../../types";

interface Diagnosis {
  code: string;
  name: string;
}

interface Props {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  diagnoses: Diagnosis[];
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const EntryForm = ({ setShowForm, diagnoses, setPatient }: Props) => {
  const [type, setType] = useState<
    "Hospital" | "OccupationalHealthcare" | "HealthCheck"
  >("Hospital");

  const [formData, setFormData] = useState({
    description: "",
    date: "",
    specialist: "",
    employerName: "",
    dischargeDate: "",
    dischargeCriteria: "",
    healthCheckRating: ""
  });

  const { id } = useParams<{ id: string }>();

  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [notification, setNotification] = useState('');

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!id) {
    setNotification("Missing patient id");
    return;
  }

  try {
    let newEntry;

    if (type === "Hospital") {
      const payload: Omit<HospitalEntry, "id"> = {
        type: "Hospital",
        description: formData.description,
        date: formData.date,
        specialist: formData.specialist,
        diagnosisCodes: diagnosisCodes.length ? diagnosisCodes : undefined,
        discharge: {
          date: formData.dischargeDate,
          criteria: formData.dischargeCriteria,
        },
      };

      newEntry = await patientService.createNewEntry(id, payload);
    }

    if (type === "OccupationalHealthcare") {
      const payload: Omit<OccupationalHealthcareEntry, "id"> = {
        type: "OccupationalHealthcare",
        description: formData.description,
        date: formData.date,
        specialist: formData.specialist,
        diagnosisCodes: diagnosisCodes.length ? diagnosisCodes : undefined,
        employerName: formData.employerName,
      };

      newEntry = await patientService.createNewEntry(id, payload);
    }

    if (type === "HealthCheck") {
      const rating = Number(formData.healthCheckRating);
      const payload: Omit<HealthCheckEntry, "id"> = {
        type: "HealthCheck",
        description: formData.description,
        date: formData.date,
        specialist: formData.specialist,
        diagnosisCodes: diagnosisCodes.length ? diagnosisCodes : undefined,
        healthCheckRating: rating as HealthCheckRating,
      };

      newEntry = await patientService.createNewEntry(id, payload);
    }

    if (!newEntry) return;

    setPatient(prev =>
      prev
        ? { ...prev, entries: prev.entries?.concat(newEntry) }
        : prev
    );

    setNotification("Entry added successfully");
    setShowForm(false);

    setTimeout(() => setNotification(""), 3000);
  } catch (error) {
    console.error(error);
    setNotification("Failed to add entry");

    setTimeout(() => setNotification(""), 3000);
  }
};

  return (
    <Box display="flex" justifyContent="center" mt={3}>
      <Paper elevation={5} sx={{ padding: 3, width: 450, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          New Entry
        </Typography>
        {notification && (
          <Box sx={{ mb: 2, color: "red" }}>
            {notification}
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={handleChange("description")}
            margin="dense"
          />

          <TextField
            fullWidth
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={handleChange("date")}
            margin="dense"
          />

          <TextField
            fullWidth
            label="Specialist"
            value={formData.specialist}
            onChange={handleChange("specialist")}
            margin="dense"
          />

          <TextField
            select
            fullWidth
            label="Diagnosis Codes"
            SelectProps={{
              multiple: true,
              value: diagnosisCodes,
              onChange: (e) =>
                setDiagnosisCodes(e.target.value as string[])
            }}
            margin="dense"
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code} — {d.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            label="Entry Type"
            value={type}
            onChange={(e) =>
              setType(
                e.target.value as
                  | "Hospital"
                  | "OccupationalHealthcare"
                  | "HealthCheck"
              )
            }
            margin="dense"
          >
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
            <MenuItem value="HealthCheck">Health Check</MenuItem>
          </TextField>

          {type === "Hospital" && (
            <>
              <TextField
                fullWidth

                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.dischargeDate}
                onChange={handleChange("dischargeDate")}
                margin="dense"
              />

              <TextField
                fullWidth
                label="Discharge Criteria"
                value={formData.dischargeCriteria}
                onChange={handleChange("dischargeCriteria")}
                margin="dense"
              />
            </>
          )}

          {type === "OccupationalHealthcare" && (
            <TextField
              fullWidth
              label="Employer Name"
              value={formData.employerName}
              onChange={handleChange("employerName")}
              margin="dense"
            />
          )}

          {type === "HealthCheck" && (
            <TextField
              select
              fullWidth
              label="Health Check Rating"
              value={formData.healthCheckRating}
              onChange={handleChange("healthCheckRating")}
              margin="dense"
            >
              <MenuItem value={0}>Healthy (0)</MenuItem>
              <MenuItem value={1}>Low Risk (1)</MenuItem>
              <MenuItem value={2}>High Risk (2)</MenuItem>
              <MenuItem value={3}>Critical (3)</MenuItem>
            </TextField>
          )}

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>

            <button type="submit">Add</button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EntryForm;