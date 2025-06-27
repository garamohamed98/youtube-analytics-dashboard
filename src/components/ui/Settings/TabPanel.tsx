import { Box } from "@mui/material";

const TabPanel = ({
  value,
  index,
  children,
}: {
  value: number;
  index: number;
  children: React.ReactNode;
}) => {
  return (
    <Box hidden={value !== index} width="100%" my="20px">
      {children}
    </Box>
  );
};

export default TabPanel;
