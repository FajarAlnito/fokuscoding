import { Card, CardContent, Box, Typography, Chip } from '@material-ui/core';
import {
	ExpandLess as ExpandLessIcon,
	ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import moment from 'moment';

const PostDetail = ({ post, content }) => {
	return (
		<Card>
			<CardContent>
				<Box display="flex" flexDirection="row" justifyContent="flex-start">
					<Box flexDirection="column" marginRight={3}>
						<ExpandLessIcon style={{ marginLeft: 3, cursor: 'pointer' }} />
						<Typography variant="h5" color="secondary" align="center">
							<Box fontWeight={600}>{0}</Box>
						</Typography>
						<Typography
							color="secondary"
							component="div"
							style={{ fontSize: 12 }}
							align="center"
						>
							<Box fontWeight={600} my="auto">
								VOTE
							</Box>
						</Typography>
						<ExpandMoreIcon style={{ marginLeft: 3, cursor: 'pointer' }} />
					</Box>
					<Box flexDirection="row" style={{ width: '100%' }}>
						<Box
							flexDirection="row"
							style={{
								borderBottom: '3px solid #707070',
								width: '80%',
								paddingBottom: 10,
							}}
						>
							<Box>
								{post.tags.map((tag) => (
									<Chip
										label={tag.name}
										key={tag.id}
										style={{
											backgroundColor: '#4CC9B040',
											color: '#4CC9B0',
											borderRadius: 0,
											margin: '0 3px',
										}}
									/>
								))}
							</Box>
							<Typography variant="h4">{post.title}</Typography>
							<Box flexDirection="column">
								<Typography
									variant="caption"
									style={{
										marginRight: 50,
										color: '#707070',
										fontStyle: 'italic',
									}}
								>
									Dibuat tanggal:{' '}
									{moment(new Date(post.createdAt)).format('DD-MM-YYYY')}
								</Typography>
								<Typography
									variant="caption"
									style={{ color: '#707070', fontStyle: 'italic' }}
								>
									Terakhir diperbarui: {moment(post.updatedAt).fromNow()}
								</Typography>
							</Box>
							<Typography
								variant="caption"
								style={{
									color: '#707070',
									fontStyle: 'italic',
								}}
							>
								Oleh: {post.username}
							</Typography>
						</Box>
						<Box mt={3} style={{ width: '80%' }}>
							{content}
						</Box>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};

export default PostDetail;
