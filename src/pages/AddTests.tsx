import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import createTypography from "@mui/material/styles/createTypography";
import { flexbox, height, width } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import useAuth from "../hooks/useAuth";
import api, {
  Category, Discipline,
} from "../services/api";

const styles = {
  container: {
    width: "460px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  title: { 
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px" 
  },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "16px",
    marginBottom: "26px",
  },
  input: { 
    marginBottom: "16px",
    width: "514px"
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}

interface FormData {
  testName: string;
  pdfUrl: string;
  categoryId: string;
  disciplineId: string;
  instructorId: string
}

const disciplines = [
  "algebra",
  "portugues"
]

const instructors = [
  "maria",
  "joao"
]

function AddTests(){
  const navigate = useNavigate();
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [formData, setFormData] = useState<FormData>({
    testName: "",
    pdfUrl: "",
    categoryId: "",
    disciplineId: "",
    instructorId: ""
  });

  useEffect(() => {
    async function loadPage() {
      if (!token) return;

      const { data: categoriesData } = await api.getCategories(token);
      setCategories(categoriesData.categories);
      const { data: disciplinesData } = await api.getDisciplines(token);
      setDisciplines(disciplinesData.disciplines);
    }
    loadPage();
  }, [token]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {}

  const categoriesOptions = categories?.map((category) => {
    return {
      id: category.id,
      label: category.name
    };
  });

  const disciplinesOptions = disciplines?.map((discipline) => {
    return {
      id: discipline.id,
      label: discipline.name
    };
  });

  return (
    <>
      <Typography sx={styles.title} variant="h4" component="h1">
      Adicione uma prova
        </Typography>
      <Divider sx={{ marginBottom: "35px" }} />
      <Box
        sx={{
          marginX: "auto",
          width: "700px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/app/disciplinas")}
          >
            Disciplinas
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/app/pessoas-instrutoras")}
          >
            Pessoa Instrutora
          </Button>
          <Button variant="contained" onClick={() => navigate("/app/adicionar")}>
            Adicionar
          </Button>
        </Box>
      </Box>
      <Form onSubmit={handleSubmit}>
      <Box sx={styles.container}>
        <TextField
          name="testName"
          sx={styles.input}
          label="Título da prova"
          type="text"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.testName}
        />
        <TextField
          name="pdfUrl"
          sx={styles.input}
          label="PDF da prova"
          type="text"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.pdfUrl}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={categoriesOptions}
          sx={styles.input}
          renderInput={(params) => <TextField {...params} label="Categoria" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={disciplinesOptions}
          sx={styles.input}
          renderInput={(params) => <TextField {...params} label="Disciplina" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={instructors}
          sx={styles.input}
          renderInput={(params) => <TextField {...params} label="Pessoa Instrutora" />}
        />
        
        <Box sx={styles.actionsContainer}>
          <Button variant="contained" type="submit">
            Enviar
          </Button>
        </Box>
      </Box>
      </Form>
    </>
  );
}

export default AddTests;