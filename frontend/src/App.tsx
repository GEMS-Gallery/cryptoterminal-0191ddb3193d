import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { backend } from 'declarations/backend';

type Post = {
  id: bigint;
  title: string;
  content: string;
  timestamp: bigint;
};

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const fetchedPosts = await backend.getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  const onSubmit = async (data: { title: string; content: string }) => {
    setLoading(true);
    try {
      const result = await backend.createPost(data.title, data.content);
      if ('ok' in result) {
        await fetchPosts();
        reset();
      } else {
        console.error('Error creating post:', result.err);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
    setLoading(false);
  };

  const formatTimestamp = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1000000).toLocaleString();
  };

  return (
    <Container className="terminal">
      <Typography variant="h4" gutterBottom>
        Crypto Terminal Blog <span className="blink">_</span>
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{ style: { color: '#00FF00' } }}
            />
          )}
        />
        <Controller
          name="content"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              InputProps={{ style: { color: '#00FF00' } }}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </Button>
      </form>

      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Posts:
      </Typography>
      {loading ? (
        <Typography>Loading posts...</Typography>
      ) : (
        <List>
          {posts.map((post) => (
            <ListItem key={post.id.toString()} button onClick={() => setSelectedPost(post)}>
              <ListItemText
                primary={post.title}
                secondary={formatTimestamp(post.timestamp)}
              />
            </ListItem>
          ))}
        </List>
      )}

      {selectedPost && (
        <div>
          <Typography variant="h6">{selectedPost.title}</Typography>
          <Typography variant="body1">{selectedPost.content}</Typography>
          <Typography variant="caption">{formatTimestamp(selectedPost.timestamp)}</Typography>
        </div>
      )}
    </Container>
  );
};

export default App;
