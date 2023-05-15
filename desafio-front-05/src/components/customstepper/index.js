import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import './styles.css';
import verde from '../../assets/stepicongreen.svg'
import branco from '../../assets/stepiconwhite.svg'
import sucesso from '../../assets/stepiconsucess.svg'



const steps = [
    {
        label: 'Cadastre-se',
        description: `Por favor, escreva seu nome e e-mail`,
    },
    {
        label: 'Escolha uma senha',
        description:
            'Escolha uma senha segura',
    },
    {
        label: 'Cadastro realizado com sucesso',
        description: `E-mail e senha cadastrados com sucesso`,
    },
];

function iconVerde() {
    return (
        <img src={verde}></img>
    )
}

function iconBranco() {
    return (
        <img src={branco}></img>
    )
}

function iconConcluido() {
    return (
        <img src={sucesso}></img>
    )
}

export default function VerticalLinearStepper({ stepNumber }) {
    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={stepNumber} orientation="vertical">
                <Step key={steps[0].label}>
                    <StepLabel StepIconComponent={stepNumber === 0 ? iconVerde : iconConcluido} >
                        {steps[0].label}
                    </StepLabel>
                    <StepContent>
                        <Typography>{steps[0].description}</Typography>
                    </StepContent>
                </Step>
                <Step key={steps[1].label}>
                    <StepLabel StepIconComponent={stepNumber === 1 ? iconVerde : stepNumber === 0 ? iconBranco : iconConcluido} >
                        {steps[1].label}
                    </StepLabel>
                    <StepContent>
                        <Typography>{steps[1].description}</Typography>
                    </StepContent>
                </Step>
                <Step key={steps[2].label}>
                    <StepLabel StepIconComponent={stepNumber === 2 ? iconVerde : stepNumber <= 2 ? iconBranco : iconConcluido} >
                        {steps[2].label}
                    </StepLabel>
                    <StepContent>
                        <Typography>{steps[2].description}</Typography>
                    </StepContent>
                </Step>

                {/* {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel StepIconComponent={iconVerde} >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                        </StepContent>
                    </Step>
                ))} */}
            </Stepper>

        </Box>
    );
}