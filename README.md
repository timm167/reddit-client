# Daily Dose of Reddit

This project is a React and Redux application that fetches and displays posts and comments from Reddit using the Reddit API. It allows users to search for posts by subreddit and view comments for each post. I plan to add updates.

## Project Structure
```
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
```
## Features

- Fetch and display popular posts from Reddit.
- Search for posts by subreddit.
- View comments for each post.
- Load more comments for a post.
- Navigate to a subreddit by clicking on the subreddit name.

## Tech Stack

React:
React is used to build the user interface, breaking the app into reusable components that keep things dynamic and responsive.

Redux:
Redux is used to manage the app’s state (like posts, comments, and the search term) in a central store, ensuring everything stays in sync.

React-Redux:
React-Redux connects React with Redux, enabling components to easily access and update the state.

JavaScript (JSX):
JavaScript (JSX) is used to make the app interactive, allowing the combination of HTML and JavaScript to create dynamic components.

CSS:
Global styles are applied through index.css, while component-specific styles are scoped in Components.css.

Vite:
Vite is used as the build tool, providing fast compilation and smooth development experience.

Reddit API:
The Reddit API is used to fetch posts and comments, keeping the app updated with fresh content.

## Project Files

src/App.jsx
The root component of the application, responsible for fetching posts based on the search term and rendering the search bar, site title, and list of posts.

src/components/Post.jsx
Displays the details of a single post, including its title, content, and associated comments. It also handles fetching and rendering comments for the post.

src/components/Posts.jsx
Renders a list of posts by displaying multiple Post components.

src/components/SearchBar.jsx
Provides an input field for users to search for posts by subreddit.

src/features/postsSlice.js
Manages the state for posts and comments, including logic to fetch data from Reddit through async thunks.

src/features/searchSlice.js
Handles the state for the search term, used to filter posts based on user input.

src/store.js
Configures the Redux store and combines the posts and search reducers to manage the application's state.

src/index.css
Contains global styles applied across the entire application.

src/components/Components.css
Component-specific styles scoped to individual React components.

## License

This project is licensed under the MIT License.
