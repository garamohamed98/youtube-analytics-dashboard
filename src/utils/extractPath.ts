const extractPath = (
  url: string | null
): { format: string; path: string } | null => {
  if (url === null) return null;
  try {
    const parsedURL = new URL(url);
    const path = parsedURL.pathname;

    if (path.startsWith("/channel/")) {
      const parts = path.split("/");
      if (parts.length === 3 && parts[2].startsWith("UC")) {
        return { format: "id", path: parts[2] };
      }
    }

    if (path.startsWith("/user/")) {
      const parts = path.split("/");
      if (parts.length === 3 && parts[2]) {
        return { format: "username", path: parts[2] };
      }
    }

    if (path.startsWith("/c/")) {
      const parts = path.split("/");
      if (parts.length === 3 && parts[2]) {
        return { format: "custom", path: parts[2] };
      }
    }

    if (path.startsWith("/@")) {
      const part = path.slice(1);
      return { format: "tag", path: part };
    }
    return null;
  } catch (error) {
    console.error("Invalid URL: ", error);
    return null;
  }
};

export default extractPath;
