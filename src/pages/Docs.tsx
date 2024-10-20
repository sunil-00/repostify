import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { BorderBeam } from "@/components/ui/border-beam";
import Particles from "@/components/ui/particles";
import ShineBorder from "@/components/ui/shine-border";

interface Item {
  title: string;
  description: string;
}

const Docs: React.FC = () => {
  const navigate = useNavigate();

  const techStack = [
    {
      title: "React.js",
      description: "React is a popular frontend library for building user interfaces."
    },
    {
      title: "TypeScript",
      description: "TypeScript is a superset of JavaScript that compiles to plain JavaScript."
    },
    {
      title: "Shadcn",
      description: "Shadcn is a UI library built on Radix Primitives with utility-first CSS support for accessible and customizable components."
    },
    {
      title: "Supabase",
      description: "Supabase is a database provider with PostgreSQL."
    },
    {
      title: "Vite",
      description: "Vite is a fast build tool offering great development experience with instant hot module replacement."
    },
  ];

  const features = [
    {
      title: "OAuth Login",
      description: "Users can log in with Google or GitHub using Supabase's authentication.",
    },
    {
      title: "Post Creation",
      description: "Users can create a new post by entering a title and content (with optional image).",
    },
    {
      title: "Like and Repost",
      description: "Users can like posts, and reposts can be done with a custom title. The reposts are displayed as new posts with a reference to the original post.",
    },
    {
      title: "Responsive UI",
      description: "The app is fully responsive, adapting to different screen sizes.",
    },
  ];

  const projectStructure = [
    {
      title: "components/",
      description: "All reusable components (e.g., PostForm, PostItem) are stored here. These are designed to be modular and flexible for various use cases.",
    },
    {
      title: "hooks/",
      description: "Custom React hooks, like the useAuth hook, are defined here to handle authentication and other stateful logic.",
    },
    {
      title: "services/",
      description: "This folder contains API-related logic (e.g., postService.ts), where all Supabase queries (for posts) are centralized.",
    },
    {
      title: "pages/",
      description: "This contains the main routes, including the Home page (Home.tsx), the Login page (Login.tsx), and the Docs page (Docs.tsx).",
    },
  ];

  const whyTheseTools = [
    {
      title: "Supabase",
      description: "It offers an easy integration of authentication and database services, using PostgreSQL, which is robust for relational data. The OAuth feature allowed us to quickly integrate Google and GitHub login functionality.",
    },
    {
      title: "Shadcn with Tailwind",
      description: "This combination provides a flexible design system. Tailwind allows us to rapidly style components, while Shadcn gives us customizable and accessible UI primitives.",
    },
    {
      title: "Vite",
      description: "A better development experience compared to older build tools like Webpack, allowing for faster HMR and faster production builds.",
    },
    {
      title: "TypeScript",
      description: "Ensuring type safety, which makes the code more reliable and easier to debug during development.",
    },
  ];

  const renderCards = (
    items: Item[],
    styleType: 'shine' | 'border' | 'particles' = 'shine'
  ) =>
    items.map((item, index) => {
      const cardContent = (
        <>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{item.description}</p>
          </CardContent>
        </>
      );

      return (
        <>
          {styleType === 'shine' ? (
            <ShineBorder
              key={index}
              className="mb-4 hover:shadow-lg transition-shadow relative border"
              color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            >
              {cardContent}
            </ShineBorder>
          ) : (
            <Card key={index} className="mb-4 hover:shadow-lg transition-shadow relative">
              {cardContent}
              {styleType === 'border' && (
                <BorderBeam size={50} duration={12} delay={9} />
              )}
              {styleType === 'particles' && (
                <Particles
                  className="absolute inset-0"
                  quantity={20}
                  ease={80}
                  color="#000000"
                  refresh
                />
              )}
            </Card>
          )}
        </>
      )
    });

  const renderList = (items: Item[]) => (
    <div className="text-lg text-gray-800">
      <ol className="list-decimal pl-6">
        {items.map((item, index) => (
          <li key={index} className="mb-4">
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <div className="container mx-auto py-12 px-6 bg-gray-50 rounded-lg shadow-lg">
      <Button
        onClick={()=> navigate('/')}
        className="ml-4"
      >
        Back
      </Button>
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Project Documentation
      </h1>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Overview</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          This project is a social media-like application built using React.js, TypeScript, and Shadcn for the UI. Users can log in with Google or GitHub using Supabase's OAuth system, create new posts, like posts, and repost content. The repost feature allows users to create a new post that includes their own title and content while also referencing the original post.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderCards(techStack, 'particles')}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderCards(features, 'border')}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Project Structure</h2>
        <p className="text-lg text-gray-600 mb-4">
          The project follows a maintainable and scalable structure, separating concerns and ensuring reusability across components and services.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderCards(projectStructure)}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Why These Tools?</h2>
        {renderList(whyTheseTools)}
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Conclusion</h2>
        <p className="text-lg text-gray-600">
          This project showcases a minimal social media-like app where users can
          log in with their Google or GitHub accounts, create posts, like them,
          and repost them. The chosen stack ensures maintainability, performance, and developer productivity.
        </p>
      </section>
    </div>
  );
};

export default Docs;
