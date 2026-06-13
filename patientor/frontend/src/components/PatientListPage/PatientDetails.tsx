import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Diagnosis, Patient } from "../../types";
import EntryDetails from "./EntryDetails";
import EntryForm from "./EntryForm";
import axios from "axios";
import { apiBaseUrl } from "../../constants";


const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;

      const patientData = await patientService.getById(id);
      setPatient(patientData);
    };
    void fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
      setDiagnoses(data);
    }; 
    fetchDiagnoses();
  }, []);


  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <div>gender: {patient.gender}</div>
      <div>date of birth: {patient.dateOfBirth}</div>
      <div><h3>Entries: </h3>
      {patient.entries?.map(entry => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}</div>
      <div>
        {!showForm && (
          <button onClick={() => setShowForm(true)}>Add New Entry</button>
        )}
        {showForm && <EntryForm diagnoses={diagnoses} setShowForm={setShowForm} setPatient={setPatient} />}
      </div>
    </div>
  );
};

export default PatientDetailsPage;