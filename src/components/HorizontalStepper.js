import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

const steps = ['Texto plano', 'Encriptado', 'Desencriptado'];

export const StepperContext = React.createContext();

export default function HorizontalStepper({children}) {
	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleComplete = () => {
		setActiveStep(steps.length)
	}

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			{activeStep === steps.length ? (
				<React.Fragment>
					<StepperContext.Provider value={{ activeStep }}>
						{children}
					</StepperContext.Provider>
					<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
						<Box sx={{ flex: '1 1 auto' }} />
						<Button onClick={handleReset}>Volver a empezar</Button>
					</Box>
				</React.Fragment>
			) : (
				<React.Fragment>
					<StepperContext.Provider value={{ activeStep }}>
						{children}
					</StepperContext.Provider>
					<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
						<Button
							color="inherit"
							disabled={activeStep === 0}
							onClick={handleBack}
							sx={{ mr: 1 }}
						>
						Regresar
						</Button>
						<Box sx={{ flex: '1 1 auto' }} />
						{activeStep === 0 ? (
							<Button onClick={handleNext} variant="contained">Encriptar</Button>
							) : (
							<Button onClick={handleComplete} variant="contained">Desencriptar</Button>
						) }
					</Box>
				</React.Fragment>
			)}
		</Box>
	);
}
