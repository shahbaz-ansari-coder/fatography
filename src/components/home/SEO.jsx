// components/SEO.jsx
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SEO = ({
  title = "Fatography",
  description = "Professional photography services in Pakistan.",
}) => {
  const location = useLocation();
  const baseUrl = "https://fatography.co";

  const currentUrl = baseUrl + location.pathname;

  return (
    <Helmet>
      {/* Title */}
      <title>{title}</title>

      {/* Description */}
      <meta name="description" content={description} />

      {/* Canonical */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph (Facebook, WhatsApp, etc) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />

      {/* Twitter SEO */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
