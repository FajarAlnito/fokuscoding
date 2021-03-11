import Layout from '../../components/Layout';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import TextInput from '../../components/TextInput';
import {
	FormGroup,
	FormControl,
	Box,
	Card,
	CardContent,
	CircularProgress,
} from '@material-ui/core';

import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import MyButton from '../../components/MyButton';
import Router from 'next/router';
import Toast from '../../components/Toast';
import { useDispatch } from 'react-redux';
import { open } from '../../redux/ducks/openload';

const createPost = () => {
	const dispatch = useDispatch();

	const validationSchema = yup.object({
		tags: yup.string().required('Tags name is required'),
		description: yup.string().required('Description is required'),
	});
	const { doRequest } = useRequest({
		url: '/api/tags',
		method: 'post',
		onSuccess: () =>
			setTimeout(() => {
				Router.push('/home');
			}, 2000),
	});
	const [loading, setLoading] = useState(false);

	return (
		<Layout currentUser={{ username: 'fajar' }}>
			<Card style={{ width: '80%', margin: 'auto' }}>
				<CardContent>
					<h1>Buat sebuah Tags</h1>

					<Toast severity="success">Tag berhasil dibuat, redirecting...</Toast>

					<Formik
						initialValues={{ tags: '', description: '' }}
						validationSchema={validationSchema}
						onSubmit={async (values, { resetForm, setSubmitting }) => {
							setSubmitting(false);
							setLoading(true);
							await doRequest({
								name: values.tags,
								description: values.description,
							});
							dispatch(open(true));
							setLoading(false);
							resetForm({});
						}}
					>
						<Form>
							<FormGroup>
								<FormControl margin={'dense'}>
									<TextInput label="Tags" name="tags" type="text" />
								</FormControl>
								<FormControl margin={'dense'}>
									<TextInput
										label="Description"
										name="description"
										type="text"
										multiline={true}
										rows={5}
										rowsMax={10}
									/>
								</FormControl>
								<Box ml="auto" mt={1}>
									<MyButton disabled={loading}>
										{loading ? <CircularProgress size={25} /> : 'Submit'}
									</MyButton>
								</Box>
							</FormGroup>
						</Form>
					</Formik>
				</CardContent>
			</Card>
		</Layout>
	);
};

export default createPost;
