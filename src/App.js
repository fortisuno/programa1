import { Container, Typography } from '@mui/material';
import './App.css';
import HorizontalStepper from './components/HorizontalStepper';
import { View } from './components/View';

function App() {

	const integrantes = [
		'Hernández Ayala Oscar Uriel',
		'Ibarra Ibarra Alexis',
		'Gomez Garcia Jovani',
		'Gómez Morales Pablo Arturo',
	]

	return (
		<Container sx={{ p: '5rem'}}>
			<Typography variant="h2" component="div" align="center">
				Programa 1
			</Typography>
			<Typography variant="h3" component="div" align="center" sx={{mb: '4rem', color: 'primary.main'}}>
				Base64
			</Typography>
			<HorizontalStepper>
				<View/>
			</HorizontalStepper>
			<Typography variant="h6" component="div"  align="right" gutterBottom sx={{mt: '5rem'}}>
				Equipo 4
			</Typography>
			{integrantes.map(integrante => (
			<Typography variant="body1" component="div" align="right" sx={{color: 'text.secondary'}}>
				{integrante}
			</Typography>
			))}
		</Container>
	);
}

export default App;
