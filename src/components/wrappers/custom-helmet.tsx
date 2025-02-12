import { useEffect } from "react";

interface HelmetProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export function  Helmet({ title, description, keywords }: HelmetProps){
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Tigawanna" />
      <link rel="author" href="https://tigawanna-portfolio.vercel.app/" />
    </>
  );
};


