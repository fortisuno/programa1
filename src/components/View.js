import React, { useCallback, useContext, useState, useEffect } from "react";
import { StepperContext } from "./HorizontalStepper";
import Box from "@mui/material/Box";
import { Typography, TextField } from "@mui/material";
import CryptoJS from "crypto-js";

const TextoPlano = ({ value, handleChange, handleReset }) => {
	useEffect(() => {
		handleReset();
	}, []);

	return (
		<React.Fragment>
			<Typography variant="h6" sx={{ mb: 3 }}>
				Introduce un texto plano
			</Typography>
			<TextField
				id="outlined-multiline-flexible"
				label="Texto Plano"
				multiline
				maxRows={4}
				value={value}
				onChange={handleChange}
				fullWidth
			/>
		</React.Fragment>
	);
};

const Encriptado = ({ value, handleChange }) => {
	const { textPlain, encrypted } = value;

	useEffect(() => {
		handleChange(textPlain);
	}, [textPlain, handleChange]);

	return (
		<React.Fragment>
			<Typography variant="h6" sx={{ mb: 3 }}>
				¡El texto plano ha sido encriptado con éxito!
			</Typography>
			<Box sx={{}}>
				<Typography
					variant="body1"
					component="div"
					sx={{ p: 3, backgroundColor: "#f5f5f5", borderRadius: "10px" }}
				>
					{encrypted.length > 0 ? encrypted : "No se ha introducido un texto plano..."}
				</Typography>
			</Box>
		</React.Fragment>
	);
};

const Desencriptado = ({ value, handleChange }) => {
	const { encrypted, decrypted } = value;

	useEffect(() => {
		handleChange(encrypted);
	}, [encrypted, handleChange]);

	return (
		<React.Fragment>
			<Typography variant="h6" sx={{ mb: 3 }}>
				¡Se ha recuperado el texto plano con éxito!
			</Typography>
			<Box sx={{}}>
				<Typography
					variant="body1"
					component="div"
					sx={{ p: 3, backgroundColor: "#f5f5f5", borderRadius: "10px" }}
				>
					{decrypted.length > 0 ? decrypted : "No se puede desencriptar..."}
				</Typography>
			</Box>
		</React.Fragment>
	);
};

export const View = () => {
	const { activeStep } = useContext(StepperContext);

	const [textPlain, setTextPlain] = useState("");
	const [encrypted, setEncrypted] = useState("");
	const [decrypted, setDecrypted] = useState("");

	const encrypt = (textPlain) => {
		const utf8 = CryptoJS.enc.Utf8.parse(textPlain);
		const base64 = CryptoJS.enc.Base64.stringify(utf8);
		setEncrypted(base64);
	};

	const decrypt = (encrypted) => {
		const base64 = CryptoJS.enc.Base64.parse(encrypted);
		const utf8 = CryptoJS.enc.Utf8.stringify(base64);
		setDecrypted(utf8);
	};

	const handleTextPlain = useCallback(
		(e) => {
			setTextPlain(e.target.value);
		},
		[setTextPlain]
	);

	const handleEncrypted = useCallback(encrypt, [setEncrypted]);

	const handleDecrypted = useCallback(decrypt, [setDecrypted]);

	return (
		<Box sx={{ px: 1, py: 5 }}>
			{activeStep === 0 ? (
				<TextoPlano
					value={textPlain}
					handleChange={handleTextPlain}
					handleReset={() => setTextPlain("")}
				/>
			) : activeStep === 1 ? (
				<Encriptado value={{ textPlain, encrypted }} handleChange={handleEncrypted} />
			) : (
				<Desencriptado value={{ encrypted, decrypted }} handleChange={handleDecrypted} />
			)}
		</Box>
	);
};
