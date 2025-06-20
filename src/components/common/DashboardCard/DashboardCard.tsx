import { Card, styled } from "@mui/material";

const DashboardCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ filled?: boolean }>(({ theme, filled = true }) => ({
  elevation: 0,
  boxShadow: "none",
  border: "none",
  backgroundImage: "none",
  ...(filled === true
    ? { backgroundColor: theme.palette.background.paper }
    : {
        backgroundColor: "transparent !important",
      }),
}));

export default DashboardCard;
