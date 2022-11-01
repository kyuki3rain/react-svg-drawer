import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Fab, Tooltip } from "@mui/material";

type Props = {
  title: string;
  icon: React.ReactNode;
  items: { title: string; onClick: () => void }[];
};

export default function BasicMenu({ title, items, icon }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title={title} style={{ marginRight: 5 }} arrow>
        <Fab aria-label={title} color="default" onClick={handleClick}>
          {icon}
        </Fab>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {items.map((item) => (
          <MenuItem onClick={item.onClick} key={item.title}>
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
