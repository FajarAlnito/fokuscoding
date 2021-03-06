import {
	NotAuthorizedError,
	NotFoundError,
	requireAuth,
} from '@heapoverflow/common';
import express, { Request, Response } from 'express';
import { PostDeletedPublisher } from '../../events/publishers/post-deleted-publisher';
import { Post, PostDoc } from '../../models/Post';
import { natsWrapper } from '../../nats-wrapper';

const router = express.Router();

router.delete(
	'/api/posts/:post_id',
	requireAuth,
	async (req: Request, res: Response) => {
		const { post_id } = req.params;
		// find post by Id
		const post: PostDoc = await Post.findById(post_id);

		// make sure if the post is exist
		if (!post) {
			throw new NotFoundError();
		}

		// make sure if the post is made by the user or is an admin
		if (
			req.currentUser!.username !== post.username &&
			!req.currentUser!.admin
		) {
			throw new NotAuthorizedError();
		}

		// remove the post
		post.remove();

		let tagList: string[] | undefined = post.tags?.map((tag) => tag.id);
		if (!tagList) {
			tagList = [];
		}

		await new PostDeletedPublisher(natsWrapper.client).publish({
			id: post.id,
			tags: tagList,
		});

		res.status(204).send(post);
	}
);

export { router as deletePostRouter };
