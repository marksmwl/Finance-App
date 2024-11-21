import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';



export default function Signup() {
  const navigate = useNavigate()

  const [email, setEmail] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [pass, setPass] = React.useState('')

  const [activeStep, setActiveStep] = React.useState(0);
  const [emailValid, setEmailValid] = React.useState(false)
  const [usernameValid, setUsernameValid] = React.useState(false)
  const [passwordValid, setPasswordValid] = React.useState(false)

  const apiUri = process.env.REACT_APP_API_URI;

  const backHome = () => {
    navigate("/");
  }


  const steps = [
    {
      description: <TextField
      onChange={handleEmail}/>,
      label: 'Email',
    
    },
    {
      description:
      <TextField
      onChange={handleUserName}/>,
      label: 'Username',
      
    
    },
    {
      description: 
          <TextField
          onChange={handlePassword}/>,
      label: 'Password',
      
    },
  ];

  function handlePassword(e) {
    const value = e.target.value
    if (value.length >= 6) {
      setPass(value)
      setPasswordValid(true)
    }
    else {
      setPasswordValid(false)
    }
  }

  function handleUserName(e) {
    const value = e.target.value
    if (value.length >= 1 && value) {
      setUsername(value)
      setUsernameValid(true)
    }
    else {
      setUsernameValid(false)
    }
  }

  function handleEmail(e) {
    const value = e.target.value
    const regex = (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)

    if (!(value.includes('"','{','}', "'")) && regex.test(value)) {
      setEmail(value)
      setEmailValid(true)
    }
    else {
      setEmailValid(false)
    }
  }

  const handleNext = (e) => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

   async function handleFinish() {
    try {
      const formData = {
        username: username,
        password: pass,
        email: email
      };
  
      const response = await fetch(`${apiUri}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.status === 201) {
        navigate('/'); 
      }

      else if (!response.ok) {
        throw new Error('Network response was not ok');
      }  

    } catch (error) {
      console.error('Error registering user:', error);
    }
  }

  return (
    <>
        <h1 className='text-2xl mb-4 font-semibold'>Register</h1>

        <div className='bg-white p-10 rounded-xl'>
            <Box sx={{ maxWidth: 400 }}>
        
            <span
                className="material-symbols-outlined text-3xl cursor-pointer -ml-5"
                onClick={backHome}
                >
                arrow_back
                </span>
        
        <Stepper  activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
            <Step key={step.label}>
                <StepLabel
                optional={
                    index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                    ) : null
                }
                >
                {step.label}
                </StepLabel>
                <StepContent>
                {step.description}
                <Box sx={{ mb: 2 }}>
                    <div>

                    <Button
                        
                        variant="contained"
                        onClick={index === steps.length - 1 ? handleFinish : handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={!(step.label === 'Email' ? emailValid : step.label === 'Username' ? usernameValid : passwordValid)}
                    >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    
                    <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Back
                    </Button>
                    </div>
                </Box>
                </StepContent>
            </Step>
            ))}
        </Stepper>
        </Box>
        </div>
    </>
    
  );

  
}