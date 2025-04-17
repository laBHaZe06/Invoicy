"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  CircularProgress,
} from "@mui/material";

const ConnectComponent: React.FC = () => {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statut, setStatut] = useState("");
  const [siren, setSiren] = useState("");
  const [siret, setSiret] = useState("");
  const [capital_social, setCapitalSocial] = useState("");
  const [num_rcs, setNum_rcs] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");



  const textFieldProps = {
    fullWidth: true,
    margin: "normal" as const,
    InputLabelProps: {
      style: { color: "white" },
    },
    InputProps: {
      style: { color: "white", borderColor: "white" },
    },
  };

  const nextStep = () => {
    if (step === 1) {
      if (password.length < 12) return alert("Le mot de passe doit contenir au moins 12 caractères.");
      if (password !== confirmPassword) return alert("Les mots de passe ne correspondent pas.");
    }
    if (step === 3 && !acceptTerms) {
      return alert("Vous devez accepter les termes et conditions.");
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const endpoint = isRegister ? "/register" : "/login_check";
      const payload = isRegister
        ? { email, password, confirmPassword, firstName, lastName, statut, siren, siret, capital_social, num_rcs, acceptTerms }
        : { username: email, password };

      const response = await fetch(`${process.env.API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status !== 200 && response.status !== 201) throw new Error(`HTTP error! status: ${response.status}`);

      if (isRegister) {
        setSuccessMessage("Inscription réussie ! Vérifier vos emails pour confirmer votre compte.");
      } else {
        localStorage.setItem("token", data.token);
        setSuccessMessage("Connexion réussie !");
        setTimeout(() => router.push("/admin/"), 1200);
      }
    } catch (e) {
      console.info(e);
      setErrorMessage("Erreur lors de la requête.");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <TextField label="Email"  type="email" required value={email} onChange={(e) => setEmail(e.target.value)} {...textFieldProps} />
            <TextField label="Mot de passe" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} {...textFieldProps} />
            <TextField label="Confirmer le mot de passe" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} {...textFieldProps} />
          </>
        );
      case 2:
        return (
          <>
            <TextField label="Firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} {...textFieldProps} />
            <TextField label="Lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} {...textFieldProps} />
            <Typography sx={{ color: 'white', mt: 2 }}>Statut</Typography>
            <RadioGroup value={statut} onChange={(e) => setStatut(e.target.value)}>
              <FormControlLabel value="free-lance" control={<Radio />} label="Free-lance" />
              <FormControlLabel value="EI" control={<Radio />} label="EI" />
              <FormControlLabel value="SARL" control={<Radio />} label="SARL" />
              <FormControlLabel value="SASU" control={<Radio />} label="SASU" />
            </RadioGroup>
          </>
        );
      case 3:
        return (
          <>
            {statut === "free-lance" && (
              <TextField label="Siren" required value={siren} onChange={(e) => setSiren(e.target.value)} {...textFieldProps} />
            )}
            {statut === "EI" && (
              <TextField label="Siret" required value={siret} onChange={(e) => setSiret(e.target.value)} {...textFieldProps} />
            )}
            {(statut === "SARL" || statut === "SASU") && (
              <>
                <TextField label="Numéro RCS" required value={num_rcs} onChange={(e) => setNum_rcs(e.target.value)} {...textFieldProps} />
                <TextField label="Capital social" required value={capital_social} onChange={(e) => setCapitalSocial(e.target.value)} {...textFieldProps} />
              </>
            )}
            <FormControlLabel control={<Checkbox checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />} label={<span style={{ color: 'white' }}>J&lsquo;accepte les conditions générales</span>} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 25, p: 3, boxShadow: 3, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
          {isRegister ? "Create account" : "Sign in"}
        </Typography>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        {successMessage && <Typography sx={{ color: 'lightgreen' }}>{successMessage}</Typography>}

        <form onSubmit={handleSubmit} role="form">
          {isRegister ? renderStepContent() : (
            <>
              <TextField 
              label="Email" 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} {...textFieldProps}
              style={{color: 'text.primary !important'}}/>
              <TextField 
              label="Mot de passe" 
              type="password" 
              required 
              value={password} onChange={(e) => setPassword(e.target.value)} {...textFieldProps}
              sx={{color: 'text.primary'}}/>
            </>
          )}

          {isRegister && (
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              {step > 1 && <Button onClick={prevStep}>Précédent</Button>}
              {step < 3 ? (
                <Button variant="contained" onClick={nextStep}>Suivant</Button>
              ) : (
                <Button type="submit" variant="contained" color="success" disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : "Valider"}
                </Button>
              )}
            </Box>
          )}

          {!isRegister && (
            <Button type="submit" variant="contained" color="info" fullWidth sx={{ mt: 2 }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Sign in"}
            </Button>
          )}
        </form>

        <Button color="secondary" onClick={() => { setIsRegister(!isRegister); setStep(1); }} sx={{ mt: 2, fontWeight: 750 }}>
          {isRegister ? "Already have an account? Sign in" : "Create account"}
        </Button>
      </Box>
    </Container>
  );
};

export default ConnectComponent;
