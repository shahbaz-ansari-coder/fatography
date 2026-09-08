// components/SEO.jsx
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SEO = ({
  title = "Fatography",
  description = "Professional photography services in Pakistan.",
}) => {
  const location = useLocation();

  // Current origin (https://www.fatography.co OR https://fatography.co)
  const baseUrl = window.location.origin;

  const currentUrl = `${baseUrl}${location.pathname}`;

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <link rel="canonical" href={currentUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
