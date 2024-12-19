import React from 'react';
import { useSelector } from 'react-redux'; 

export default function Posts() {
    const posts = useSelector((state) => state.posts.posts); // Access posts from the Redux store
    const [showComments, setShowComments] = React.useState(false); // Local state to show/hide comments

    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <h2>{post.title}</h2>
                    {post.image && <img src={post.image} alt={post.title} />}
                    <p>{post.content}</p>
                    <button onClick={setShowComments(!showComments)}>Comments: {post.num_comments}</button>
                    <p>Subreddit: {post.subreddit}</p>
                    {showComments && (
                        <ul>
                            {post.comments.slice(0, 5).map((comment) => (
                                <li key={comment.id}>
                                    <h3>{comment.user}</h3>
                                    <p>{comment.text}</p>
                                </li>
                            ))}
                        </ul>
                    )};
                </li>
            ))}
        </ul>
    );
}
