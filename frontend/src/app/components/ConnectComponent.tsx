"use client";
import React, { useState, FormEvent } from "react";
import { TextField, Button, Container, Typography, Box,  FormControlLabel, Collapse, IconButton, RadioGroup, Radio, Checkbox } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const ConnectComponent: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName , setFirstName ] = useState("");
  const [lastName, setLastName ] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statut, setStatut]=useState("");
  const [siren, setSiren] = useState("");
  const [siret, setSiret ] = useState("");
  const [capital_social, setCapitalSocial ] = useState("");
  const [num_rcs, setNum_rcs] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    try {
      const endpoint = isRegister ? "/register" : "/login";
      const payload = isRegister
      ? { email, password, confirmPassword, firstName, lastName, statut, siren,siret, capital_social, num_rcs, acceptTerms }
      : { email, password };
      
          if (!acceptTerms) {
              alert("Vous devez accepter les termes et conditions.");
              return;
          }
          if (isRegister && password.length < 12) {
              alert("Le mot de passe doit contenir aumoins 8 caractères.");
              return;
          }
          if (isRegister && password !== confirmPassword) {
              alert("Les mots de passe ne correspondent pas.");
              return;
          }

        const response = await fetch(`${process.env.API_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        console.info("Réponse reçue:", response);
        
        const data = await JSON.parse(await response.json());
        console.log("Données transformées:", data);
        console.log("Réponse transformée:", data.data);

        if (response.status !== 201) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (isRegister) {
            console.log("Inscription réussie:", data);
        } else {
            localStorage.setItem("token", data.token);
            console.log("Connexion réussie, token:", data.token);
        }

    } catch (error) {
        console.error("Erreur lors de la requête:", error);
    }
};




  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 25, p: 3, boxShadow: 3, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          {isRegister ? "Create account" : "Sign in"}
        </Typography>
        <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              slotProps={{ inputLabel: { style: { color: 'white' } } }}
              required
            />
            <TextField
            label="Mot de passe"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{ inputLabel: { style: { color: 'white' } } }}
            required
          />
          {isRegister && (
              <div>
                <TextField
                  label="Confirmer le mot de passe"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  slotProps={{ inputLabel: { style: { color: 'white' } } }}
                  required
                />
                <TextField
                  label="Firstname"
                  type="text"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  slotProps={{ inputLabel: { style: { color: 'white' } } }}
                  required
                />
                <TextField
                  label="Lastname"
                  type="text"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  slotProps={{ inputLabel: { style: { color: 'white' } } }}
                  required
                />
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle1" sx={{ mr: 1 }}>Statut</Typography>
                <IconButton onClick={handleExpandClick} aria-expanded={expanded} aria-label="Statut">
                  <ExpandMoreIcon sx={{ color: "#03fca5" }}  />
                </IconButton>
              </Box>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <RadioGroup value={statut} onChange={(e) => setStatut(e.target.value)}>
                  <FormControlLabel value="free-lance" control={<Radio />} label="Free-lance" />
                  <FormControlLabel value="EI" control={<Radio />} label="EI" />
                  <FormControlLabel value="SARL" control={<Radio />} label="SARL" />
                  <FormControlLabel value="SASU" control={<Radio />} label="SASU" />
                </RadioGroup>
              </Collapse>
              {statut === "free-lance" && (
                <div>
                  <TextField label="Siren" type="text" variant="outlined" fullWidth margin="normal" required onChange={(e) => setSiren(e.target.value)} />
                </div>
              )}
              {statut === "EI" && (
                <div>
                  <TextField label="Siret" type="text" variant="outlined" fullWidth margin="normal" required onChange={(e) => setSiret(e.target.value)} />
                </div>
              )}
              {statut === "SARL" && (
                <div>
                  <TextField label="Numéro RCS" type="text" variant="outlined" fullWidth margin="normal" required  onChange={(e) => setNum_rcs(e.target.value)} />
                  <TextField label="Capital social" type="text" variant="outlined" fullWidth margin="normal" required  onChange={(e) => setCapitalSocial(e.target.value)} />
                </div>
              )}
              {statut === "SASU" && (
                <div>
                  <TextField label="Numéro RCS" type="text" variant="outlined" fullWidth margin="normal" required onChange={(e) => setNum_rcs(e.target.value)} /> 
                  <TextField label="Capital social" type="text" variant="outlined" fullWidth margin="normal" required onChange={(e) => setCapitalSocial(e.target.value)} />
                </div>
              )}
            </div>
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                color="success"
              />
            }
            label="I accept the terms and conditions"
          />
          <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
            {isRegister ? "Register" : "Sign in"}
          </Button>
        </form>
        <Button color="primary" onClick={() => setIsRegister(!isRegister)} sx={{ mt: 2 }}>
          {isRegister ? "Already have an account? Sign in" : "Create account"}
        </Button>
      </Box>
    </Container>
  );
};

export default  ConnectComponent;
