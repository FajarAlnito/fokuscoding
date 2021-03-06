import {
	Typography,
	Box,
	makeStyles,
	Container,
	Card,
	CardContent,
	CircularProgress,
	FormGroup,
	FormControl,
	Button,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import NextLink from 'next/link';
import { useRouter, Router } from 'next/router';
import useRequest from '../hooks/use-request';
import { useState } from 'react';
import TextInput from './TextInput';

import { useDispatch } from 'react-redux';
import { open } from '../redux/ducks/openload';
import Toast from './Toast';

const useStyles = makeStyles((theme) => ({
	registerButton: {
		color: theme.palette.common.white,
		width: theme.spacing(20),
		borderRadius: 10,
		fontWeight: 'bold',
		fontSize: 16,
	},
	cardMargin: {
		marginTop: theme.spacing(3.5),
	},
	registerLogo: {
		fontSize: 35,
		textAlign: 'center',
	},
	registerFooterTypography: {
		textAlign: 'center',
		color: '#919191',
	},
	login: {
		textDecoration: 'underline',
		cursor: 'pointer',
	},
	input: {
		marginTop: theme.spacing(3),
		backgroundColor: '#00000012',
		borderRadius: 4,
		padding: theme.spacing(0.3, 2),
		width: 'auto',
		'&.Mui-error': {
			border: 'solid 1px #FF7171',
		},
	},
	error: {
		color: '#FF0D39',
	},
	formPad: {
		margin: theme.spacing(1, 0),
	},
	circular: {
		position: 'absolute',
		right: '39%',
		top: '35%',
	},
	wrapper: {
		position: 'relative',
	},
}));

const RegisterForm = () => {
	const classes = useStyles();
	const validationSchema = yup.object({
		email: yup
			.string('Enter your email')
			.email('Enter a valid email')
			.required('Email is required'),
		password: yup
			.string('Enter your password')
			.min(4, 'Password should be of minimum 4 characters')
			.max(20, 'Password should be of maximum 20 characters')
			.required('Password is required'),
		username: yup
			.string('Enter your username')
			.min(4, 'Username should be of minimum 4 characters')
			.max(20, 'Username should be of maximum 20 characters')
			.required('Username is required'),
	});
	const router = useRouter();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const { doRequest } = useRequest({
		url: '/api/users/signup',
		method: 'post',
		onSuccess: () =>
			setTimeout(async () => {
				await router.push('/home');
				dispatch(open(false));
			}, 1000),
	});

	return (
		<Card className={classes.cardMargin}>
			<Toast severity="success">Register success, redirecting...</Toast>
			<CardContent>
				<Typography
					component="div"
					className={classes.registerLogo}
					color="secondary"
				>
					<Box fontWeight={600}>Register</Box>
				</Typography>
				<Container maxWidth="xs">
					<Formik
						initialValues={{ email: '', username: '', password: '' }}
						validationSchema={validationSchema}
						onSubmit={async (values, { resetForm }) => {
							setLoading(true);
							await doRequest(values);
							dispatch(open(true));
							setLoading(false);
						}}
					>
						<Form>
							<FormGroup>
								<FormControl className={classes.formPad}>
									<TextInput label="Email" name="email" type="email" />
								</FormControl>
								<FormControl className={classes.formPad}>
									<TextInput label="Username" name="username" />
								</FormControl>
								<FormControl className={classes.formPad}>
									<TextInput label="Password" name="password" type="password" />
								</FormControl>
								<Box m="auto" pt={3} pb={2} className={classes.wrapper}>
									<Button
										variant="contained"
										color="secondary"
										className={classes.registerButton}
										size="small"
										type="submit"
										disabled={loading}
									>
										REGISTER
									</Button>
									{loading && (
										<CircularProgress
											size={30}
											color="secondary"
											className={classes.circular}
										/>
									)}
								</Box>
								<Box className={classes.registerFooterTypography}>
									<Typography
										variant="caption"
										component="div"
										display="inline"
									>
										Or{' '}
									</Typography>
									<NextLink href="/">
										<Typography
											variant="caption"
											component="div"
											display="inline"
											className={classes.login}
										>
											Login
										</Typography>
									</NextLink>
								</Box>
							</FormGroup>
						</Form>
					</Formik>
				</Container>
			</CardContent>
		</Card>
	);
};

export default RegisterForm;
