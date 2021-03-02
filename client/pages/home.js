import {
	Drawer,
	List,
	ListItem,
	ListItemText,
	makeStyles,
	InputBase,
	Box,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import axios from 'axios';

const useStyles = makeStyles({
	paper: {
		background: '#4C72C9',
	},
});

const Home = ({ currentUser }) => {
	const classes = useStyles();
	return (
		<>
			<Drawer variant="permanent" classes={{ paper: classes.paper }}>
				<List>
					<ListItem>
						<ListItemText
							primary="Mulai Diskusi"
							style={{ color: 'white', textAlign: 'center' }}
						/>
					</ListItem>
					<ListItem style={{ margin: 'auto', width: '40%' }}>
						<ListItemText
							primary="User"
							style={{
								color: 'white',
								textAlign: 'center',
								border: '1px solid white',
								borderRadius: 100,
								padding: '5px 0',
							}}
						/>
					</ListItem>
					<ListItem>
						<Box px={0.3} style={{ position: 'relative' }}>
							<InputBase
								style={{
									width: 300,
									borderRadius: 50,
									backgroundColor: 'white',
									padding: '5px 15px',
								}}
								placeholder="Cari diskusi"
							/>
							<SearchIcon
								style={{
									position: 'absolute',
									top: '20%',
									right: '5%',
								}}
							/>
						</Box>
					</ListItem>
					<ListItem button>
						<ListItemText primary="Beranda" style={{ color: 'white' }} />
					</ListItem>
					<ListItem button>
						<ListItemText primary="Tags" style={{ color: 'white' }} />
					</ListItem>
					<ListItem button>
						<ListItemText primary="Diskusi saya" style={{ color: 'white' }} />
					</ListItem>
				</List>
			</Drawer>
		</>
	);
};

export const getServerSideProps = async ({ req }) => {
	const { data } = await axios.get(
		`${process.env.INGRESS_URI}/api/users/currentuser`,
		{
			headers: req.headers,
		}
	);
	console.log(data);
	if (!data.currentUser) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	return {
		props: {
			currentUser: data.currentUser,
		},
	};
};

export default Home;
