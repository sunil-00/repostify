# Repostify

This project is a social media-like application built using **React.js**, **TypeScript**, and **Shadcn** for the UI. Users can log in with Google or GitHub using **Supabase's OAuth system**, create new posts, like posts, and repost content. The repost feature allows users to create a new post that includes their own title and content while also referencing the original post.

## Features

- **OAuth Login**: Users can log in using Google or GitHub via Supabase.
- **Create Posts**: Users can create posts with a title, content, and optional image.
- **Like Posts**: Users can like posts created by themselves or others.
- **Repost**: Users can repost any post.
- **Responsive Design**: Fully responsive UI built with Shadcn and TailwindCSS.
- **Clean and Maintainable Code**: Follows a modular structure for scalability and maintainability.

## Tech Stack

### Frontend

- **React.js**: A JavaScript library for building user interfaces with reusable components.
- **TypeScript**: Ensures type safety and better developer experience by catching errors at compile time.
- **Shadcn**: A UI library that builds on Radix Primitives with utility-first CSS support (via TailwindCSS) to provide accessible and customizable components.
- **Vite**: A fast build tool and development server, chosen for its performance benefits like faster Hot Module Replacement (HMR).

### Backend

- **Supabase**: A Firebase alternative for handling authentication and database services.
  - **OAuth**: Google and GitHub login integration.
  - **PostgreSQL**: Supabase uses PostgreSQL as the database for storing posts, likes, and reposts.

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/sunil-00/repostify.git
cd repostify
```

2. Install the dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root of your project add the following Supabase environment variables:

```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run the app locally:
```bash
npm run dev
```

Application will be running at [http://localhost:5173](http://localhost:5173).

## Supabase Setup

1. **Create a Supabase Account**:  
   Go to [supabase.io](https://supabase.com) and sign up for an account.

2. **Create a New Project**:  
   Once logged in, create a new project in Supabase. This will provide you with your **Supabase URL** and **Anon Key**, which will be needed for authentication and database access.

3. **Enable OAuth Providers**:  
   In your Supabase dashboard:
   - Navigate to **Authentication** > **Providers**.
   - Enable both **Google** and **GitHub** as OAuth providers by configuring the required credentials from Google and GitHub Developer platforms.

4. **Create a Posts Table**:  
   In your Supabase dashboard:
   - Go to the **SQL Editor**.
   - Run the following SQL command to create a `posts` table:

  ```sql
  create table public.posts (
    id uuid not null default gen_random_uuid (),
    user_id uuid not null default auth.uid (),
    title text not null default ''::text,
    content text not null default ''::text,
    image text null default ''::text,
    like_count bigint not null default '0'::bigint,
    repost_count bigint not null default '0'::bigint,
    created_at timestamp with time zone not null default now(),
    original_post_id uuid null,
    constraint posts_pkey primary key (id),
    constraint fk_original_post foreign key (original_post_id) references posts (id),
    constraint posts_user_id_fkey foreign key (user_id) references auth.users (id)
  ) tablespace pg_default;
  ```

This will create a table with fields for handling user posts, including the option to track likes, reposts, and original posts.


5. **Retrieve Supabase API Keys:**:  
   After creating the project, get the API Keys:
   - Navigate to **Settings** > **API** in your Supabase dashboard.
   - Copy the Supabase URL and Anon Key and add them to your `.env` file:
   ```bash
    VITE_SUPABASE_URL=your-supabase-url
    VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

   These keys are required for interacting with Supabase from your frontend app.

## Usage

Once deployed or running locally, the app allows users to:

If you don't have a `.env` file, or if `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY` are not set, you will be prompted to enter the environment variable keys when running the app.

1. Log in with Google or GitHub.
2. View posts from other users.
3. Like and repost posts.
4. Create new posts with optional images.

