import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SpeedIcon from "@mui/icons-material/Speed";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

const SidebarMenu = [

    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <DashboardIcon />
    },

    {
        title: "Fuel Rate",
        path: "/dashboard/fuel-rate",
        icon: <LocalGasStationIcon />
    },

    {
        title: "Gun Reading",
        path: "/gun-reading",
        icon: <SpeedIcon />
    },

    {
        title: "Gun Reading Display",
        path: "/gun-reading-display",
        icon: <ReceiptLongIcon />
    },

    {
        title: "Display Total Sales",
        path: "/total-sales",
        icon: <PaymentsIcon />
    },

    {
        title: "Credit Sale",
        path: "/credit-sale",
        icon: <CreditCardIcon />
    },

    {
        title: "Credit Sale Paid Amount",
        path: "/credit-paid",
        icon: <DoneAllIcon />
    },

    {
        title: "Credit Sale Pending",
        path: "/credit-pending",
        icon: <PendingActionsIcon />
    },

    {
        title: "Amount Received",
        path: "/amount-received",
        icon: <CurrencyRupeeIcon />
    },

    {
        title: "Amount Given",
        path: "/amount-given",
        icon: <MoneyOffIcon />
    },

    {
        title: "Manage Employees",
        path: "/manage-employees",
        icon: <GroupAddIcon />
    }



];

export default SidebarMenu;