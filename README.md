# Daily Dose of Reddit

This project is a React application that fetches and displays posts and comments from Reddit using the Reddit API. It allows users to search for posts by subreddit and view comments for each post.

## Project Structure

src/
┣ assets/
┣ components/
┃ ┣ Components.css
┃ ┣ post.jsx
┃ ┣ posts.jsx
┃ ┗ searchBar.jsx
┣ features/
┃ ┣ postsSlice.js
┃ ┗ searchSlice.js
┣ App.css
┣ App.jsx
┣ index.css
┣ main.jsx
┗ store.js

## Features

- Fetch and display popular posts from Reddit.
- Search for posts by subreddit.
- View comments for each post.
- Load more comments for a post.
- Navigate to a subreddit by clicking on the subreddit name.

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd <project-directory>
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## Project Files

### `src/App.jsx`

The main component of the application. It fetches posts based on the search term and displays the search bar, site title, and posts.

### `src/components/post.jsx`

A component that displays a single post. It handles fetching and displaying comments for the post.

### `src/components/posts.jsx`

A component that displays a list of posts.

### `src/components/searchBar.jsx`

A component that allows users to search for posts by subreddit.

### `src/features/postsSlice.js`

A Redux slice that manages the state for posts and comments. It includes async thunks for fetching posts and comments from the Reddit API.

### `src/features/searchSlice.js`

A Redux slice that manages the state for the search term.

### `src/store.js`

Configures the Redux store with the posts and search reducers.

### `src/index.css`

Global CSS styles for the application.

### `src/components/Components.css`

CSS styles for the components.

## ESLint Configuration

The project uses ESLint for code linting. The configuration is defined in `eslint.config.js`.

## License

This project is licensed under the MIT License.