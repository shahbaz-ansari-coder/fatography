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
    </Helmet>
  );
};

export default SEO;
